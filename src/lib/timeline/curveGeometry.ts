/**
 * Shared anchor maths for hanging charms on a timeline curve.
 *
 * Everything here is derived from the two committed assets, not fitted:
 *
 *  - `public/mainscreen/curve.svg` is a symmetric pair of cubic Béziers over
 *    a 1446.12 x 119.49 viewBox, drawn with `preserveAspectRatio="none"` so it
 *    stretches exactly to whatever box CurveLine gives it.
 *
 *  - Every charm SVG in `public/charms` uses a 161-unit-tall viewBox whose
 *    first path is the small top loop. Measured across all 124 files the loop
 *    centre sits at y = 9.4053 (120 files, viewBox 39x161) or y = 9.3789
 *    (4 files, viewBox 38x161) — a 0.026px difference at render size, so a
 *    single shared constant is used rather than per-asset offsets.
 */

const CURVE_VB_WIDTH = 1446.12;
const CURVE_VB_HEIGHT = 119.49;

/** The two cubic segments of curve.svg, as [P0, P1, P2, P3] control points. */
const SEGMENTS: [number, number][][] = [
  [
    [0.0619558, 0.239967],
    [0.0619558, 0.239967],
    [436.917, 119.24],
    [723.062, 119.24],
  ],
  [
    [723.062, 119.24],
    [1009.21, 119.24],
    [1446.06, 0.239967],
    [1446.06, 0.239967],
  ],
];

const JOIN_X = 723.062;

const CHARM_VB_HEIGHT = 161;
const CHARM_LOOP_CENTRE_VB_Y = 9.4053;

/**
 * Figma does not rest the loop centre on the line — it hangs the charm a
 * little below it, so the line reads as passing behind the pin rather than
 * through its middle.
 *
 * Measured against every hand-placed charm on the four authored timeline
 * screens (MainScreen/Defult, Sort/Nationality, Sort/NumberOfMembers and
 * top10): n = 402, mean 5.883, median 5.911, stdev 0.751 design px. The
 * spread is the scatter of hand placement; the median is the authored intent.
 */
const CHARM_HANG_BELOW_CURVE = 5.911;

function cubic(points: [number, number][], s: number, axis: 0 | 1): number {
  const u = 1 - s;
  return (
    u * u * u * points[0][axis] +
    3 * u * u * s * points[1][axis] +
    3 * u * s * s * points[2][axis] +
    s * s * s * points[3][axis]
  );
}

/** Solves the Bézier for y at a given x, both in curve.svg viewBox units. */
function curveViewBoxYAt(vbX: number): number {
  const segment = vbX <= JOIN_X ? SEGMENTS[0] : SEGMENTS[1];
  let lo = 0;
  let hi = 1;
  // The curve is monotonic in x within each segment, so plain bisection is
  // exact enough (50 iterations resolves far below sub-pixel).
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2;
    if (cubic(segment, mid, 0) < vbX) lo = mid;
    else hi = mid;
  }
  return cubic(segment, (lo + hi) / 2, 1);
}

export type CurveBox = { x: number; y: number; width: number; height: number };

/** The y of the drawn curve line at `x`, in the same design-pixel space the
 * curve box is positioned in. */
export function curveYAt(x: number, curve: CurveBox): number {
  const vbX = ((x - curve.x) * CURVE_VB_WIDTH) / curve.width;
  const clamped = Math.min(Math.max(vbX, 0), CURVE_VB_WIDTH);
  return curve.y + (curveViewBoxYAt(clamped) * curve.height) / CURVE_VB_HEIGHT;
}

/** Distance from a charm's top edge down to the centre of its top loop, for a
 * charm rendered at `height` design pixels. Charm images are rendered with
 * `object-fit: fill`, so the viewBox maps linearly onto the box and this is a
 * plain proportion — no letterboxing to account for. */
export function charmLoopOffset(height: number): number {
  return (height * CHARM_LOOP_CENTRE_VB_Y) / CHARM_VB_HEIGHT;
}

/** Top edge for a charm of `height` hung on the curve at `centreX`, at the
 * same distance below the line that Figma places its charms. */
export function charmTopOnCurve(centreX: number, height: number, curve: CurveBox): number {
  return curveYAt(centreX, curve) - charmLoopOffset(height) + CHARM_HANG_BELOW_CURVE;
}
