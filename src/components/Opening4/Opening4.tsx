"use client";

import { useEffect, useState } from "react";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "@/lib/canvas";
import ScaleStage from "@/components/ScaleStage";
import { ALL_PLATES } from "@/components/Opening/plates";
import {
  OPENING4_STATES,
  OPENING4_STATE_IDS,
  OPENING4_EASING,
  captionWindow,
  charmOpacities,
  type CopyRun,
  type Opening4State,
  type Opening4StateId,
} from "./states";

/** The lattice is reused verbatim from opening1's assets — same geometry, same
 * files. Opening4 only dims it, via CSS, so there are no duplicate artwork
 * copies to keep in step. */
const LATTICE = "/opening/opening1";
const LATTICE_OPACITY = 0.4;

const ASSETS = "/opening/opening4";

/** The charm column, in frame coordinates. Figma centres it on
 * (1024.48, 471) at 90.952 x 382. */
const COLUMN = { x: 979.004, y: 280, w: 90.952, h: 382 };

/**
 * Charm parts, positioned within the column. Offsets are measured from Figma
 * rather than derived from a flex stack, so they cannot drift.
 *
 * `svgW`/`svgH` are the exported artwork's own size, which is slightly larger
 * than the node box because strokes bleed outward. Each part is drawn at its
 * natural size and centred on its box, which puts the stroke centre-line
 * exactly where Figma has it.
 */
const PARTS = [
  { key: "bar", file: "bar.svg", x: 38.521, y: 0, w: 13.91, h: 44.941, svgW: 13, svgH: 45 },
  { key: "language", file: "language.svg", x: 31.566, y: 50.291, w: 27.821, h: 21.401, svgW: 28, svgH: 22 },
  { key: "flower", file: "flower.svg", x: 8.025, y: 77.042, w: 74.902, h: 74.902, svgW: 75, svgH: 75 },
  { key: "pearl", file: "pearl.svg", x: 40.126, y: 157.294, w: 10.7, h: 32.101, svgW: 15, svgH: 35 },
  { key: "tag", file: "tag.svg", x: 8.025, y: 194.745, w: 74.902, h: 187.255, svgW: 78, svgH: 190 },
] as const;

