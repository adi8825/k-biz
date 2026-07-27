import { charmTopOnCurve, type CurveBox } from "./curveGeometry";

export type { CurveBox };
export type ComputedPosition = { x: number; y: number };

const CHARM_WIDTH = 38.31;
const CHARM_HEIGHT = 160;

// The t-range is set by two hard spacing rules:
//   T_MAX — the last charm's right edge sits exactly 30px left of the
//           information panel (panel x=1717, charm right edge 1687).
//   T_MIN — the first charm's left edge sits at 386, keeping >=30px clear of
//           the widest row title in any sort mode (NumberOfMembers "8+ Members"
//           ends at x=356; Nationality's widest ends at 354; Type's at 329).
const T_MIN = 0.11076;
const T_MAX = 0.984;

/** The default span, used by every sort mode. */
export const SORT_SPAN: [number, number] = [T_MIN, T_MAX];

/** Evenly distributes `count` charms along a row's curve. Each charm's top is
 * placed so that the centre of its small top loop lands exactly on the drawn
 * curve — the y comes from the real curve.svg Bézier, not an approximation.
 *
 * `span` defaults to the approved sort span; other views (Top 10) pass their
 * own so they can occupy the generation timeline's wider extent. */
export function distributeAlongCurve(
  count: number,
  curveBox: CurveBox,
  span: [number, number] = SORT_SPAN,
): ComputedPosition[] {
  if (count <= 0) return [];

  const [tMin, tMax] = span;
  const positions: ComputedPosition[] = [];
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0.5 : tMin + (i * (tMax - tMin)) / (count - 1);
    const centreX = curveBox.x + t * curveBox.width;
    positions.push({
      x: centreX - CHARM_WIDTH / 2,
      y: charmTopOnCurve(centreX, CHARM_HEIGHT, curveBox),
    });
  }
  return positions;
}
