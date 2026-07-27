/**
 * The Opening scene's decorative lattice.
 *
 * This geometry is permanently mounted and completely static across every
 * scene — nothing here ever moves, scales, rotates or fades. Scene content
 * references these plates by `id` rather than repeating coordinates, so a
 * photo fill can never drift away from the outline it sits in.
 *
 * Coordinates are the literal Figma pixels from the opening1 frame. Later
 * frames re-declare a few of the same plates 1–2px apart (Figma drift); the
 * opening1 values are treated as canonical so the lattice stays fixed.
 */
export type PlateId = string;

export type Plate = {
  id: PlateId;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Outline asset. Omitted for `border` plates, which are drawn in CSS. */
  src?: string;
  /** Figma draws this plate mirrored (rotate 180 + flip Y === mirror X). */
  flipX?: boolean;
  /** Photo 01 is a bordered empty plate rather than an outline image. */
  border?: boolean;
};

/** Painted first (furthest back). */
export const PLATES: Plate[] = [
  { id: "vector126", src: "vector126.svg", x: 1427, y: 904, w: 73, h: 223 },
  { id: "vector127", src: "vector127.svg", x: 1516, y: 744, w: 160, h: 144 },
  { id: "vector114", src: "vector114.svg", x: 900, y: 904, w: 248.001, h: 224 },
  { id: "vector128", src: "vector128.svg", x: 1868, y: 504, w: 72, h: 144 },
  { id: "vector129", src: "vector129.svg", x: 1252, y: 24, w: 160, h: 144 },
  { id: "vector130", src: "vector130.svg", x: 1780, y: 904, w: 248, h: 224 },
  { id: "vector131", src: "vector131.svg", x: 1604, y: 344, w: 160, h: 144 },
  { id: "vector113", src: "vector113.svg", x: 372, y: 743, w: 160, h: 384 },
  { id: "vector115", src: "vector115.svg", x: 372, y: 105, w: 160, h: 304 },
  { id: "vector125", src: "vector125.svg", x: 18, y: 344, w: 249, h: 304 },
];

export const PLATES_MID: Plate[] = [
  { id: "vector108", src: "vector108.svg", x: 18, y: 24, w: 162.5, h: 307 },
  { id: "vector109", src: "vector109.svg", x: 196, y: 584, w: 159.5, h: 383 },
  { id: "vector111", src: "vector111.svg", x: 1165, y: 983, w: 247, h: 144 },
  { id: "vector112", src: "vector112.svg", x: 726, y: 24, w: 246, h: 224 },
  { id: "vector110", src: "vector110.svg", x: 548, y: 824, w: 247, h: 144.5 },
  { id: "vector99", src: "vector99.svg", x: 1516, y: 24, w: 512, h: 304 },
];

export const PLATES_BACK: Plate[] = [
  { id: "vector122", src: "vector122.svg", x: 1871, y: 743, w: 160, h: 224 },
  // Restored: present in every Figma opening frame but omitted from the
  // original transcription. Figma draws it mirrored.
  { id: "vector54", src: "vector54.svg", x: 1780, y: 584, w: 160, h: 384, flipX: true },
  { id: "vector123", src: "vector123.svg", x: 114, y: 264, w: 248, h: 144 },
  { id: "photo07", src: "photo07.svg", x: 199, y: 344, w: 248, h: 224 },
  { id: "vector124", src: "vector124.svg", x: 195, y: 904, w: 160, h: 224 },
  { id: "photo15", src: "photo15.svg", x: 20, y: 904, w: 248, h: 224 },
  { id: "vector119", src: "vector119.svg", x: 21, y: 743, w: 246.5, h: 144 },
  { id: "vector120", src: "vector120.svg", x: 548, y: 983, w: 72.001, h: 144 },
  { id: "photo12", src: "photo12.svg", x: 1076, y: 904, w: 160, h: 143 },
  { id: "photo02", src: "photo02.svg", x: 636, y: 824, w: 159, h: 63 },
  { id: "photo20", src: "photo20.svg", x: 1788, y: 339, w: 160, h: 144 },
  { id: "photo16", src: "photo16.svg", x: 1076, y: 28, w: 160, h: 224 },
  { id: "vector117a", src: "vector117.svg", x: 1691, y: 662, w: 72, h: 144 },
  { id: "photo09", src: "photo09.svg", x: 458, y: 24, w: 160, h: 144 },
  { id: "vector121", src: "vector121.svg", x: 638, y: 104, w: 158, h: 143 },
  { id: "photo18", src: "photo18.svg", x: 812, y: 984, w: 160, h: 144 },
  { id: "photo17", src: "photo17.svg", x: 1956, y: 264, w: 72, h: 225.5 },
  { id: "photo13", src: "photo13.svg", x: 108, y: 24, w: 248, h: 224 },
  { id: "photo10", src: "photo10.svg", x: 1426, y: 24, w: 160, h: 64 },
  { id: "photo14", src: "photo14.svg", x: 639, y: 984, w: 160, h: 144 },
  { id: "photo19", src: "photo19.svg", x: 1517, y: 904, w: 160, h: 224 },
  { id: "vector117b", src: "vector117.svg", x: 990, y: 24, w: 72, h: 144 },
  { id: "photo01", border: true, x: 1693, y: 904, w: 71, h: 144 },
];

/** Every plate, in paint order. Used by the plate census. */
export const ALL_PLATES: Plate[] = [...PLATES, ...PLATES_MID, ...PLATES_BACK];

const BY_ID = new Map(ALL_PLATES.map((p) => [p.id, p]));

export function plate(id: PlateId): Plate {
  const found = BY_ID.get(id);
  if (!found) throw new Error(`Unknown Opening plate id: ${id}`);
  return found;
}
