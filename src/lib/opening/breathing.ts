import type { CSSProperties } from "react";

/**
 * Continuous opacity breathing for the Opening's image-filled plates.
 *
 * This is deliberate motion added in code — it is not a Figma property, and
 * the static frames show every image at full opacity. It applies only to
 * plates that contain a photograph; empty outline plates, the lattice, the
 * charm, the logo and all typography stay completely static.
 *
 * The effect is layered so it cannot interfere with the approved scene
 * cross-fades:
 *
 *   outer layer  — scene-transition opacity (0 <-> 1), owned by `transitions.ts`
 *   inner layer  — this breathing loop
 *
 * CSS multiplies nested opacities, so an outgoing scene still reaches a true 0
 * no matter where its plates happen to be in their cycle.
 *
 * Every tunable value lives in `BREATHING` below, so the whole wall can be
 * retimed from one place. The keyframes themselves are in `globals.css`.
 */
export const BREATHING = {
  /**
   * Seconds for one complete breath (hold at full, ease down, ease back).
   * Every value is a prime number of tenths, which makes them pairwise
   * coprime — the combined pattern has no practical repeat period, so the
   * wall never settles into a rhythm the eye can follow.
   */
  durationsSeconds: [5.3, 5.9, 6.1, 6.7, 7.1, 7.3, 7.9, 8.3, 8.9, 9.7, 10.3, 10.9, 11.3],

  /** Added to the base in thousandths of a second, so no two plates share an
   * exact period. Keeps the total inside the 5-12s band. */
  jitterMilliseconds: 601,

  /** Photographs fade the whole way out and back in again. The outline they
   * sit in is a separate layer and never fades, so a plate reads as an empty
   * frame at the bottom of the cycle rather than a hole in the wall. */
  minOpacity: 0,

  /** Delays are negative and spread across at least one full cycle, so on load
   * the wall is already mid-breath rather than starting together at full. */
  delaySpreadSeconds: 24,

  /** Selects which phase arrangement to use — see {@link breathingStyle}.
   * Chosen by measuring neighbour clustering across all four scenes. */
  phaseSalt: 1,

  /** Fallback only. The curve that matters is shaped per-segment inside the
   * `opening-plate-breathe` keyframes — see `globals.css`. */
  easing: "ease-in-out",
} as const;

/** FNV-1a. Small, stable, and identical on server and client — the values must
 * not be random or hydration would mismatch. */
function hash(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Derives a plate's cycle from its id.
 *
 * Duration and phase are hashed independently so they don't correlate — and
 * because the id is used rather than the array index, neighbouring plates get
 * unrelated timings instead of a travelling wave.
 *
 * `phaseSalt` shifts the whole phase assignment. It is a tuning knob, not
 * decoration: since photographs now fade completely out, the salt was chosen
 * by measuring how often plates that sit near each other are invisible at the
 * same moment, and keeping the arrangement that clustered least.
 */
export function breathingStyle(plateId: string): CSSProperties {
  const { durationsSeconds, jitterMilliseconds, minOpacity, delaySpreadSeconds, phaseSalt, easing } =
    BREATHING;

  // A prime base plus a small jitter: the base keeps cycles spread across the
  // 5-12s band, the jitter stops two plates ever sharing an exact period.
  const base = durationsSeconds[hash(`${plateId}|duration`) % durationsSeconds.length];
  const duration = base + (hash(`${plateId}|jitter`) % jitterMilliseconds) / 1000;
  const delay = -(hash(`${plateId}|phase|${phaseSalt}`) % (delaySpreadSeconds * 10)) / 10;

  return {
    "--breathe-duration": `${duration}s`,
    "--breathe-delay": `${delay}s`,
    "--breathe-min": minOpacity.toFixed(3),
    "--breathe-ease": easing,
  } as CSSProperties;
}

/** Class that runs the loop. Pair it with {@link breathingStyle}. */
export const BREATHING_CLASS = "opening-breathe";
