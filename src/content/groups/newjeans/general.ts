import { getGroupById } from "@/data/groups";
import type { GroupGeneralContent } from "@/components/GroupPage/shared/types";

const ASSET = "/groups/newjeans/general";

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
 * General panel content for NewJeans. `name` / `debutYear` / `charmAsset` /
 * `koColor` come from groups.json. `nameKo`, `heroPhoto`, and every editorial
 * element below have no field in the dataset and stay authored here from the
 * Figma example — `elements` positions are panel-local design pixels, copied
 * directly from the approved pixel-perfect build.
 *
 * Every fact here has an explicit Figma line break, so `text` is a string
 * array (one array item per line) rather than a naturally-wrapping string.
 */
export const content: GroupGeneralContent = {
  name: group.name,
  debutYear: String(group.debutYear ?? "—"),
  charmAsset,
  koColor,
  charmPartsBase: "/groups/newjeans/charm/parts",
  charmState: "/groups/newjeans/charm/general.png",

  // No dataset field — Figma example placeholder:
  nameKo: "뉴진스",
  heroPhoto: `${ASSET}/photo_hero.png`,

  elements: [
    { type: "image", src: `${ASSET}/photo_top_right.png`, x: 171, y: 216, width: 152, height: 64 },
    {
      type: "text",
      lang: "en",
      text: ["Often incorporates ", "UK Garage and  Jersey Club sounds"],
      x: 171,
      y: 292,
      width: 152,
      height: 60,
    },
    {
      type: "text",
      lang: "ko",
      text: ["종종 영국 차고 및 저지 ", "클럽 사운드를 통합다"],
      x: 169,
      y: 466,
      width: 127.25,
      height: 33.8,
    },
    { type: "image", src: `${ASSET}/photo_left_1.png`, x: 169, y: 376, width: 72, height: 64 },
    { type: "shape", asset: `${ASSET}/shape_orange.svg`, x: 257, y: 376, width: 66, height: 64 },
    {
      type: "text",
      lang: "en",
      text: "Helped revive the Y2K aesthetic",
      x: 176,
      y: 548,
      width: 140,
      height: 40,
    },
    { type: "image", src: `${ASSET}/photo_wide_1.png`, x: 81, y: 616, width: 242, height: 144 },
    { type: "shape", asset: `${ASSET}/shape_pink.svg`, x: -1, y: 696, width: 66, height: 64 },
    {
      type: "text",
      lang: "ko",
      text: ["Y2K 미학을 ", "되살리는 ", "데 도움이 ", "되었다"],
      x: 255,
      y: 694,
      width: 60,
      height: 84.49,
    },
    { type: "shape", asset: `${ASSET}/shape_cyan.svg`, x: 257, y: 776, width: 66, height: 64 },
    {
      type: "text",
      lang: "en",
      text: ["Popularized TikTok ", "friendly dance challenges"],
      x: 25,
      y: 785,
      width: 170.68,
      height: 40,
    },
    { type: "image", src: `${ASSET}/photo_wide_2.png`, x: 0, y: 856, width: 323, height: 144 },
    {
      type: "text",
      lang: "ko",
      text: "대중화된 틱톡 친화적인 댄스 챌린지",
      x: 94,
      y: 951,
      width: 118,
      height: 33.8,
    },
    { type: "shape", asset: `${ASSET}/shape_green.svg`, x: 0.5, y: 1016, width: 152.5, height: 120.5 },
    { type: "image", src: `${ASSET}/photo_bottom.png`, x: 81, y: 1016, width: 160.5, height: 120 },
    { type: "image", src: `${ASSET}/photo_small.png`, x: 257, y: 1096, width: 66, height: 40 },
  ],
};
