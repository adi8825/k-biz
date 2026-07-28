import { getGroupById } from "@/data/groups";
import type { GroupGeneralContent } from "@/components/GroupPage/shared/types";

const ASSET = "/groups/nct/language";

const group = getGroupById("nct");
if (!group) {
  throw new Error('"nct" not found in groups.json');
}
const charmAsset = group.positions[0]?.asset;
if (!charmAsset) {
  throw new Error('"nct" has no charm position/asset in groups.json');
}
/* groups.json carries no `charm.color` for NCT, and this task does not change
 * that file, so the accent is read from the group's own authored charm — the
 * stroke of /charms/NCT.svg. BTS's charm.color (#c97dff) is exactly its SVG
 * stroke, so this is the same value from the same source, not a new one. */
const koColor = group.charm?.color ?? "#ff9a3d";

/**
 * Language page for NCT — transcribed from the Figma
 * "Group/Language/NCT" frame (1180:113149).
 *
 * Same shape as the BTS and NewJeans pages: the header renders the name,
 * the hero photo and the category heading, and everything else is a flat
 * list of authored elements at their Figma coordinates.
 */
export const content: GroupGeneralContent = {
  name: group.name,
  debutYear: String(group.debutYear ?? "—"),
  charmAsset,
  koColor,
  charmPartsBase: "/groups/nct/charm/parts",

  nameKo: "엔시티",
  heroPhoto: `${ASSET}/p01.png`,
  heading: { en: "Language", ko: "언어" },

  elements: [
    { type: "image", src: `${ASSET}/p02.png`, x: 169, y: 216, width: 154, height: 64 },
    { type: "text", lang: "en", variant: "stat-md", text: "Songs", x: 250, y: 304, width: 66, height: 24 },
    { type: "text", lang: "en", variant: "stat-lg", text: "543", x: 171, y: 306, width: 71, height: 48 },
    { type: "text", lang: "ko", variant: "stat-md", text: "노래들", x: 250, y: 332, width: 63, height: 24 },
    { type: "image", src: `${ASSET}/p03.png`, x: 169, y: 376, width: 154, height: 64 },
    { type: "text", lang: "en", variant: "stat-md", text: "286", x: 180, y: 462, width: 57, height: 43 },
    { type: "text", lang: "en", variant: "stat-md", text: "Korean", x: 253, y: 462, width: 60, height: 20 },
    { type: "text", lang: "ko", variant: "stat-md", text: "한국인", x: 253, y: 486, width: 52, height: 20 },
    { type: "image", src: `${ASSET}/p04.png`, x: 169, y: 536, width: 154, height: 224 },
    { type: "text", lang: "en", text: "94", x: 186, y: 634, width: 39, height: 43 },
    { type: "text", lang: "en", text: "Chinese", x: 171, y: 693, width: 69, height: 20 },
    { type: "image", src: `${ASSET}/p07.png`, x: 0, y: 696, width: 153, height: 144 },
    { type: "text", lang: "ko", text: "중국인", x: 179.5, y: 721, width: 52, height: 20 },
    { type: "image", src: `${ASSET}/p06.png`, x: 169, y: 776, width: 154, height: 223.5 },
    { type: "text", lang: "en", text: "142", x: 91, y: 792, width: 48, height: 43 },
    { type: "text", lang: "en", text: "Japanese", x: 74, y: 851, width: 82, height: 20 },
    { type: "image", src: `${ASSET}/p08.png`, x: 0, y: 855, width: 65, height: 145 },
    { type: "text", lang: "ko", text: "일본인", x: 89, y: 879, width: 52, height: 20 },
    { type: "image", src: `${ASSET}/p05.png`, x: 81, y: 936, width: 242, height: 200 },
    { type: "image", src: `${ASSET}/p09.png`, x: 257, y: 1016, width: 66, height: 64 },
    { type: "text", lang: "en", variant: "stat-md", text: "21", x: 24, y: 1032, width: 29, height: 43 },
    { type: "text", lang: "en", variant: "stat-md", text: "English", x: 8, y: 1083, width: 61, height: 20 },
    { type: "text", lang: "ko", variant: "label-sm", text: "영어", x: 21, y: 1107, width: 35, height: 20 },
  ],
};
