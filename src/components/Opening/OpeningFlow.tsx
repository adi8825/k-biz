"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Opening0 from "@/components/Opening0/Opening0";
import Opening1 from "./Opening1";
import Opening4 from "@/components/Opening4/Opening4";
import MainScreen from "@/components/MainScreen/MainScreen";
import { OPENING_TRANSITION_MS, openingFade } from "./transitions";
import { SCENE_IDS, type OpeningScene } from "./scenes";
import {
  OPENING4_STATE_IDS,
  stateDurationMs,
  type Opening4StateId,
} from "@/components/Opening4/states";

/**
 * The connected Opening sequence: opening0 -> opening1 -> opening2 -> opening3.
 *
 * This is purely a composition layer. It owns which screen is showing and the
 * outer transition opacity, and nothing else — the scenes below it are
 * untouched, and the breathing system is not referenced here at all.
 *
 * Layering, which is the point of this component:
 *
 *   outer scene-transition layer   <- opacity 0 <-> 1 lives here
 *     Opening0
 *       plate wrapper
 *         breathing image layer    <- .opening-breathe, independent
 *         static outline layer
 *
 * Because the two opacities sit on different elements they multiply rather
 * than overwrite, so a departing screen still reaches a true 0 no matter where
 * each photograph happens to be in its own cycle.
 *
 * Stage 0 is the attract screen. Stages 1-3 are the storytelling scenes, which
 * live inside `Opening1` and cross-fade between themselves using the existing
 * approved system — this component only tells it which scene is current.
 */

/**
 * 0 is the attract screen, 1-3 the storytelling scenes, 4-7 the four Opening4
 * states. One flat index keeps the scroll logic identical across all of them.
 */
type Stage = 0 | OpeningScene | 4 | 5 | 6 | 7 | 8;

const FIRST_STAGE: Stage = 0;
const LAST_STAGE: Stage = 8;

/** Stage at which Opening4 takes over from the storytelling scenes. */
const FIRST_OPENING4_STAGE = 4;

/** opening4.4 — the last Opening stage. */
const LAST_OPENING_STAGE = 7;

/** The Timeline. Terminal: once reached the Opening is over, the flow gives up
 * wheel ownership, and there is no way back. */
const TIMELINE_STAGE = 8;

/**
 * Downward wheel distance, in CSS pixels, before a scene gives way.
 * A single mouse notch is ~100px and a trackpad flick clears this almost
 * immediately, so it reads as instant while still swallowing 1-2px jitter.
 */
const SCROLL_TRIGGER_PX = 24;

/**
 * A pause longer than this discards distance measured so far, so stray noise
 * spread across a long idle never accumulates into a trigger.
 */
const GESTURE_GAP_MS = 400;

/**
 * Telling a fresh push apart from the momentum still coasting after the last
 * one, using what the wheel input actually looks like rather than a timer.
 *
 * The rule this restores is "one gesture, one step". It used to be enforced by
 * a latch that only a >400ms gap could clear — but the gap was measured from
 * the last event of any kind, including the ones the latch was discarding, so
 * an unbroken stream refreshed it forever and the Opening stalled until the
 * reader happened to pause (which is what clicking really did). None of the
 * three tests below can be starved that way: each reads the current event.
 *
 * Momentum has one defining property — it decays monotonically towards zero,
 * as an unbroken high-frequency stream. So the gesture is over when:
 *
 *   1. the stream is too sparse to be one physical glide (mouse notches, or
 *      simply letting go and starting again), or
 *   2. a delta re-accelerates clearly past the decayed tail, or
 *   3. deltas stop decaying at all for several events, which is a finger still
 *      pushing rather than inertia running out.
 */
const MOMENTUM_GAP_MS = 120;
const REACCEL_RATIO = 2.5;
/** Below this, a plateau is the tail's 1-2px dribble, not sustained input. */
const SUSTAINED_MIN_PX = 8;
const SUSTAINED_EVENTS = 3;

/** Normalises wheel deltas, which arrive in lines or pages on some devices. */
function wheelPixels(event: WheelEvent): number {
  if (event.deltaMode === 1) return event.deltaY * 16;
  if (event.deltaMode === 2) return event.deltaY * window.innerHeight;
  return event.deltaY;
}

/** Development-only scaffolding is dropped from the production bundle. */
const IS_PRODUCTION = process.env.NODE_ENV === "production";

function clampStage(value: number): Stage {
  if (value <= FIRST_STAGE) return FIRST_STAGE;
  if (value >= LAST_STAGE) return LAST_STAGE;
  return value as Stage;
}

