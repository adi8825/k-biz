import { getGroupById } from "@/data/groups";
import type { GroupGeneralContent } from "@/components/GroupPage/shared/types";

const ASSET = "/groups/newjeans/nationality";

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
 * Nationality page for NewJeans — transcribed from the Figma
 * "Group/Nationality/NewJeans" frame (1054:289247).
 *
 * The frame is a 327x1152 wrapper around the same 323x1136 panel box BTS
 * uses, so every coordinate below is panel-local and directly comparable.
 * Three nationality figures rather than BTS's one, and Figma places each of
 * the two split-nationality figures to the left of its label rather than
 * above it — kept exactly as authored.
 */
export const content: GroupGeneralContent = {
  name: group.name,
  debutYear: String(group.debutYear ?? "—"),
  charmAsset,
  koColor,
  charmPartsBase: "/groups/newjeans/charm/parts",
  charmState: "/groups/newjeans/charm/nationality.png",

  nameKo: "뉴진스",
  heroPhoto: `${ASSET}/photo_hero.png`,
  heading: { en: "Nationality", ko: "국적" },

  elements: [
    // 5 Members — Figma "Debute" at (176, 288)
    { type: "text", lang: "en", variant: "stat-lg", text: "5", x: 176, y: 302, width: 24, height: 48 },
    {
      type: "text",
      lang: "en",
      variant: "label-lg",
      text: "Members",
      x: 216,
      y: 300,
      width: 99,
      height: 24,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-lg",
      text: "명의 멤버",
      x: 216,
      y: 328,
      width: 89,
      height: 24,
    },

    // 3 Korean — figure above the label here, unlike the two below it
    { type: "text", lang: "en", variant: "stat-md", text: "3", x: 193.5, y: 405, width: 19, height: 43 },
    {
      type: "text",
      lang: "en",
      variant: "label-sm",
      text: "Korean",
      x: 173,
      y: 448,
      width: 60,
      height: 20,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-sm",
      text: "한국인",
      x: 173,
      y: 472,
      width: 55,
      height: 20,
    },

    // 1 Vietnamese-Australian — figure to the left of the label
    { type: "text", lang: "en", variant: "stat-md", text: "1", x: 14, y: 705, width: 11, height: 43 },
    {
      type: "text",
      lang: "en",
      variant: "label-sm",
      text: "Vietnamese-Australian",
      x: 41,
      y: 703,
      width: 187,
      height: 20,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-sm",
      text: "베트남계 호주인",
      x: 41,
      y: 730,
      width: 132,
      height: 20,
    },

    // 1 Korean-Australian
    { type: "text", lang: "en", variant: "stat-md", text: "1", x: 78, y: 864, width: 11, height: 43 },
    {
      type: "text",
      lang: "en",
      variant: "label-sm",
      text: "Korean-Australian",
      x: 97,
      y: 863.5,
      width: 149,
      height: 20,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-sm",
      text: "한국계 호주인",
      x: 97,
      y: 887.5,
      width: 114,
      height: 20,
    },

    // Member list and the lineup note
    {
      type: "text",
      lang: "en",
      text: "Minji, Hanni, Danielle, Haerin, Hyein",
      x: 21,
      y: 1025,
      width: 238,
      height: 20,
    },
    {
      type: "text",
      lang: "ko",
      text: "민지, 하니, 다니엘, 해린, 혜인",
      x: 21,
      y: 1052,
      width: 167,
      height: 17,
    },
    {
      type: "text",
      lang: "en",
      text: "This is the most iconic member lineup",
      x: 21,
      y: 1094,
      width: 253,
      height: 20,
    },
    {
      type: "text",
      lang: "ko",
      text: "이것은 가장 상징적인 멤버 라인업다",
      x: 21,
      y: 1118,
      width: 204,
      height: 17,
    },

    { type: "image", src: `${ASSET}/photo_band_216.png`, x: 169, y: 216, width: 154, height: 64 },
    { type: "image", src: `${ASSET}/photo_right_narrow.png`, x: 257, y: 376, width: 66, height: 144 },
    { type: "image", src: `${ASSET}/photo_right_mid.png`, x: 169, y: 536, width: 154, height: 144 },
    { type: "image", src: `${ASSET}/photo_right_lower.png`, x: 257, y: 696, width: 66, height: 144 },
    { type: "image", src: `${ASSET}/photo_wide.png`, x: 0, y: 776, width: 241, height: 144 },
    { type: "image", src: `${ASSET}/photo_band_936.png`, x: 81, y: 936, width: 242, height: 64 },
    { type: "shape", asset: `${ASSET}/shape_pink.png`, x: 257, y: 616, width: 66, height: 64 },
    { type: "shape", asset: `${ASSET}/shape_lilac.png`, x: 257, y: 856, width: 66, height: 64 },
    { type: "shape", asset: `${ASSET}/shape_teal.png`, x: 0, y: 936, width: 65, height: 64 },
  ],
};
