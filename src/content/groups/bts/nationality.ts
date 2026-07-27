import { getGroupById } from "@/data/groups";
import type { GroupGeneralContent } from "@/components/GroupPage/shared/types";

const ASSET = "/groups/bts/nationality";

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
 * Nationality page for BTS — transcribed from the Figma
 * "Group/Nationality" frame (1137:254486, 323x1136).
 *
 * `heading` switches the shared panel to its category header, so the slot
 * that holds "Debut / 데뷔 / 2013" on the General page holds "Nationality /
 * 국적" here. Everything below is the same flat editorial array the General
 * page uses; the stat figures are the only reason the text variants exist.
 */
export const content: GroupGeneralContent = {
  name: group.name,
  debutYear: String(group.debutYear ?? "—"),
  charmAsset,
  koColor,
  charmState: "/groups/bts/charm/nationality.png",

  nameKo: "방탄소년단",
  heroPhoto: `${ASSET}/photo_hero.png`,
  heading: { en: "Nationality", ko: "국적" },

  elements: [
    // 7 Members — Figma "Debute" block at (176, 288)
    { type: "text", lang: "en", variant: "stat-lg", text: "7", x: 176, y: 302, width: 21, height: 48 },
    {
      type: "text",
      lang: "en",
      variant: "label-lg",
      text: "Members",
      x: 213,
      y: 300,
      width: 99,
      height: 24,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-lg",
      text: "명의 멤버",
      x: 213,
      y: 328,
      width: 89,
      height: 24,
    },

    // 7 Korean — Figma "Debute" block at (119, 780)
    { type: "text", lang: "en", variant: "stat-md", text: "7", x: 119, y: 786, width: 17, height: 43 },
    {
      type: "text",
      lang: "en",
      variant: "label-sm",
      text: "Korean",
      x: 144,
      y: 786,
      width: 60,
      height: 20,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-sm",
      text: "한국인",
      x: 144,
      y: 810,
      width: 55,
      height: 20,
    },

    // Member list — Figma hand-breaks both languages, so each is an array.
    {
      type: "text",
      lang: "en",
      text: ["Jin, Suga, J-Hope, RM,", "Jimin, V and Jungkook"],
      x: 0,
      y: 866,
      width: 160,
      height: 40,
    },
    {
      type: "text",
      lang: "ko",
      text: ["진, 슈가, 제이홉, 알엠,", "지민, 뷔, 정국"],
      x: 186,
      y: 869,
      width: 126,
      height: 34,
    },

    { type: "image", src: `${ASSET}/photo_band_216.png`, x: 169, y: 216, width: 154, height: 64 },
    { type: "image", src: `${ASSET}/photo_right_mid.png`, x: 169, y: 376, width: 154, height: 144 },
    { type: "image", src: `${ASSET}/photo_right_upper.png`, x: 169, y: 456, width: 154, height: 144 },
    {
      type: "image",
      src: `${ASSET}/photo_right_tall.png`,
      x: 169,
      y: 616.5,
      width: 154,
      height: 223.5,
    },
    { type: "image", src: `${ASSET}/photo_left_mid.png`, x: 0, y: 697, width: 154, height: 144 },
    { type: "image", src: `${ASSET}/photo_wide.png`, x: 0, y: 936.5, width: 241, height: 64 },
    {
      type: "image",
      src: `${ASSET}/photo_bottom_left.png`,
      x: 0,
      y: 1016,
      width: 153,
      height: 120.5,
    },
    {
      type: "image",
      src: `${ASSET}/photo_bottom_right.png`,
      x: 169,
      y: 1016,
      width: 154,
      height: 120,
    },
    { type: "shape", asset: `${ASSET}/shape_blue.png`, x: 257, y: 936, width: 66, height: 64 },
    { type: "shape", asset: `${ASSET}/shape_green.png`, x: 81, y: 1095.5, width: 70.5, height: 39 },
  ],
};
