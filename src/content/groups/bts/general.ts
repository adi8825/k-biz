import { getGroupById } from "@/data/groups";
import type { GroupGeneralContent } from "@/components/GroupPage/shared/types";

const ASSET = "/groups/bts/general";

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
 * General panel content for BTS — the second validation case for the
 * free-layout editorial architecture. `name` / `debutYear` / `charmAsset` /
 * `koColor` come from groups.json. `nameKo`, `heroPhoto`, and every editorial
 * element below are authored from the Figma "Group_Panel/BTS" frame.
 *
 * Unlike NewJeans, none of these facts have a manual line break in Figma —
 * each `text` is a single string, wrapped naturally by `width`.
 */
export const content: GroupGeneralContent = {
  name: group.name,
  debutYear: String(group.debutYear ?? "—"),
  charmAsset,
  koColor,
  charmPartsBase: "/groups/bts/charm/parts",
  charmState: "/groups/bts/charm/general.png",

  // No dataset field — Figma example content:
  nameKo: "방탄소년단",
  heroPhoto: `${ASSET}/photo_hero.png`,

  elements: [
    {
      type: "text",
      lang: "en",
      text: "Their Dedicated Global Fanbase Is Officially Named ARMY",
      x: 95,
      y: 869,
      width: 218,
      height: 40,
    },
    {
      type: "text",
      lang: "en",
      text: "Dynamite Earned Their Historic First Grammy Award Nomination",
      x: 6,
      y: 1017,
      width: 155,
      height: 60,
    },
    {
      type: "text",
      lang: "en",
      text: 'The translation of their name is "Bulletproof Boy Scouts"',
      x: 169,
      y: 298,
      width: 155,
      height: 60,
    },
    {
      type: "text",
      lang: "en",
      text: "BTS Became First Korean Act to Top Billboard 200",
      x: 176,
      y: 617,
      width: 137,
      height: 60,
    },
    { type: "image", src: `${ASSET}/photo_top_right.png`, x: 171, y: 216, width: 152, height: 64 },
    {
      type: "text",
      lang: "ko",
      text: "그들의 헌신적인 글로벌 팬층이 공식적으로 아미로 명명되었다",
      x: 94,
      y: 951,
      width: 188,
      height: 34,
    },
    {
      type: "text",
      lang: "ko",
      text: "다이너마이트, 역사적인 첫 그래미상 후보에 올랐다",
      x: 16,
      y: 1109,
      width: 287,
      height: 17,
    },
    {
      type: "text",
      lang: "ko",
      text: '그들의 이름 번역본은 "방탄소년단"입니다',
      x: 168,
      y: 388,
      width: 140,
      height: 34,
    },
    {
      type: "text",
      lang: "ko",
      text: "방탄소년단, 한국 최초로 빌보드 200 1위 달성",
      x: 174,
      y: 710,
      width: 140,
      height: 34,
    },
    { type: "image", src: `${ASSET}/photo_upper.png`, x: 169, y: 456, width: 154, height: 144 },
    { type: "shape", asset: `${ASSET}/shape_pink.svg`, x: 169, y: 536, width: 72, height: 64 },
    { type: "image", src: `${ASSET}/photo_wide.png`, x: 0, y: 696, width: 241, height: 144 },
    { type: "image", src: `${ASSET}/photo_tall.png`, x: 0, y: 856, width: 65, height: 144 },
    { type: "image", src: `${ASSET}/photo_bottom.png`, x: 169, y: 1016, width: 154, height: 64 },
    { type: "shape", asset: `${ASSET}/shape_orange.svg`, x: 257, y: 776, width: 66, height: 64 },
  ],
};
