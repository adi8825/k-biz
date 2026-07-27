import type { CharmRegion } from "@/lib/timeline/charmRegions";

/**
 * The large charm, cut into its five parts.
 *
 * These strips are slices of the authored `charm/general.png` — the frame
 * where Figma draws every part at full strength — cut at the midpoint of each
 * empty gap between parts. Nothing is redrawn or repositioned: stacked at the
 * offsets below they reassemble the original image exactly, pixel for pixel.
 *
 * Slicing is what lets a page change animate the *parts* rather than swap two
 * whole charm images over each other, which is what made the change read as a
 * flash rather than a fade.
 */
export type CharmPart = {
  region: CharmRegion;
  src: string;
  /** Top offset inside the charm box, in design px. */
  top: number;
  /** Natural height of the strip, in design px. */
  height: number;
};

/** Every group charm fills the same 130.254x544 slot with the same five parts
 * at the same offsets - only the artwork and its accent colour differ - so the
 * geometry below is shared and only the folder changes per group. */
export const DEFAULT_CHARM_PARTS_BASE = "/groups/bts/charm/parts";

const BANDS: { region: CharmRegion; top: number; height: number }[] = [
  { region: "bar", top: -1, height: 69 },
  { region: "language", top: 68, height: 38 },
  { region: "flower", top: 106, height: 114 },
  { region: "pearl", top: 220, height: 53 },
  { region: "tag", top: 273, height: 272 },
];

/** The five parts for one group, resolved against its own asset folder. */
export function charmParts(base: string = DEFAULT_CHARM_PARTS_BASE): CharmPart[] {
  return BANDS.map((b) => ({ ...b, src: base + "/" + b.region + ".png" }));
}

/** Figma dims every part it is not about to 0.25, and General lights them all. */
export const DIM_PART_OPACITY = 0.25;

/** One page's worth of highlight. `null` is General — everything lit. */
export function partOpacity(part: CharmRegion, active: CharmRegion | null): number {
  if (active === null) return 1;
  return part === active ? 1 : DIM_PART_OPACITY;
}
