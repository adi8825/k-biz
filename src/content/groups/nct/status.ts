import { getGroupById } from "@/data/groups";
import type { GroupGeneralContent } from "@/components/GroupPage/shared/types";

const ASSET = "/groups/nct/status";

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
 * Status page for NCT — transcribed from the Figma
 * "Group/Status/NCT" frame (1180:113408).
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
  heading: { en: "Status", ko: "활동 상태" },

  elements: [
    { type: "image", src: `${ASSET}/p02.png`, x: 169, y: 216, width: 154, height: 64 },
    { type: "text", lang: "en", variant: "label-lg", text: "Active", x: 171, y: 302, width: 64, height: 24 },
    { type: "text", lang: "ko", variant: "label-lg", text: "활동적인", x: 171, y: 330, width: 83, height: 24 },
    { type: "image", src: `${ASSET}/p03.png`, x: 169, y: 376, width: 154, height: 64 },
    { type: "text", lang: "en", text: "April 9, 2016", x: 227, y: 465, width: 86, height: 20 },
    { type: "text", lang: "en", text: "Debut", x: 168, y: 469, width: 42, height: 20 },
    { type: "text", lang: "ko", text: "데뷔", x: 168, y: 489, width: 26, height: 17 },
    { type: "text", lang: "ko", text: "2016년 4월 9일", x: 222.5, y: 493, width: 95, height: 17 },
    { type: "image", src: `${ASSET}/p05.png`, x: 168, y: 536, width: 154, height: 145 },
    { type: "text", lang: "en", variant: "label-lg", text: "2016", x: 3, y: 695, width: 53, height: 24 },
    { type: "image", src: `${ASSET}/p08.png`, x: 257, y: 696, width: 66, height: 64 },
    { type: "text", lang: "en", text: "Official Debut of Core Sub-Units", x: 3, y: 719, width: 218, height: 20 },
    { type: "text", lang: "ko", text: "코어 서브 유닛의 공식 데뷔", x: 3, y: 739, width: 153, height: 17 },
    { type: "text", lang: "en", variant: "label-lg", text: "2023", x: 172, y: 774, width: 58, height: 24 },
    { type: "image", src: `${ASSET}/p04.png`, x: 0, y: 776, width: 154, height: 64 },
    { type: "text", lang: "en", text: "Lucas left the group", x: 172, y: 798, width: 134, height: 20 },
    { type: "text", lang: "ko", text: "미국 라이브 텔레비전 데뷔", x: 172, y: 818, width: 150, height: 17 },
    { type: "text", lang: "en", variant: "label-lg", text: "2023", x: 3, y: 842, width: 58, height: 24 },
    { type: "text", lang: "en", text: "Shotaro and Sungchan left, to debut in a new group RIIZE", x: 3, y: 866, width: 322, height: 40 },
    { type: "text", lang: "ko", text: "쇼타로와 성찬은 데뷔를 위해 떠났습니다새로운 그룹 라이즈", x: 3, y: 906, width: 332, height: 34 },
    { type: "text", lang: "en", variant: "label-lg", text: "2024", x: 84, y: 939, width: 58, height: 24 },
    { type: "image", src: `${ASSET}/p07.png`, x: 0, y: 947, width: 65, height: 124 },
    { type: "text", lang: "en", text: "Final Sub-Unit Debut- NCT Wish", x: 84, y: 963, width: 219, height: 20 },
    { type: "text", lang: "ko", text: "코어 서브 유닛의 공식 데뷔", x: 84, y: 983, width: 153, height: 17 },
    { type: "image", src: `${ASSET}/p06.png`, x: 81, y: 1016, width: 242, height: 120 },
    { type: "text", lang: "en", variant: "label-lg", text: "2026", x: 6, y: 1075, width: 58, height: 24 },
    { type: "text", lang: "en", text: "Winwin,Mark and Ten left the Group", x: 6, y: 1099, width: 243, height: 20 },
    { type: "text", lang: "ko", text: "윈윈, 마크, 텐이 그룹을 떠났습니다", x: 6, y: 1119, width: 198, height: 17 },
  ],
};
