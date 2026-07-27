import { getGroupById } from "@/data/groups";
import type { GroupGeneralContent } from "@/components/GroupPage/shared/types";

const ASSET = "/groups/newjeans/language";

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
 * Language page for NewJeans — transcribed from the Figma
 * "Group/Language/NewJeans" frame (1054:289282).
 *
 * A far smaller discography than BTS, split Korean / Japanese / English.
 * Figma puts the Korean and English figures beside their labels and the
 * Japanese figure to the left of its own — the asymmetry is authored, so it
 * is reproduced rather than regularised.
 */
export const content: GroupGeneralContent = {
  name: group.name,
  debutYear: String(group.debutYear ?? "—"),
  charmAsset,
  koColor,
  charmPartsBase: "/groups/newjeans/charm/parts",
  charmState: "/groups/newjeans/charm/language.png",

  nameKo: "뉴진스",
  heroPhoto: `${ASSET}/photo_hero.png`,
  heading: { en: "Language", ko: "언어" },

  elements: [
    // 52 Songs — Figma "Debute" at (185, 289)
    {
      type: "text",
      lang: "en",
      variant: "stat-lg",
      text: "52",
      x: 185,
      y: 303,
      width: 46,
      height: 48,
    },
    {
      type: "text",
      lang: "en",
      variant: "label-lg",
      text: "Songs",
      x: 239,
      y: 301,
      width: 66,
      height: 24,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-lg",
      text: "노래들",
      x: 239,
      y: 329,
      width: 63,
      height: 24,
    },

    // 36 Korean — figure above its label
    {
      type: "text",
      lang: "en",
      variant: "stat-md",
      text: "36",
      x: 271,
      y: 475,
      width: 38,
      height: 43,
    },
    {
      type: "text",
      lang: "en",
      variant: "label-sm",
      text: "Korean",
      x: 260,
      y: 518,
      width: 60,
      height: 20,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-sm",
      text: "한국인",
      x: 260,
      y: 542,
      width: 52,
      height: 20,
    },

    // 6 Japanese — figure to the left of its label
    { type: "text", lang: "en", variant: "stat-md", text: "6", x: 12, y: 705, width: 20, height: 43 },
    {
      type: "text",
      lang: "en",
      variant: "label-sm",
      text: "Japanese",
      x: 48,
      y: 703,
      width: 82,
      height: 20,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-sm",
      text: "일본인",
      x: 48,
      y: 730,
      width: 52,
      height: 20,
    },

    // 10 English — figure to the left of its label
    {
      type: "text",
      lang: "en",
      variant: "stat-md",
      text: "10",
      x: 202,
      y: 1024,
      width: 33,
      height: 43,
    },
    {
      type: "text",
      lang: "en",
      variant: "label-sm",
      text: "English",
      x: 243,
      y: 1023.5,
      width: 61,
      height: 20,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-sm",
      text: "영어",
      x: 243,
      y: 1047.5,
      width: 35,
      height: 20,
    },

    { type: "image", src: `${ASSET}/photo_band_216.png`, x: 169, y: 216, width: 154, height: 64 },
    { type: "image", src: `${ASSET}/photo_right_tall.png`, x: 169, y: 376, width: 154, height: 304 },
    { type: "image", src: `${ASSET}/photo_right_696.png`, x: 169, y: 696, width: 154, height: 144 },
    { type: "image", src: `${ASSET}/photo_left_tall.png`, x: 0, y: 776, width: 153, height: 359 },
    { type: "image", src: `${ASSET}/photo_right_776.png`, x: 169, y: 776, width: 154, height: 224 },
    { type: "image", src: `${ASSET}/photo_bottom_band.png`, x: 169, y: 1096, width: 154, height: 40 },
    { type: "shape", asset: `${ASSET}/shape_orange.png`, x: 257, y: 616, width: 66, height: 65 },
    { type: "shape", asset: `${ASSET}/shape_green.png`, x: 169, y: 935, width: 74, height: 65 },
    { type: "shape", asset: `${ASSET}/shape_purple.png`, x: 81, y: 1096, width: 72, height: 40 },
  ],
};
