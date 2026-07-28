import { getGroupById } from "@/data/groups";
import type { GroupGeneralContent } from "@/components/GroupPage/shared/types";

/* A few `label-sm` English boxes carry a width a little larger than the one
 * Figma reports. Figma authors them as a single 20px line, but the browser
 * sets Satoshi 20px marginally wider than Figma measures it, so at Figma's own
 * width the label wrapped to a second line, doubled to 40px tall and ran into
 * its Korean twin 24px below. Each is Figma's width rounded up to the natural
 * single-line width plus 2px of slack. The text is left-aligned, so the extra
 * width is empty space to the right and no glyph moves.
 *
 * "Virgin Music" and "Tencent Music" wrapped for a second reason: the Figma
 * text ends in a non-breaking space, which — unlike an ordinary trailing space
 * — neither breaks nor hangs, so it counts toward the line and pushes ~5.5px
 * past the box. The character is left as authored and the box holds it. */

const ASSET = "/groups/nct/formation";

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
 * Formation page for NCT — transcribed from the Figma
 * "Group/Formation/NCT" frame (1180:113263).
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
  heading: { en: "Formation", ko: "형성" },

  elements: [
    { type: "image", src: `${ASSET}/p02.png`, x: 169, y: 216, width: 154, height: 64 },
    { type: "text", lang: "en", variant: "label-lg", text: "Company", x: 173, y: 300, width: 103, height: 24 },
    { type: "text", lang: "ko", variant: "label-lg", text: "회사", x: 173, y: 328, width: 42, height: 24 },
    { type: "image", src: `${ASSET}/p07.png`, x: 169, y: 376, width: 154, height: 223.5 },
    { type: "text", lang: "en", text: "Global", x: 181, y: 573, width: 45, height: 20 },
    { type: "text", lang: "ko", text: "세계적인", x: 181, y: 597, width: 51, height: 17 },
    { type: "text", lang: "en", variant: "label-sm", text: "Virgin Music ", x: 181, y: 622, width: 116, height: 20 },
    { type: "text", lang: "ko", variant: "label-sm", text: "버진 뮤직", x: 181, y: 646, width: 75, height: 20 },
    { type: "image", src: `${ASSET}/p06.png`, x: 0, y: 696, width: 153.5, height: 144 },
    { type: "image", src: `${ASSET}/p09.png`, x: 257, y: 696, width: 65, height: 64 },
    { type: "text", lang: "en", variant: "label-sm", text: "Avex Trax", x: 127, y: 704, width: 84, height: 20 },
    { type: "text", lang: "en", variant: "label-sm", text: "Japan", x: 77, y: 705.5, width: 42, height: 20 },
    { type: "text", lang: "ko", variant: "label-sm", text: "에이벡스 트랙스", x: 127, y: 728, width: 127, height: 20 },
    { type: "text", lang: "ko", text: "일본", x: 77, y: 729.5, width: 26, height: 17 },
    { type: "image", src: `${ASSET}/p05.png`, x: 170, y: 776, width: 153, height: 144 },
    { type: "image", src: `${ASSET}/p08.png`, x: 0, y: 856, width: 65, height: 64 },
    { type: "text", lang: "en", variant: "label-sm", text: "Tencent Music ", x: 130, y: 865, width: 134, height: 20 },
    { type: "text", lang: "en", variant: "label-sm", text: "China", x: 81, y: 866.5, width: 41, height: 20 },
    { type: "text", lang: "ko", variant: "label-sm", text: "텐센트 뮤직", x: 130, y: 889, width: 92, height: 20 },
    { type: "text", lang: "ko", text: "중국", x: 81, y: 890.5, width: 26, height: 17 },
    { type: "image", src: `${ASSET}/p04.png`, x: 170, y: 936, width: 153, height: 144 },
    { type: "text", lang: "en", variant: "label-sm", text: "Main Company", x: 4, y: 948, width: 136, height: 20 },
    { type: "text", lang: "ko", variant: "label-sm", text: "주요 회사", x: 4, y: 972, width: 75, height: 20 },
    { type: "text", lang: "en", variant: "label-lg", text: "SM Entertainment", x: 4, y: 1016, width: 188, height: 24 },
    { type: "text", lang: "ko", variant: "label-lg", text: "SM 엔터테인먼트", x: 4, y: 1048, width: 165, height: 24 },
    { type: "image", src: `${ASSET}/p03.png`, x: 4, y: 1095, width: 319, height: 40 },
  ],
};