export default function OpeningFlow() {
  // `0` on both server and client, so the storytelling layer is rendered
  // hidden in the initial HTML and there is no flash before hydration.
  const [stage, setStage] = useState<Stage>(FIRST_STAGE);

  // Mirrors `stage` for use inside the wheel handler, which must read the
  // current value synchronously without re-subscribing on every change.
  const stageRef = useRef<Stage>(FIRST_STAGE);
  const travelled = useRef(0);
  const lastEventAt = useRef(0);
  const locked = useRef(false);
  /** True while the gesture that last moved the sequence is still coasting. */
  const gestureSpent = useRef(false);
  /** Smallest delta seen since then — the tail's decay floor. */
  const tailFloor = useRef(0);
  /** Consecutive non-decaying deltas, which inertia does not produce. */
  const sustained = useRef(0);
  /** Bumped whenever Opening4 is entered from an earlier stage, so its
   * one-time charm entrance replays on re-entry. */
  const [entranceKey, setEntranceKey] = useState(0);
  /** Mounted once opening4.4 is reached, and never unmounted, so the Timeline
   * has a full stage to load and keeps its own state afterwards. */
  const [timelineMounted, setTimelineMounted] = useState(false);
  /** True once the Timeline is fully on screen. Releases wheel ownership. */
  const [finished, setFinished] = useState(false);

  /** The single place a stage change is committed. Both the wheel handler and
   * the CTA go through here, so there is one transition implementation. */
  const commitStage = useCallback((next: Stage) => {
    if (next >= FIRST_OPENING4_STAGE && stageRef.current < FIRST_OPENING4_STAGE) {
      setEntranceKey((k) => k + 1);
    }
    stageRef.current = next;
    locked.current = true;
    setStage(next);
  }, []);

  /**
   * The final transition. Shared verbatim by the downward gesture and the CTA.
   * Guarded so a momentum tail, a second gesture or repeated clicks during the
   * cross-fade cannot start it twice.
   */
  const enterTimeline = useCallback(() => {
    if (locked.current) return;
    if (stageRef.current !== LAST_OPENING_STAGE) return;
    commitStage(TIMELINE_STAGE);
  }, [commitStage]);

  useEffect(() => {
    // Once the Timeline is up the flow stops listening entirely — nothing is
    // intercepted, nothing is prevented, and upward scrolling cannot return.
    if (finished) return;

    function onWheel(event: WheelEvent) {
      // Terminal stage: the Opening no longer responds to the wheel at all.
      if (stageRef.current >= TIMELINE_STAGE) return;

      // From opening4.1 the sequence plays itself on its own timers. Returning
      // before anything is read or written means a momentum tail, a fresh
      // gesture or a hand resting on the trackpad cannot advance, skip,
      // accelerate or restart a phase — and nothing is banked here to fire the
      // moment the Timeline arrives.
      if (stageRef.current >= FIRST_OPENING4_STAGE) return;

      const now = performance.now();
      const gap = now - lastEventAt.current;
      lastEventAt.current = now;

      // A quiet pause discards whatever was measured before it.
      if (gap > GESTURE_GAP_MS) travelled.current = 0;

      // Nothing accumulates while the cross-fade runs, so the next advance
      // always needs a fresh SCROLL_TRIGGER_PX of movement after it lifts.
      if (locked.current) return;

      const pixels = wheelPixels(event);
      if (pixels === 0) return;

      // Still coasting on the gesture that moved the sequence last time? Then
      // this event belongs to that gesture and must not move it again.
      if (gestureSpent.current) {
        const magnitude = Math.abs(pixels);
        const separateStream = gap > MOMENTUM_GAP_MS;
        const reAccelerated = magnitude > tailFloor.current * REACCEL_RATIO;
        if (magnitude >= SUSTAINED_MIN_PX && magnitude >= tailFloor.current) {
          sustained.current += 1;
        } else {
          sustained.current = 0;
        }
        const stillPushing = sustained.current >= SUSTAINED_EVENTS;

        if (!separateStream && !reAccelerated && !stillPushing) {
          if (magnitude < tailFloor.current) tailFloor.current = magnitude;
          return;
        }
        gestureSpent.current = false;
        travelled.current = 0;
        sustained.current = 0;
      }

      // Reversing direction mid-gesture restarts the measurement rather than
      // cancelling out against distance already travelled.
      if (travelled.current !== 0 && Math.sign(pixels) !== Math.sign(travelled.current)) {
        travelled.current = 0;
      }
      travelled.current += pixels;

      if (Math.abs(travelled.current) < SCROLL_TRIGGER_PX) return;
      const direction = travelled.current > 0 ? 1 : -1;
      travelled.current = 0;

      const next = clampStage(stageRef.current + direction);
      // Already at an end of the sequence: nothing moves, and the gesture is
      // not spent, so the visitor can simply scroll the other way.
      if (next === stageRef.current) return;

      // This gesture has now moved the sequence. Everything it goes on to
      // emit is its own momentum until one of the three tests above says
      // otherwise.
      gestureSpent.current = true;
      tailFloor.current = Math.abs(pixels);
      sustained.current = 0;

      if (next === TIMELINE_STAGE) {
        enterTimeline();
        return;
      }
      commitStage(next);
    }

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [finished, commitStage, enterTimeline]);

  /**
   * From opening4.1 onwards the sequence advances itself.
   *
   * Figma authors 4.1-4.4 as timed motion cohorts rather than as four things
   * to scroll through, so each state holds for its own authored length and
   * then commits the next one; 4.4 hands over through the same `enterTimeline`
   * the CTA uses, which starts the charm's authored exit and the screen
   * cross-fade. Nothing is cut short — the wait is the full cohort, so the
   * last caption has finished before the Timeline is asked for.
   *
   * Keyed on `stage`, so React clears the pending timer whenever the stage
   * changes for any reason. A History replay sets the stage back to 0, which
   * runs that cleanup: no timer can survive to jump a replay forward.
   */
  useEffect(() => {
    if (finished) return;
    if (stage < FIRST_OPENING4_STAGE || stage >= TIMELINE_STAGE) return;
    const stateId = (stage - FIRST_OPENING4_STAGE + 1) as Opening4StateId;
    const id = window.setTimeout(() => {
      if (stage === LAST_OPENING_STAGE) enterTimeline();
      else commitStage((stage + 1) as Stage);
    }, stateDurationMs(stateId));
    return () => window.clearTimeout(id);
  }, [stage, finished, commitStage, enterTimeline]);

  // Mount the Timeline as soon as opening4.4 is reached, so the final
  // cross-fade never reveals a blank layer. It is never unmounted.
  useEffect(() => {
    if (stage >= LAST_OPENING_STAGE) setTimelineMounted(true);
  }, [stage]);

  // The Opening is over once the final cross-fade has run its course.
  useEffect(() => {
    if (stage !== TIMELINE_STAGE) return;
    const id = window.setTimeout(() => setFinished(true), OPENING_TRANSITION_MS);
    return () => window.clearTimeout(id);
  }, [stage]);

  useEffect(() => {
    if (!locked.current) return;
    // Hold the lock for the length of the cross-fade so input arriving
    // mid-transition cannot stack up behind it.
    const id = window.setTimeout(() => {
      locked.current = false;
    }, OPENING_TRANSITION_MS);
    return () => window.clearTimeout(id);
  }, [stage]);

  /**
   * Replays the Opening from the attract screen. The History button in the
   * Timeline sidebar is the only route back — the wheel stays terminal.
   *
   * `timelineMounted` is deliberately left alone, so MainScreen is never
   * unmounted and keeps its sort, filter and view-mode state while the Opening
   * plays over the top of it. Clearing `finished` remounts the Opening layers
   * and restores wheel progression for the replay.
   */
  const replayOpening = useCallback(() => {
    travelled.current = 0;
    lastEventAt.current = 0;
    locked.current = false;
    gestureSpent.current = false;
    tailFloor.current = 0;
    sustained.current = 0;
    stageRef.current = FIRST_STAGE;
    setFinished(false);
    setStage(FIRST_STAGE);
  }, []);

  /** Used only by the temporary control below. Stepping back off the terminal
   * stage re-arms the wheel, which only the dev control can do. */
  function jumpTo(next: Stage) {
    travelled.current = 0;
    lastEventAt.current = 0;
    locked.current = false;
    gestureSpent.current = false;
    tailFloor.current = 0;
    sustained.current = 0;
    if (next >= FIRST_OPENING4_STAGE && stageRef.current < FIRST_OPENING4_STAGE) {
      setEntranceKey((k) => k + 1);
    }
    if (next < TIMELINE_STAGE) setFinished(false);
    stageRef.current = next;
    setStage(next);
  }

  // Each layer keeps rendering its own last state while it is off screen, so
  // stepping past it never leaves a layer on a half-finished state.
  const scene: OpeningScene = stage < 1 ? 1 : stage > 3 ? 3 : (stage as OpeningScene);
  const opening4State = (Math.min(Math.max(stage, FIRST_OPENING4_STAGE), LAST_OPENING_STAGE) -
    FIRST_OPENING4_STAGE +
    1) as Opening4StateId;

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink">
      {/* The Opening layers are absolutely positioned at the same origin so they
       * overlay exactly — swapping between them cannot shift any layout.
       *
       * They stay mounted for the whole of the final cross-fade and are dropped
       * only once `finished` latches, which happens a full transition after the
       * Timeline is up. Removing them then releases the Opening's 56 breathing
       * animations, which would otherwise keep running behind the Timeline. */}
      {!finished && (
        <>
          <div
            data-opening-layer="0"
            className="absolute inset-x-0 top-0"
            style={openingFade(stage === 0)}
          >
            <Opening0 />
          </div>

          <div
            data-opening-layer="1"
            className="absolute inset-x-0 top-0"
            style={openingFade(stage > 0 && stage < FIRST_OPENING4_STAGE)}
          >
            <Opening1 scene={scene} />
          </div>

          <div
            data-opening-layer="4"
            className="absolute inset-x-0 top-0"
            style={openingFade(stage >= FIRST_OPENING4_STAGE && stage < TIMELINE_STAGE)}
          >
            <Opening4
              state={opening4State}
              active={stage >= FIRST_OPENING4_STAGE && stage < TIMELINE_STAGE}
              entranceKey={entranceKey}
              exiting={stage >= TIMELINE_STAGE}
              onCtaActivate={stage === LAST_OPENING_STAGE ? enterTimeline : undefined}
            />
          </div>
        </>
      )}

      {/* The Timeline is the final layer of this same experience, so the
       * cross-fade into it is continuous — no route change interrupts it. */}
      {timelineMounted && (
        <div
          data-opening-layer="timeline"
          className="absolute inset-x-0 top-0"
          style={openingFade(stage >= TIMELINE_STAGE)}
        >
          <MainScreen onHistory={replayOpening} />
        </div>
      )}

      {/* TEMPORARY development control. Not part of the Opening design, so it
        * is compiled out of production builds — it would otherwise sit on top
        * of the artwork for the whole exhibition. Same guard the plate census
        * in Opening1 already uses. */}
      {!IS_PRODUCTION && (
      <div className="fixed bottom-4 left-4 z-50 flex gap-2 rounded bg-black/80 p-2 font-mono text-[11px] text-white">
        <span className="px-1 py-1 text-yellow-400">TEMP</span>
        <button
          type="button"
          onClick={() => jumpTo(0)}
          aria-label="Show opening0"
          aria-pressed={stage === 0}
          className={`rounded px-3 py-1 ${stage === 0 ? "bg-white text-black" : "bg-white/20"}`}
        >
          opening0
        </button>
        {SCENE_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => jumpTo(id)}
            aria-label={`Show opening${id}`}
            aria-pressed={stage === id}
            className={`rounded px-3 py-1 ${stage === id ? "bg-white text-black" : "bg-white/20"}`}
          >
            opening{id}
          </button>
        ))}
        {OPENING4_STATE_IDS.map((id) => {
          const target = (FIRST_OPENING4_STAGE + id - 1) as Stage;
          return (
            <button
              key={`4.${id}`}
              type="button"
              onClick={() => jumpTo(target)}
              aria-label={`Show opening4.${id}`}
              aria-pressed={stage === target}
              className={`rounded px-3 py-1 ${stage === target ? "bg-white text-black" : "bg-white/20"}`}
            >
              4.{id}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => jumpTo(TIMELINE_STAGE)}
          aria-label="Show timeline"
          aria-pressed={stage === TIMELINE_STAGE}
          className={`rounded px-3 py-1 ${stage === TIMELINE_STAGE ? "bg-white text-black" : "bg-white/20"}`}
        >
          timeline
        </button>
      </div>
      )}

      {/* TEMPORARY development link, deliberately separate from the scene
       * control above. The real hand-off from the Opening into the Timeline
       * belongs after opening4 and is not implemented here — this exists only
       * so the main screen is reachable while the sequence is being built. */}
      {!IS_PRODUCTION && (
        <Link
          href="/"
          data-dev-link="main-screen"
          className="fixed bottom-4 right-4 z-50 rounded bg-black/80 px-3 py-2 font-mono text-[11px] text-white"
        >
          main screen →
        </Link>
      )}
    </main>
  );
}
