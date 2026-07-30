/**
 * The five Nationality information panels, shown while a Nationality row label
 * is hovered, in the Nationality sort mode only.
 *
 * Like the Group Size family these are single authored SVGs rather than
 * transcribed plates and text, so there is no element registry — only which
 * file belongs to which row, the size each file was exported at, and where its
 * artwork begins inside that file.
 *
 * `nationality` is the exact `groups.json` value the row matches, taken from
 * `nationalityRows` rather than restated: the row key already doubles as that
 * value, which is what ties a hover to the charms it isolates. Nothing here
 * introduces a second bucketing rule and nothing renames a dataset value.
 */

export type NationalityId = "100" | "75" | "50" | "25" | "0";

export type NationalityPanelData = {
  id: NationalityId;
  file: string;
  /** The exported file's own pixel size. Rendered at exactly this, never
   * scaled. */
  width: number;
  height: number;
  /**
   * Where the artwork's own ink starts inside that file, horizontally.
   *
   * Figma exported these at the union of each composition's bounds, so the
   * amount of empty canvas to the left differs per file while the ink itself is
   * a consistent 325-327px wide — the 323px slot plus the 1px bleed every asset
   * in this project carries. Measured by rasterising each file and taking the
   * bounding box of its opaque pixels. Vertically no such correction is needed:
   * every canvas is already the slot's own height, and the empty band at the
   * top of the artwork is part of the composition.
   */
  inkX: number;
  /** The exact `nationality` value in `groups.json` this row matches. */
  nationality: number;
};

export const NATIONALITY_PANELS: Record<NationalityId, NationalityPanelData> = {
  "100": { id: "100", file: "all_korean.svg", width: 328, height: 1137, inkX: 0, nationality: 100 },
  "75": { id: "75", file: "mostly_korean.svg", width: 349, height: 1138, inkX: 7, nationality: 75 },
  "50": { id: "50", file: "half_korean.svg", width: 334, height: 1136, inkX: 4, nationality: 50 },
  "25": {
    id: "25",
    file: "mostly_non_korea.svg",
    width: 326,
    height: 1138,
    inkX: 0,
    nationality: 25,
  },
  "0": { id: "0", file: "no_korean.svg", width: 329, height: 1137, inkX: 4, nationality: 0 },
};

/** Row order, matching `nationalityRows` top to bottom. */
export const NATIONALITY_PANEL_IDS: NationalityId[] = ["100", "75", "50", "25", "0"];

/** The row key `nationalityRows` uses is already the panel id. */
export function nationalityPanelForKey(key: string): NationalityId | null {
  return (NATIONALITY_PANEL_IDS as string[]).includes(key) ? (key as NationalityId) : null;
}

/** Whether a group belongs to a panel's row. Exact equality, the same test
 * `getTimelineRows` uses to fill the row in the first place. */
export function matchesNationality(value: number | null, id: NationalityId): boolean {
  return value !== null && value === NATIONALITY_PANELS[id].nationality;
}
