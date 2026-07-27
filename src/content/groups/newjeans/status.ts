import { getGroupById } from "@/data/groups";
import type { GroupGeneralContent } from "@/components/GroupPage/shared/types";

const ASSET = "/groups/newjeans/status";

const group = getGroupById("newjeans");
if (!group) {
  throw new Error('"newjeans" not found in groups.json');
}
const charmAsset = group.positions[0]?.asset;
if (!charmAsset) {
  throw new Error('"newjeans" has no charm position/asset in groups.json');
}
const koColor = group.charm?.color;
if (!koColor) {
  throw new Error('"newjeans" has no charm.color in groups.json');
}

/**
 * Status page for NewJeans — transcribed from the Figma
 * "Group/Status/NewJeans" frame (1054:289349).
 *
 * Three milestones rather than BTS's four, each a year over an EN/KO caption,
 * and the debut date reappears here as body content rather than as the header
 * badge — the same arrangement BTS uses.
 */
export const content: GroupGeneralContent = {
  name: group.name,
  debutYear: String(group.debutYear ?? "—"),
  charmAsset,
  koColor,
  charmPartsBase: "/groups/newjeans/charm/parts",
  charmState: "/groups/newjeans/charm/status.png",

  nameKo: "뉴진스",
  heroPhoto: `${ASSET}/photo_hero.png`,
  heading: { en: "Status", ko: "활동 상태" },

  elements: [
    // Activity status — Figma "Debute" at (171, 296)
    {
      type: "text",
      lang: "en",
      variant: "label-lg",
      text: "Active",
      x: 171,
      y: 302,
      width: 64,
      height: 24,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-lg",
      text: "활동적인",
      x: 171,
      y: 330,
      width: 83,
      height: 24,
    },

    // Debut date — body scale, as on the BTS Status page
    { type: "text", lang: "en", text: "Debut", x: 168, y: 469, width: 42, height: 20 },
    { type: "text", lang: "ko", text: "데뷔", x: 168, y: 489, width: 26, height: 17 },
    { type: "text", lang: "en", text: "July 22, 2022", x: 223, y: 465, width: 94, height: 20 },
    { type: "text", lang: "ko", text: "2022년 7월 22일", x: 218, y: 493, width: 104, height: 17 },

    // 2023
    { type: "text", lang: "en", variant: "label-lg", text: "2023", x: 83, y: 696, width: 58, height: 24 },
    {
      type: "text",
      lang: "en",
      text: "Global Chart Takeover",
      x: 83,
      y: 720,
      width: 150,
      height: 20,
    },
    { type: "text", lang: "ko", text: "글로벌 차트 인수", x: 83, y: 740, width: 96, height: 17 },

    // 2024
    {
      type: "text",
      lang: "en",
      variant: "label-lg",
      text: "2024",
      x: 181,
      y: 857,
      width: 58,
      height: 24,
    },
    { type: "text", lang: "en", text: "Japanese Debut", x: 181, y: 881, width: 110, height: 20 },
    { type: "text", lang: "ko", text: "일본 데뷔", x: 181, y: 901, width: 55, height: 17 },

    // 2025
    { type: "text", lang: "en", variant: "label-lg", text: "2025", x: 3, y: 936, width: 58, height: 24 },
    {
      type: "text",
      lang: "en",
      text: "Danielle Left The Group",
      x: 3,
      y: 960,
      width: 159,
      height: 20,
    },
    { type: "text", lang: "ko", text: "다니엘 레프트 더 그룹", x: 3, y: 980, width: 125, height: 17 },

    { type: "image", src: `${ASSET}/photo_band_216.png`, x: 169, y: 216, width: 154, height: 64 },
    { type: "image", src: `${ASSET}/photo_band_376.png`, x: 169, y: 376, width: 154, height: 64 },
    { type: "image", src: `${ASSET}/photo_right_536.png`, x: 169, y: 536, width: 154, height: 224 },
    { type: "image", src: `${ASSET}/photo_wide_696.png`, x: 0, y: 696, width: 241, height: 224 },
    { type: "image", src: `${ASSET}/photo_bottom_big.png`, x: 81, y: 936, width: 242, height: 200 },
    {
      type: "image",
      src: `${ASSET}/photo_left_1010.png`,
      x: 0,
      y: 1010,
      width: 153.5,
      height: 127,
    },
    { type: "shape", asset: `${ASSET}/shape_purple.png`, x: 257, y: 783, width: 66, height: 64 },
    { type: "shape", asset: `${ASSET}/shape_teal.png`, x: 257, y: 936, width: 66, height: 144 },
  ],
};