function Lattice() {
  return (
    <div className="absolute inset-0" style={{ opacity: LATTICE_OPACITY }} data-opening4-lattice="">
      {ALL_PLATES.map((p) => (
        <div
          key={p.id}
          data-opening4-plate={p.id}
          className={`absolute ${p.border ? "rounded-[8px] border-[0.5px] border-solid border-white" : ""}`}
          style={{ left: p.x, top: p.y, width: p.w, height: p.h }}
        >
          {p.src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`${LATTICE}/${p.src}`}
              alt=""
              className="block size-full max-w-none"
              style={p.flipX ? { transform: "scaleX(-1)" } : undefined}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * The charm assembly. Its geometry is identical in all four states — only the
 * per-element opacity changes, which is what turns it into a progress
 * indicator: each state lights the attribute its caption describes, and 4.4
 * lights the whole thing.
 */
/** Figma's authored exit on 4.4: the charm alone fades out over 500ms with
 * easeOut. It is internal to Opening4 — the scene layer above still handles the
 * screen cross-fade, and nothing here scales. */
const CHARM_EXIT_MS = 500;

function Charm({
  state,
  entering,
  entranceKey,
  exiting,
}: {
  state: Opening4State;
  entering: boolean;
  entranceKey: number;
  exiting: boolean;
}) {
  // Figma's entrance starts from the fully-lit charm and dims down to 4.1's
  // single highlight, so during the entrance frame the parts are all at 1.
  const opacity = entering ? charmOpacities("all") : charmOpacities(state.highlight);
  const [charmStart, charmEnd] = state.timing.charm;
  const transition = `opacity ${charmEnd - charmStart}ms ${OPENING4_EASING} ${charmStart}ms`;
  const enter = state.entranceScaleMs;

  return (
    <div
      data-opening4-charm-column=""
      className="absolute"
      style={{
        left: COLUMN.x,
        top: COLUMN.y,
        width: COLUMN.w,
        height: COLUMN.h,
        opacity: exiting ? 0 : 1,
        transition: `opacity ${CHARM_EXIT_MS}ms ${OPENING4_EASING}`,
      }}
    >
      <div
        // Remounting on a new entranceKey is what lets the one-time CSS
        // animation replay if the visitor scrolls back out and in again.
        key={entranceKey}
        data-opening4-charm=""
        className={`relative size-full ${entranceKey > 0 && enter ? "opening4-charm-enter" : ""}`}
        style={
          entranceKey > 0 && enter
            ? ({
                "--enter-delay": `${enter[0]}ms`,
                "--enter-duration": `${enter[1] - enter[0]}ms`,
              } as React.CSSProperties)
            : undefined
        }
      >
        {PARTS.map((part) => (
          <div
            key={part.key}
            data-opening4-part={part.key}
            className="absolute"
            style={{
              left: part.x,
              top: part.y,
              width: part.w,
              height: part.h,
              opacity: opacity[part.key],
              transition,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${ASSETS}/${part.file}`}
              alt=""
              className="absolute block max-w-none"
              style={{
                left: (part.w - part.svgW) / 2,
                top: (part.h - part.svgH) / 2,
                width: part.svgW,
                height: part.svgH,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Line({
  runs,
  font,
  size,
  weight,
  top,
}: {
  runs: CopyRun[];
  font: string;
  size: number;
  weight: number;
  top: number;
}) {
  return (
    <p
      className={`-translate-x-1/2 absolute whitespace-nowrap text-center leading-normal text-white ${font}`}
      style={{ left: 1024, top, fontSize: size, fontWeight: weight }}
    >
      {runs.map((run, i) => (
        <span key={i} style={run.bold ? { fontWeight: 700 } : undefined}>
          {run.text}
        </span>
      ))}
    </p>
  );
}

/** Both captions for one state. Every line is centred on x=1024 in its own
 * right — the analysis found the English lines had been aligned to the Korean
 * line's left edge instead, which is not reproduced here. */
function Captions({
  state,
  visible,
  timing,
}: {
  state: Opening4State;
  visible: boolean;
  timing: [number, number];
}) {
  const [start, end] = timing;
  return (
    <div
      data-opening4-captions={state.id}
      className="absolute inset-0"
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity ${end - start}ms ${OPENING4_EASING} ${start}ms`,
        pointerEvents: visible ? undefined : "none",
      }}
    >
      <Line
        runs={state.en}
        font="font-satoshi"
        size={state.type.size}
        weight={state.type.enWeight}
        top={state.type.enTop}
      />
      <Line
        runs={state.ko}
        font="font-pretendard"
        size={state.type.size}
        weight={state.type.koWeight}
        top={state.type.koTop}
      />
    </div>
  );
}

/**
 * Invisible hit area over 4.4's two CTA lines.
 *
 * Figma draws no button box, so this adds none — it is a transparent overlay
 * sized to cover both lines rather than only the glyphs. Being a real
 * <button> gives keyboard focus and Enter/Space activation for free.
 */
const CTA_HIT = { x: 944, y: 703, w: 160, h: 98 };

function CtaHitArea({ onActivate }: { onActivate: () => void }) {
  return (
    <button
      type="button"
      data-opening4-cta=""
      onClick={onActivate}
      aria-label="Let’s Go — enter the timeline"
      className="absolute cursor-pointer border-0 bg-transparent p-0"
      style={{ left: CTA_HIT.x, top: CTA_HIT.y, width: CTA_HIT.w, height: CTA_HIT.h }}
    />
  );
}

/**
 * opening4.1 - 4.4.
 *
 * One component, four states. The lattice, charm geometry and caption slots are
 * shared; a state only changes its copy, which charm element is lit, and the
 * measured timing of those two changes.
 *
 * `entrance` runs the one-time charm scale that Figma defines on 4.1 — the only
 * scale anywhere in the Opening. It is internal to this component; the scene
 * cross-fade that carries Opening4 on and off screen stays opacity-only.
 */
export default function Opening4({
  state,
  active = true,
  entranceKey = 0,
  exiting = false,
  onCtaActivate,
}: {
  state: Opening4StateId;
  /** Whether Opening4 is the screen currently showing. The flow clamps `state`
   * to 1 while the earlier scenes play, so without this the 4.1 captions sit
   * at full opacity behind the layer fade and are already there the moment 4.1
   * arrives — and they come back pre-lit on every History replay, because the
   * entrance key is never rewound. */
  active?: boolean;
  /** Bumped by the flow each time Opening4 is entered from an earlier stage.
   * `0` means it has never been entered, so no entrance plays. */
  entranceKey?: number;
  /** Runs Figma's authored 4.4 charm fade-out. The flow sets this as the final
   * transition begins; the screen cross-fade happens on the layer above. */
  exiting?: boolean;
  /** Supplied only when the CTA should be actionable. The flow routes this to
   * the same function the downward gesture uses. */
  onCtaActivate?: () => void;
}) {
  const current = OPENING4_STATES[state];

  /*
   * The entrance resolves the charm into its highlighted state: every part
   * starts fully lit and only the un-highlighted ones ease down to their target
   * opacity, so the charm stays wholly visible and reads as a reveal rather
   * than a fade-out.
   *
   * `entering` has to be true on the *same* render that `entranceKey` changes.
   * The charm wrapper is keyed on that value, so its parts are new DOM nodes;
   * if they mounted already dimmed there would be nothing to animate from and
   * the reveal would never happen. Tracking which key has been settled — rather
   * than flipping a flag from an effect — makes the starting values part of the
   * first render.
   */
  const [settledKey, setSettledKey] = useState(0);
  const entering = entranceKey !== 0 && settledKey !== entranceKey;
  useEffect(() => {
    if (!entering) return;
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setSettledKey(entranceKey));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [entering, entranceKey]);

  return (
    <ScaleStage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
      <div className="relative size-full overflow-hidden bg-ink">
        <Lattice />
        <Charm state={current} entering={entering} entranceKey={entranceKey} exiting={exiting} />
        {OPENING4_STATE_IDS.map((id) => (
          <Captions
            key={id}
            state={OPENING4_STATES[id]}
            visible={active && !entering && id === state}
            timing={captionWindow(current)}
          />
        ))}
        {state === 4 && onCtaActivate && <CtaHitArea onActivate={onCtaActivate} />}
      </div>
    </ScaleStage>
  );
}
