/**
 * The five parts every Timeline charm is built from.
 *
 * The charm is a single flattened SVG, so these are not elements — they are
 * bands of its height. That is safe because the anatomy is identical across
 * the whole dataset: all 124 charm files resolve into the same five vertical
 * clusters, at the same coordinates in the same 161-unit viewBox (113 are
 * byte-identical, the rest agree within a pixel), and they match the named
 * part files Opening4 already uses.
 *
 * Measured bands, in viewBox units:
 *   bar       0.4 -  18.4
 *   language 21.3 -  28.8
 *   flower   32.7 -  63.1
 *   pearl    65.8 -  79.3
 *   tag      81.5 - 159.9   <- the group-name plate at the bottom
 */
export type CharmRegion = "bar" | "language" | "flower" | "pearl" | "tag";

const CHARM_HEIGHT = 161;

/** Gap midpoints, so a click between two parts falls to the nearer one and
 * there are no dead zones anywhere down the charm. */
const BOUNDARIES: { upTo: number; region: CharmRegion }[] = [
  { upTo: 19.85 / CHARM_HEIGHT, region: "bar" },
  { upTo: 30.75 / CHARM_HEIGHT, region: "language" },
  { upTo: 64.45 / CHARM_HEIGHT, region: "flower" },
  { upTo: 80.4 / CHARM_HEIGHT, region: "pearl" },
  { upTo: Infinity, region: "tag" },
];

/**
 * Which region a point falls in, given its distance down the charm as a
 * fraction of the charm's height.
 *
 * Taking a fraction rather than pixels is what makes this survive ScaleStage:
 * the ratio is identical whether the stage is drawn at 2048px or 800px. The
 * fraction must be measured against the charm *button*, which is never
 * rotated — the sway lives on a layer inside it — so an in-flight swing does
 * not skew the result either. (Rotating 3deg about the top edge lifts the
 * bottom of the charm by 0.22 of a design pixel; nothing rounds differently.)
 */
export function regionAtFraction(fraction: number): CharmRegion {
  const clamped = Math.min(Math.max(fraction, 0), 1);
  return BOUNDARIES.find((b) => clamped < b.upTo)!.region;
}

/**
 * Which information page each region asks for. The tag — the group's name —
 * is the way back to the first page, so it is pinned to 0; the rest are
 * provisional and sequential.
 */
export const REGION_PAGE: Record<CharmRegion, number> = {
  tag: 0,
  bar: 1,
  language: 2,
  flower: 3,
  pearl: 4,
};

/**
 * Requests beyond what a group actually has fall back to its last page, so a
 * group with one page answers every region with page 0 and a click simply
 * does nothing visible.
 */
export function clampPage(page: number, pageCount: number): number {
  if (pageCount <= 0) return 0;
  return Math.min(Math.max(page, 0), pageCount - 1);
}
