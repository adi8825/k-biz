import { getGroupById } from "@/data/groups";
import type { GroupGeneralContent } from "@/components/GroupPage/shared/types";

const ASSET = "/groups/nct/nationality";

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
 * Nationality page for NCT — transcribed from the Figma
 * "Group/Nationality/NCT" frame (1180:112984).
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
  heading: { en: "Nationality", ko: "국적" },

  elements: [
    { type: "image", src: `${ASSET}/p02.png`, x: 169, y: 216, width: 154, height: 64 },
    { type: "text", lang: "en", variant: "stat-md", text: "Members", x: 224, y: 301, width: 99, height: 24 },
    { type: "text", lang: "en", variant: "stat-lg", text: "24", x: 169, y: 303, width: 47, height: 48 },
    { type: "text", lang: "ko", variant: "stat-md", text: "명의 멤버", x: 224, y: 329, width: 89, height: 24 },
    { type: "image", src: `${ASSET}/p05.png`, x: 169, y: 376, width: 72, height: 144 },
    { type: "text", lang: "en", variant: "stat-md", text: "12", x: 275.5, y: 407, width: 29, height: 43 },
    { type: "text", lang: "en", variant: "stat-md", text: "Korean", x: 260, y: 450, width: 60, height: 20 },
    { type: "text", lang: "ko", variant: "label-sm", text: "한국인", x: 260, y: 474, width: 55, height: 20 },
    { type: "image", src: `${ASSET}/p04.png`, x: 257, y: 537, width: 65, height: 64 },
    { type: "text", lang: "en", variant: "stat-md", text: "5", x: 197, y: 567, width: 19, height: 43 },
    { type: "text", lang: "en", variant: "stat-md", text: "Chinese", x: 172, y: 610, width: 69, height: 20 },
    { type: "image", src: `${ASSET}/p07.png`, x: 256, y: 616, width: 67, height: 224 },
    { type: "text", lang: "ko", variant: "label-sm", text: "중국인", x: 179, y: 634, width: 55, height: 20 },
    { type: "text", lang: "en", text: "Johnny, Taeyong, Yuta, Kun, Doyoung, Ten, Jaehyun, Jungwoo, Mark, Xiaojun, Hendery, Renjun, Jeno, Haechan, Jaemin, Yangyang, Chenle, Jisung, Sion, Riku, Yushi, Jaehee, Ryo and Sakuya.", x: 3, y: 710, width: 253, height: 120 },
    { type: "image", src: `${ASSET}/p03.png`, x: 0, y: 856, width: 65, height: 64 },
    { type: "text", lang: "ko", text: "조니, 태용, 유타, 쿤, 도영, 텐, 재현, 정우, 마크, 샤오준, 헨데리, 렌준, 제노, 박찬, 태민, 양양, 첼, 지성, 시온, 리쿠, 유시, 재희, 료, 사쿠야.", x: 82, y: 856, width: 217, height: 68 },
    { type: "text", lang: "en", variant: "stat-md", text: "1", x: 10, y: 945, width: 11, height: 43 },
    { type: "text", lang: "en", variant: "stat-md", text: "Taiwanese", x: 29, y: 945, width: 87, height: 20 },
    { type: "text", lang: "en", variant: "stat-md", text: "5", x: 199, y: 945, width: 19, height: 43 },
    { type: "text", lang: "en", variant: "stat-md", text: "Japanese", x: 226, y: 945, width: 82, height: 20 },
    { type: "text", lang: "ko", variant: "stat-md", text: "대만인", x: 29, y: 969, width: 55, height: 20 },
    { type: "text", lang: "ko", variant: "stat-md", text: "일본인", x: 226, y: 969, width: 55, height: 20 },
    { type: "image", src: `${ASSET}/p06.png`, x: 81, y: 1016, width: 72, height: 120 },
    { type: "text", lang: "en", variant: "stat-md", text: "1", x: 24, y: 1030, width: 11, height: 43 },
    { type: "text", lang: "en", text: "This is the most iconic member lineup", x: 175, y: 1030, width: 151, height: 40 },
    { type: "text", lang: "en", variant: "label-sm", text: "Thai", x: 11.5, y: 1081, width: 36, height: 20 },
    { type: "text", lang: "ko", variant: "label-sm", text: "태국인", x: 2, y: 1105, width: 55, height: 20 },
    { type: "text", lang: "ko", text: "이것은 가장 상징적인 멤버 라인업다", x: 327, y: 1235, width: 136, height: 34 },
  ],
};
