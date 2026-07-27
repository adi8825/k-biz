import type { CSSProperties } from "react";

/**
 * Single source of truth for Opening-sequence transition timing.
 *
 * The sequence should read like a museum exhibition rather than a slideshow:
 * the decorative lattice never moves, and only the content dissolves. Every
 * changing element shares this one tween so the whole scene turns over as a
 * single coordinated motion — no stagger, no per-element offsets.
 */
export const OPENING_TRANSITION_MS = 1400;

/** Gentle symmetric ease — no acceleration spike, no abrupt settle. */
export const OPENING_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

/** Opacity-only cross-fade. Nothing here translates, scales or rotates. */
export function openingFade(visible: boolean): CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transition: `opacity ${OPENING_TRANSITION_MS}ms ${OPENING_EASING}`,
    pointerEvents: visible ? undefined : "none",
  };
}
