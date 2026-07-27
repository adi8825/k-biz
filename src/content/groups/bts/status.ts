import { getGroupById } from "@/data/groups";
import type { GroupGeneralContent } from "@/components/GroupPage/shared/types";

const ASSET = "/groups/bts/status";

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
 * Status page for BTS — transcribed from the Figma "Group/Status" frame
 * (1137:254588, 323x1136).
 *
 * The activity status sits in the stat slot, the debut date reappears here as
 * body content (not as the header badge), and four dated milestones run down
 * the page, each a year over an EN/KO caption.
 *
 * One element is not a faithful copy: Figma fills the panel's large middle
 * rectangle with a *video*, not an image. There is no video pipeline in the
 * project, so this uses the still frame Figma renders. See the report.
 */
export const content: GroupGeneralContent = {
  name: group.name,
  debutYear: String(group.debutYear ?? "—"),
  charmAsset,
  koColor,
  charmState: "/groups/bts/charm/status.png",

  nameKo: "방탄소년단",
  heroPhoto: `${ASSET}/photo_hero.png`,
  heading: { en: "Status", ko: "활동 상태" },

  elements: [
    // Activity status — Figma "Debute" block at (171, 296)
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

    // Debut date — body scale here, unlike the General page's header badge
    { type: "text", lang: "en", text: "Debut", x: 168, y: 469, width: 42, height: 20 },
    { type: "text", lang: "ko", text: "데뷔", x: 168, y: 489, width: 26, height: 17 },
    {
      type: "text",
      lang: "en",
      text: "June 13, 2013",
      x: 223.5,
      y: 465,
      width: 93,
      height: 20,
    },
    {
      type: "text",
      lang: "ko",
      text: "2013년 6월 13일",
      x: 219.5,
      y: 493,
      width: 101,
      height: 17,
    },

    // 2017 — Figma "Debute" block at (2, 686)
    { type: "text", lang: "en", variant: "label-lg", text: "2017", x: 5, y: 695, width: 51, height: 24 },
    {
      type: "text",
      lang: "en",
      text: "US live television debut",
      x: 5,
      y: 719,
      width: 154,
      height: 20,
    },
    {
      type: "text",
      lang: "ko",
      text: "미국 라이브 텔레비전 데뷔",
      x: 5,
      y: 739,
      width: 150,
      height: 17,
    },

    // 2020 — Figma "Debute" block at (75, 846)
    { type: "text", lang: "en", variant: "label-lg", text: "2020", x: 78, y: 855, width: 60, height: 24 },
    {
      type: "text",
      lang: "en",
      text: "Nominated for a Grammy",
      x: 78,
      y: 879,
      width: 172,
      height: 20,
    },
    {
      type: "text",
      lang: "ko",
      text: "그래미상 후보에 올랐다",
      x: 78,
      y: 899,
      width: 134,
      height: 17,
    },

    // 2022 — Figma "Debute" block at (0, 930)
    { type: "text", lang: "en", variant: "label-lg", text: "2022", x: 3, y: 939, width: 57, height: 24 },
    {
      type: "text",
      lang: "en",
      text: "Visited the White House",
      x: 3,
      y: 963,
      width: 161,
      height: 20,
    },
    { type: "text", lang: "ko", text: "백악관 방문", x: 3, y: 983, width: 67, height: 17 },

    // 2025 — Figma "Debute" block at (100, 1009)
    {
      type: "text",
      lang: "en",
      variant: "label-lg",
      text: "2025",
      x: 103,
      y: 1018,
      width: 58,
      height: 24,
    },
    {
      type: "text",
      lang: "en",
      text: "Military Service Completion",
      x: 103,
      y: 1042,
      width: 184,
      height: 20,
    },
    { type: "text", lang: "ko", text: "병역 완료", x: 103, y: 1062, width: 55, height: 17 },

    { type: "image", src: `${ASSET}/photo_band_216.png`, x: 169, y: 216, width: 154, height: 64 },
    { type: "image", src: `${ASSET}/photo_band_upper.png`, x: 169, y: 376, width: 154, height: 64 },
    // Video fill in Figma — still frame only.
    { type: "image", src: `${ASSET}/video_still.png`, x: 169, y: 536, width: 154, height: 224 },
    {
      type: "image",
      src: `${ASSET}/photo_right_mid.png`,
      x: 169,
      y: 696,
      width: 154,
      height: 142.5,
    },
    { type: "image", src: `${ASSET}/photo_left_mid.png`, x: 0, y: 776, width: 153, height: 144 },
    {
      type: "image",
      src: `${ASSET}/photo_band_lower.png`,
      x: 169,
      y: 937,
      width: 153.5,
      height: 64,
    },
    {
      type: "image",
      src: `${ASSET}/photo_bottom_narrow.png`,
      x: 0,
      y: 1016,
      width: 65,
      height: 120,
    },
    { type: "shape", asset: `${ASSET}/shape_green.png`, x: 257, y: 856, width: 66, height: 64 },
    { type: "shape", asset: `${ASSET}/shape_teal.png`, x: 81, y: 1096, width: 242, height: 40 },
  ],
};
