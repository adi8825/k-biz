import type { CSSProperties } from "react";

/**
 * Hover sway for the hanging charms.
 *
 * Each charm is a small pendant on a string, so it pivots from its top loop
 * and swings through a degree or two before damping out and hanging still.
 * The keyframes in `globals.css` describe that decay; this file only decides
 * how far and how fast each charm swings.
 *
 * Values are hashed from the charm's name rather than randomised, so server
 * and client render identically and a charm keeps its character across sorts.
 */
export const SWAY = {
  /**
   * Seconds for a whole cycle — swing, settle, then rest. Spread across the
   * 5-8s band so no two charms share a rhythm.
   */
  cycleSeconds: [5.2, 5.6, 6.0, 6.4, 6.8, 7.1, 7.3],
  /** Added to the base so charms never share an exact period. */
  jitterMilliseconds: 601,
  /** Peak rotation, in degrees. Small enough to read as settling, not motion. */
  minAngle: 1,
  maxAngle: 3,
} as const;

/** Must match the `@keyframes` name in `globals.css`; Charm uses it to tell
 * its own sway apart from any other animation that bubbles an `animationend`. */
export const SWAY_ANIMATION = "charm-sway";

/** FNV-1a — small, stable, and identical on server and client. */
function hash(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Per-charm sway variables. Pair with the `charm-sway` class.
 *
 * The sign alternates so roughly half the charms lead left and half lead
 * right; a charm swinging the same way as its neighbour every time would read
 * as a mistake.
 *
 * There is deliberately no delay: a hover runs a single cycle, so any offset
 * would drop the charm into the middle of a swing and snap it to a rotated
 * angle the moment the pointer arrived.
 */
export function swayStyle(key: string): CSSProperties {
  const { cycleSeconds, jitterMilliseconds, minAngle, maxAngle } = SWAY;

  const base = cycleSeconds[hash(`${key}|cycle`) % cycleSeconds.length];
  const duration = base + (hash(`${key}|jitter`) % jitterMilliseconds) / 1000;
  const span = maxAngle - minAngle;
  const magnitude = minAngle + (hash(`${key}|angle`) % 101) * (span / 100);
  const direction = hash(`${key}|dir`) % 2 === 0 ? 1 : -1;

  return {
    "--sway-angle": `${(magnitude * direction).toFixed(2)}deg`,
    "--sway-duration": `${duration.toFixed(3)}s`,
  } as CSSProperties;
}
