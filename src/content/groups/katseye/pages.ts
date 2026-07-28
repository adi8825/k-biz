import { getGroupById } from "@/data/groups";
import type { GroupSvgPage } from "@/components/GroupPage/shared/types";

const ASSET = "/groups/katseye/pages";

/**
 * KATSEYE's charm is authored as five whole-charm states rather than as five
 * sliced parts: each file draws the entire charm with one page's part lit and
 * the others already dimmed, so nothing is dimmed at runtime. Measured at
 * 131x546 each — the 130.254x544 charm box plus the usual 1px bleed — with the
 * lit band at full strength and the rest at about a quarter, and `tag.png`
 * lighting all five, which is the General state.
 */
const CHARM_STATES = "/groups/katseye/charm";

const group = getGroupById("katseye");
if (!group) {
  throw new Error('"katseye" not found in groups.json');
}

/**
 * KATSEYE's five panel pages.
 *
 * Unlike BTS, NewJeans and NCT — whose pages are transcribed into positioned
 * text and image elements — these arrived from Figma as five finished SVGs, so
 * nothing is transcribed here. Each entry only says which file is which page
 * and where its ink sits inside the file; the artwork is the page.
 *
 * The type in these files is outlined, so no font can substitute and no
 * measurement of ours can wrap it.
 *
 * `width`/`height` are each file's own canvas. Figma exported every page at
 * the union of its content bounds rather than at the panel frame, so no two
 * agree and each carries a different amount of empty padding. `inkX`/`inkY`
 * are where the artwork actually starts inside that canvas, measured by
 * rasterising each file and taking the bounding box of its opaque pixels.
 * Offsetting by them lands the ink on the 323x1136 slot with the project's
 * usual 1px bleed: four of the five measure 325x1138 of ink, which is exactly
 * that slot plus the bleed.
 */
const page = (
  name: string,
  file: string,
  width: number,
  height: number,
  inkX: number,
  inkY: number,
): GroupSvgPage => ({
  name,
  svg: `${ASSET}/${file}.svg`,
  width,
  height,
  inkX,
  inkY,
  /* The pages leave the charm slot empty — measured at 0% coverage on every
   * one of them, against 27-40% for the panel as a whole — so the charm is
   * drawn over the artwork exactly as it is for every other group. */
  charmStatesBase: CHARM_STATES,
});

export const general = page("KATSEYE", "general", 336, 1138, 0, 0);
export const nationality = page("KATSEYE", "nationality", 358, 1145, 12, 0);
export const language = page("KATSEYE", "language", 342, 1139, 0, 0);
export const formation = page("KATSEYE", "formation", 364, 1138, 19, 0);
export const status = page("KATSEYE", "status", 359, 1138, 16, 0);

/** Page order matches every other group: General, Nationality, Language,
 * Formation, Status — the order the charm regions index into. */
export const pages: GroupSvgPage[] = [general, nationality, language, formation, status];
