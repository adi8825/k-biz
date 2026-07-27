import type { Transition } from "framer-motion";

/**
 * One coordinated sort-mode transition.
 *
 * Every charm shares this exact tween — no stagger, no distance-based delay —
 * so the whole timeline starts and finishes together and reads as a single
 * calm movement rather than a scatter of independent animations.
 */
export const POSITION_TRANSITION: Transition = {
  duration: 1.1,
  // Near-constant velocity: just enough ease at each end to avoid a robotic
  // start/stop, without the noticeable acceleration and slow settle of a
  // standard ease-in-out. Charms should read as being repositioned rather
  // than accelerating and coming to rest.
  ease: [0.35, 0, 0.65, 1],
};

/** Surplus strings/labels leaving the layout: a gentle fade, started at once
 * so the outgoing row is already receding as the charms set off. */
export const EXIT_FADE: Transition = { duration: 0.45, ease: "easeOut" };

/** Newly added strings arrive while the charms are mid-flight. */
export const ENTER_FADE: Transition = { duration: 0.6, delay: 0.25, ease: "easeOut" };

/** Row wording swaps late, so labels settle towards the end of the movement. */
export const LABEL_TEXT_FADE: Transition = { duration: 0.35, ease: "easeInOut" };

/**
 * Generation-hover dimming for strings and row labels.
 *
 * Matches the charm dimming in `globals.css` exactly — same 0.15 floor, and
 * the same directional timing where fading out is slower than coming back —
 * so a hovered generation reads identically to a filter selection.
 */
export const DIMMED_OPACITY = 0.15;
export const DIM_FADE: Transition = { duration: 0.72, ease: "easeOut" };
export const UNDIM_FADE: Transition = { duration: 0.52, ease: "easeOut" };
