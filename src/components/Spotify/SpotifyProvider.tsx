"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ABOUT_SAFE_SHIFT } from "@/components/MainScreen/About/aboutContent";
import { END_CONFIRM_MS, isStoppedAtEnd, type PlaybackData } from "./playbackEnd";

/** Permanent playlist. No `si` parameter: that one is a share token and
 * expires. Adding, removing or reordering tracks inside this playlist needs
 * no change here — the embed always plays whatever the playlist holds. */
export const PLAYLIST_URI = "spotify:playlist:6GpAobsNYYjJFoX0Y6mLRF";

const IFRAME_API_SRC = "https://open.spotify.com/embed/iframe-api/v1";

/**
 * Where the player sits inside the About screen, in design pixels.
 *
 * The About composition leaves its whole upper-right quadrant empty: measured
 * on the authored frame, x >= 970 above y = 259 contains zero ink, and the
 * first column row starts at y = 259. This slot takes the 4th grid column's
 * rail (x = 1601, the same rail the "2. Group Eligibility" Korean column and
 * the disclaimer use) and the title block's top margin (y = 40), so it lines
 * up with the composition instead of floating in it.
 *
 * The size is the embed's existing one, unchanged: a 320px box holding
 * Spotify's own 100% x 80 player. It ends at x = 1921, well inside the grid's
 * 2035 right edge, and at y = 136, well above the columns.
 */
export const ABOUT_PLAYER_SLOT = { x: 1601 + ABOUT_SAFE_SHIFT, y: 40, width: 320 } as const;

/** How long to wait for the embed to confirm playback before offering the
 * real player instead. Generous, because a cold embed can take a few seconds
 * to load and start before its first playback_update arrives. */
const CONFIRM_TIMEOUT_MS = 6000;

/* Minimal shape of the bits of Spotify's IFrame API this uses. */
type PlaybackUpdate = { data: PlaybackData };
type EmbedController = {
  play: () => void;
  pause: () => void;
  resume: () => void;
  addListener: (event: string, cb: (e: PlaybackUpdate) => void) => void;
};
type IFrameAPI = {
  createController: (
    el: HTMLElement,
    options: { uri: string; width: string | number; height: string | number },
    cb: (controller: EmbedController) => void,
  ) => void;
};
declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: IFrameAPI) => void;
  }
}

type SpotifyState = {
  controllerReady: boolean;
  isPlaying: boolean;
  playerVisible: boolean;
  playbackError: boolean;
  /** Opens or closes the sidebar panel. Never destroys the embed. */
  togglePanel: () => void;
  setPlayerVisible: (visible: boolean) => void;
};

const SpotifyContext = createContext<SpotifyState | null>(null);

export function useSpotify() {
  return useContext(SpotifyContext);
}

/**
 * Holds the one Spotify embed for the whole site.
 *
 * Mounted in the root layout, which is the only thing that survives a route
 * change, so the iframe is created once and never torn down: navigating
 * between the Opening, the Timeline, group profiles and their category pages
 * leaves the track, its position and the play state exactly as they were.
 *
 * The iframe is always mounted — collapsed and non-interactive rather than
 * `display: none`, which would stop the embed working — and expands into a
 * small popover only when the reader asks for it or playback fails.
 */
