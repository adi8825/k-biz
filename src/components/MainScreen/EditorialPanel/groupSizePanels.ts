/**
 * The five Group Size information panels, shown while a Member Count row label
 * is hovered, in the Members sort mode only.
 *
 * Unlike the generation and type families these are single authored SVGs
 * rather than transcribed plates and text, so there is no element registry —
 * only which file belongs to which row, and the size each file was exported
 * at. Nothing here re-derives the composition.
 *
 * `min`/`max` mirror the bands `memberCountRows` already uses, so a hover
 * isolates exactly the charms that row contains. They are not a second
 * bucketing rule: the row key is what ties the two together.
 */

export type SizeId = "3-4" | "5" | "6" | "7" | "8+";

export type GroupSizePanelData = {
  id: SizeId;
  file: string;
  /** The exported file's own pixel size. Rendered at exactly this, never
   * scaled — each export carries a little bleed past the 323x1136 panel. */
  width: number;
  height: number;
  min: number;
  max: number | null;
};

export const GROUP_SIZE_PANELS: Record<SizeId, GroupSizePanelData> = {
  "3-4": { id: "3-4", file: "members_3_4.svg", width: 332, height: 1140, min: 3, max: 4 },
  "5": { id: "5", file: "members_5.svg", width: 329, height: 1138, min: 5, max: 5 },
  "6": { id: "6", file: "members_6.svg", width: 330, height: 1137, min: 6, max: 6 },
  "7": { id: "7", file: "members_7.svg", width: 326, height: 1139, min: 7, max: 7 },
  "8+": { id: "8+", file: "members_8plus.svg", width: 351, height: 1139, min: 8, max: null },
};

export const GROUP_SIZE_PANEL_IDS: SizeId[] = ["3-4", "5", "6", "7", "8+"];

/** The row key `memberCountRows` uses is already the panel id. */
export function groupSizePanelForKey(key: string): SizeId | null {
  return (GROUP_SIZE_PANEL_IDS as string[]).includes(key) ? (key as SizeId) : null;
}

/** Whether a group's member count falls in a panel's band. */
export function inSizeBand(count: number, id: SizeId): boolean {
  const { min, max } = GROUP_SIZE_PANELS[id];
  return count >= min && (max === null || count <= max);
}
