import { getGroupById } from "@/data/groups";
import type { GroupGeneralContent } from "@/components/GroupPage/shared/types";

const ASSET = "/groups/newjeans/formation";

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
 * Formation page for NewJeans — transcribed from the Figma
 * "Group/Formation/NewJeans" frame (1054:289348).
 *
 * ADOR rather than BIGHIT, with a sub-label note Figma sets as a narrow
 * four-line Korean column at (264, 534) beside the English sentence. Both are
 * placed exactly where the frame puts them.
 */
export const content: GroupGeneralContent = {
  name: group.name,
  debutYear: String(group.debutYear ?? "—"),
  charmAsset,
  koColor,
  charmPartsBase: "/groups/newjeans/charm/parts",
  charmState: "/groups/newjeans/charm/formation.png",

  nameKo: "뉴진스",
  heroPhoto: `${ASSET}/photo_hero.png`,
  heading: { en: "Formation", ko: "형성" },

  elements: [
    // Formation type — Figma "Debute" at (173, 294)
    {
      type: "text",
      lang: "en",
      variant: "label-lg",
      text: "Company",
      x: 173,
      y: 300,
      width: 103,
      height: 24,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-lg",
      text: "회사",
      x: 173,
      y: 328,
      width: 42,
      height: 24,
    },

    // Main company — ADOR
    {
      type: "text",
      lang: "en",
      variant: "label-sm",
      text: "Main Company",
      x: 172,
      y: 467,
      width: 130,
      height: 20,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-sm",
      text: "주요 회사",
      x: 172,
      y: 491,
      width: 75,
      height: 20,
    },
    {
      type: "text",
      lang: "en",
      variant: "label-lg",
      text: "ADOR",
      x: 172,
      y: 541,
      width: 67,
      height: 24,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-lg",
      text: "아도",
      x: 184.5,
      y: 565,
      width: 42,
      height: 24,
    },

    // Sub-label note — Figma hand-breaks the Korean into four lines
    {
      type: "text",
      lang: "en",
      text: "operates as a sub-label under HYBE",
      x: 170,
      y: 626,
      width: 154,
      height: 40,
    },
    {
      type: "text",
      lang: "ko",
      text: ["HYBE에", "따라 하위", "레이블로", "운영됩다"],
      x: 264,
      y: 534,
      width: 59,
      height: 68,
    },

    // Geffen Records
    { type: "text", lang: "en", text: "Global", x: 8, y: 865.5, width: 45, height: 20 },
    { type: "text", lang: "ko", text: "세계적인", x: 8, y: 889.5, width: 51, height: 17 },
    {
      type: "text",
      lang: "en",
      variant: "label-sm",
      text: "Geffen Records",
      x: 89,
      y: 864,
      width: 132,
      height: 20,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-sm",
      text: "게펜 레코드",
      x: 89,
      y: 888,
      width: 92,
      height: 20,
    },

    // HYBE JAPAN
    { type: "text", lang: "en", text: "Japan", x: 104, y: 947.5, width: 42, height: 20 },
    { type: "text", lang: "ko", text: "일본", x: 104, y: 971.5, width: 26, height: 17 },
    {
      type: "text",
      lang: "en",
      variant: "label-sm",
      text: "HYBE JAPAN",
      x: 176,
      y: 946,
      width: 114,
      height: 20,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-sm",
      text: "하이브 재팬",
      x: 176,
      y: 970,
      width: 92,
      height: 20,
    },

    { type: "image", src: `${ASSET}/photo_band_216.png`, x: 169, y: 216, width: 154, height: 64 },
    { type: "image", src: `${ASSET}/photo_band_376.png`, x: 169, y: 376, width: 154, height: 64 },
    { type: "image", src: `${ASSET}/photo_full_wide.png`, x: 0, y: 696, width: 324, height: 224 },
    { type: "image", src: `${ASSET}/photo_right_696.png`, x: 257, y: 696, width: 66, height: 64 },
    { type: "image", src: `${ASSET}/photo_left_936.png`, x: 0, y: 936, width: 153, height: 200 },
    { type: "image", src: `${ASSET}/photo_bottom_wide.png`, x: 81, y: 1016, width: 242, height: 120 },
    { type: "shape", asset: `${ASSET}/shape_purple.png`, x: 169, y: 696, width: 72, height: 64 },
  ],
};