export default function SpotifyProvider({ children }: { children: ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<EmbedController | null>(null);
  /* Guards React's double-invoked effects in development, which would
   * otherwise build a second controller over the first. */
  const createdRef = useRef(false);
  /* True between asking for playback and the embed confirming it. */
  const pendingRef = useRef(false);
  /* True when the player was opened by the failure fallback rather than by
   * the reader, so a late confirmation can put it away again. */
  const autoRevealedRef = useRef(false);
  /* True once sound has actually been heard. The loop only ever restarts music
   * the reader already started, so it can never autoplay on load — which is
   * both the browser's rule and the right behaviour for the room. */
  const hasPlayedRef = useRef(false);
  /* The pending end-of-playlist confirmation, cancelled the moment the embed
   * shows any sign of carrying on by itself. */
  const endTimerRef = useRef<number | null>(null);

  const [controllerReady, setControllerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  /* Closed on every route. The panel overlays the canvas, so opening it by
   * default put it on top of the Timeline charms; the sidebar button is the
   * only thing that opens it. Closed it is fully click-through, so it covers
   * nothing. */
  const [playerVisible, setPlayerVisible] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);

  /** Show or hide the panel. The embed underneath is untouched either way, so
   * whatever is playing keeps playing once the panel is out of sight. */
  const togglePanel = useCallback(() => {
    autoRevealedRef.current = false;
    setPlayerVisible((open) => !open);
  }, []);

  useEffect(() => {
    if (createdRef.current) return;
    createdRef.current = true;

    const build = (api: IFrameAPI) => {
      if (!hostRef.current || controllerRef.current) return;
      api.createController(
        hostRef.current,
        { uri: PLAYLIST_URI, width: "100%", height: "80" },
        (controller) => {
          controllerRef.current = controller;
          setControllerReady(true);
          /* The embed is the only authority on whether sound is actually
           * playing, so `isPlaying` is derived from its events rather than
           * from the fact that `play()` was called. */
          controller.addListener("playback_update", (event) => {
            const paused = event?.data?.isPaused ?? true;
            setIsPlaying(!paused);

            /* Any fresh update means the embed is still doing something, so a
             * confirmation left over from the previous one is stale. Clearing
             * it first is what makes the gap between two tracks harmless: the
             * next track's update arrives inside the window and cancels the
             * restart that the previous track's ending had armed. */
            if (endTimerRef.current !== null) {
              window.clearTimeout(endTimerRef.current);
              endTimerRef.current = null;
            }
            if (hasPlayedRef.current && isStoppedAtEnd(event?.data)) {
              endTimerRef.current = window.setTimeout(() => {
                endTimerRef.current = null;
                /* Nothing has come in since, so the playlist really has run
                 * out. `play()` restarts it from the top — the only repeat the
                 * embed offers, since it has no loop of its own. */
                controllerRef.current?.play();
              }, END_CONFIRM_MS);
            }

            if (!paused) {
              hasPlayedRef.current = true;
              pendingRef.current = false;
              setPlaybackError(false);
              /* A cold embed can take several seconds to start, so the
               * fallback may already have shown the player. Now that sound is
               * confirmed, put it back — but only if the reader did not open
               * it themselves. */
              if (autoRevealedRef.current) {
                autoRevealedRef.current = false;
                setPlayerVisible(false);
              }
            }
          });
        },
      );
    };

    if (window.onSpotifyIframeApiReady === undefined) {
      window.onSpotifyIframeApiReady = build;
    }
    if (!document.querySelector(`script[src="${IFRAME_API_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = IFRAME_API_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  /* The embed itself is deliberately never torn down, but a pending restart
   * is not part of it — nothing should be able to reach for a controller that
   * has gone away. */
  useEffect(
    () => () => {
      if (endTimerRef.current !== null) window.clearTimeout(endTimerRef.current);
    },
    [],
  );

  return (
    <SpotifyContext.Provider
      value={{
        controllerReady,
        isPlaying,
        playerVisible,
        playbackError,
        togglePanel,
        setPlayerVisible: (visible: boolean) => {
          autoRevealedRef.current = false;
          setPlayerVisible(visible);
        },
      }}
    >
      {children}
      {/* The player lives here, outside the stage and outside the router, for
        * one reason: this element is never unmounted, so the iframe inside it
        * is created once and never rebuilt. Opening or closing About, moving
        * between group pages and replaying the Opening all leave the track,
        * its position and the play state untouched.
        *
        * It is therefore positioned rather than parented into the About
        * screen. `--stage-scale` (published by ScaleStage) maps the design
        * slot above onto the scaled canvas, and `--about-scroll` (published by
        * AboutScreen) carries the About screen's scroll offset, so the player
        * travels with the column it sits beside instead of floating over the
        * text once the reader scrolls. Scaling with the canvas is what keeps
        * it inside its authored slot at every viewport width. */}
      <div
        aria-hidden={!playerVisible}
        style={{
          position: "fixed",
          left: `calc(${ABOUT_PLAYER_SLOT.x}px * var(--stage-scale, 1))`,
          top: `calc((${ABOUT_PLAYER_SLOT.y}px - var(--about-scroll, 0px)) * var(--stage-scale, 1))`,
          width: ABOUT_PLAYER_SLOT.width,
          transform: "scale(var(--stage-scale, 1))",
          transformOrigin: "top left",
          zIndex: 60,
          padding: 8,
          background: "#14081a",
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0px 0px 24px rgba(242,89,163,0.18)",
          opacity: playerVisible ? 1 : 0,
          transition: "opacity 300ms ease-out",
          pointerEvents: playerVisible ? "auto" : "none",
        }}
      >
        {/* Spotify's own player, rendered as-is. Nothing overlaps it and no
          * branding is covered or restyled. */}
        <div ref={hostRef} />
      </div>
    </SpotifyContext.Provider>
  );
}
