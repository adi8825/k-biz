import { getGroupById } from "@/data/groups";
import type { GroupGeneralContent } from "@/components/GroupPage/shared/types";

const ASSET = "/groups/bts/language";

const group = getGroupById("bts");
if (!group) {
  throw new Error('"bts" not found in groups.json');
}
const charmAsset = group.positions[0]?.asset;
if (!charmAsset) {
  throw new Error('"bts" has no charm position/asset in groups.json');
}
const koColor = group.charm?.color;
if (!koColor) {
  throw new Error('"bts" has no charm.color in groups.json');
}

/**
 * Language page for BTS — transcribed from the Figma "Group/Language" frame
 * (1137:254531, 323x1136).
 *
 * Four stat blocks: the discography total, then its Korean / Japanese /
 * English split. Figma sets each figure above its label here rather than
 * beside it, so the number's own y is what positions it.
 */
export const content: GroupGeneralContent = {
  name: group.name,
  debutYear: String(group.debutYear ?? "—"),
  charmAsset,
  koColor,
  charmState: "/groups/bts/charm/language.png",

  nameKo: "방탄소년단",
  heroPhoto: `${ASSET}/photo_hero.png`,
  heading: { en: "Language", ko: "언어" },

  elements: [
    // 387 Songs — Figma "Debute" block at (175, 291)
    {
      type: "text",
      lang: "en",
      variant: "stat-lg",
      text: "387",
      x: 175,
      y: 305,
      width: 67,
      height: 48,
    },
    {
      type: "text",
      lang: "en",
      variant: "label-lg",
      text: "Songs",
      x: 250,
      y: 303,
      width: 66,
      height: 24,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-lg",
      text: "노래들",
      x: 250,
      y: 331,
      width: 63,
      height: 24,
    },

    // 248 Korean — Figma "Debute" block at (180, 620)
    {
      type: "text",
      lang: "en",
      variant: "stat-md",
      text: "248",
      x: 180,
      y: 626,
      width: 57,
      height: 43,
    },
    {
      type: "text",
      lang: "en",
      variant: "label-sm",
      text: "Korean",
      x: 253,
      y: 626,
      width: 60,
      height: 20,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-sm",
      text: "한국인",
      x: 253,
      y: 650,
      width: 52,
      height: 20,
    },

    // 112 Japanese — Figma "Frame 583" at (76, 792), figure above the label
    {
      type: "text",
      lang: "en",
      variant: "stat-md",
      text: "112",
      x: 97,
      y: 792,
      width: 40,
      height: 43,
    },
    {
      type: "text",
      lang: "en",
      variant: "label-sm",
      text: "Japanese",
      x: 76,
      y: 851,
      width: 82,
      height: 20,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-sm",
      text: "일본인",
      x: 91,
      y: 879,
      width: 52,
      height: 20,
    },

    // 27 English — Figma "Debute" block at (176, 948), figure above the label
    {
      type: "text",
      lang: "en",
      variant: "stat-md",
      text: "27",
      x: 189.5,
      y: 956,
      width: 34,
      height: 43,
    },
    {
      type: "text",
      lang: "en",
      variant: "label-sm",
      text: "English",
      x: 176,
      y: 1007,
      width: 61,
      height: 20,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-sm",
      text: "영어",
      x: 189,
      y: 1031,
      width: 35,
      height: 20,
    },

    { type: "image", src: `${ASSET}/photo_band_216.png`, x: 169, y: 216, width: 154, height: 64 },
    { type: "image", src: `${ASSET}/photo_right_upper.png`, x: 169, y: 376, width: 153, height: 224 },
    { type: "image", src: `${ASSET}/photo_left_mid.png`, x: 0, y: 696, width: 153, height: 144 },
    { type: "image", src: `${ASSET}/photo_right_lower.png`, x: 169, y: 696, width: 153, height: 224 },
    { type: "image", src: `${ASSET}/photo_left_band.png`, x: -0.5, y: 936, width: 153.5, height: 64 },
    { type: "image", src: `${ASSET}/photo_bottom_big.png`, x: 81, y: 936.5, width: 243, height: 200 },
    {
      type: "image",
      src: `${ASSET}/photo_bottom_narrow.png`,
      x: 0,
      y: 1016,
      width: 65,
      height: 120,
    },
    { type: "shape", asset: `${ASSET}/shape_purple.png`, x: 257, y: 536, width: 65, height: 64 },
    { type: "shape", asset: `${ASSET}/shape_pink.png`, x: 0, y: 856, width: 65, height: 64 },
    { type: "shape", asset: `${ASSET}/shape_orange.png`, x: 81, y: 1016, width: 72, height: 64 },
  ],
};
