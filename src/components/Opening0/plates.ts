/**
 * opening0 — the idle / attract wall.
 *
 * Seventeen decorative plates ring the canvas. Each is drawn twice in Figma:
 * a photo fill and a hairline outline stroke on top. Both share the plate's
 * box, so they are stored together here — the photo breathes, the outline
 * stays static.
 *
 * Coordinates are literal Figma pixels from the `Opening0` frame and are the
 * only source of position — nothing in this scene ever moves.
 *
 * Opacity is deliberately absent here. The plates breathe continuously via
 * `lib/opening/breathing.ts`, which derives each plate's cycle from its id —
 * so this file stays purely geometric.
 */
export type Opening0Plate = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Figma bleeds the outline stroke past the box by half its width. */
  outlineInsetY: string;
  outlineInsetX: string;
};

/** The photo fill overhangs its box by exactly 1px on every side. */
export const PHOTO_BLEED = 1;

export const OPENING0_PLATES: Opening0Plate[] = [
  { id: "vector147", x: 1868, y: 584, w: 154, h: 144, outlineInsetY: "-0.17%", outlineInsetX: "-0.16%" },
  { id: "vector58", x: 1599, y: 344, w: 153, h: 224, outlineInsetY: "-0.11%", outlineInsetX: "-0.16%" },
  { id: "vector161", x: 20, y: 984, w: 323, h: 144.0000457763672, outlineInsetY: "-0.17%", outlineInsetX: "0%" },
  { id: "vector129", x: 1786, y: 29, w: 242, h: 223.5, outlineInsetY: "-0.11%", outlineInsetX: "-0.1%" },
  { id: "vector159", x: 1516, y: 744, w: 242, h: 144, outlineInsetY: "-0.17%", outlineInsetX: "-0.1%" },
  { id: "vector157", x: 290, y: 24, w: 154.5, h: 120, outlineInsetY: "-0.21%", outlineInsetX: "-0.16%" },
  { id: "vector154", x: 20, y: 104, w: 152, h: 224, outlineInsetY: "-0.11%", outlineInsetX: "-0.16%" },
  { id: "vector170", x: 994, y: 109, w: 323, h: 144, outlineInsetY: "-0.17%", outlineInsetX: "0%" },
  { id: "vector145", x: 636, y: 816, w: 240, h: 224, outlineInsetY: "-0.11%", outlineInsetX: "-0.1%" },
  { id: "vector153", x: 198, y: 502, w: 154, h: 144, outlineInsetY: "-0.17%", outlineInsetX: "-0.16%" },
  { id: "vector56", x: 1259, y: 984, w: 153, h: 144, outlineInsetY: "-0.17%", outlineInsetX: "-0.16%" },
  { id: "vector127", x: 548, y: 24, w: 160, h: 224, outlineInsetY: "-0.11%", outlineInsetX: "-0.16%" },
  { id: "vector171", x: 372, y: 744, w: 152.5, h: 200.5, outlineInsetY: "-0.12%", outlineInsetX: "-0.16%" },
  { id: "vector62", x: 20, y: 744, w: 151, h: 120, outlineInsetY: "-0.21%", outlineInsetX: "-0.17%" },
  { id: "vector61", x: 1780, y: 848, w: 154, h: 200, outlineInsetY: "-0.13%", outlineInsetX: "-0.16%" },
  { id: "vector151", x: 1076, y: 744, w: 241, h: 144.5, outlineInsetY: "-0.17%", outlineInsetX: "-0.1%" },
  { id: "vector131", x: 1428, y: 24, w: 153, h: 144, outlineInsetY: "-0.17%", outlineInsetX: "-0.16%" },
];
