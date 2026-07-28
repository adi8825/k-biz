import { getGroupById } from "@/data/groups";
import type { GroupGeneralContent } from "@/components/GroupPage/shared/types";

/* A few `label-sm` English boxes carry a width a little larger than the one
 * Figma reports. Figma authors them as a single 20px line, but the browser
 * sets Satoshi 20px marginally wider than Figma measures it, so at Figma's own
 * width the label wrapped to a second line, doubled to 40px tall and ran into
 * its Korean twin 24px below. Each is Figma's width rounded up to the natural
 * single-line width plus 2px of slack. The text is left-aligned, so the extra
 * width is empty space to the right and no glyph moves. */

const ASSET = "/groups/bts/formation";

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
 * Formation page for BTS — transcribed from the Figma "Group/Formation"
 * frame (1137:254661, 323x1136).
 *
 * The formation type sits in the stat slot; below it are the label/name pairs
 * for the company and its two international arms, each a small EN/KO label
 * over a larger EN/KO name.
 */
export const content: GroupGeneralContent = {
  name: group.name,
  debutYear: String(group.debutYear ?? "—"),
  charmAsset,
  koColor,
  charmState: "/groups/bts/charm/formation.png",

  nameKo: "방탄소년단",
  heroPhoto: `${ASSET}/photo_hero.png`,
  heading: { en: "Formation", ko: "형성" },

  elements: [
    // Formation type — Figma "Debute" block at (173, 294). No figure here.
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

    // Geffen Records — Figma "Frame 579" at (179, 487)
    { type: "text", lang: "en", text: "Global", x: 179, y: 487, width: 45, height: 20 },
    { type: "text", lang: "ko", text: "세계적인", x: 179, y: 511, width: 51, height: 17 },
    {
      type: "text",
      lang: "en",
      variant: "label-sm",
      text: "Geffen Records",
      x: 179,
      y: 536,
      width: 138,
      height: 20,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-sm",
      text: "게펜 레코드",
      x: 179,
      y: 560,
      width: 92,
      height: 20,
    },

    // HYBE JAPAN — Figma "Frame 580" at (81, 704)
    { type: "text", lang: "en", text: "Japan", x: 81, y: 705.5, width: 42, height: 20 },
    { type: "text", lang: "ko", text: "일본", x: 81, y: 729.5, width: 26, height: 17 },
    {
      type: "text",
      lang: "en",
      variant: "label-sm",
      text: "HYBE JAPAN",
      x: 131,
      y: 704,
      width: 119,
      height: 20,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-sm",
      text: "하이브 재팬",
      x: 131,
      y: 728,
      width: 92,
      height: 20,
    },

    // Main company — Figma "Frame 578" at (4, 870)
    {
      type: "text",
      lang: "en",
      variant: "label-sm",
      text: "Main Company",
      x: 4,
      y: 870,
      width: 136,
      height: 20,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-sm",
      text: "주요 회사",
      x: 4,
      y: 894,
      width: 75,
      height: 20,
    },
    {
      type: "text",
      lang: "en",
      variant: "label-lg",
      text: "BIGHIT Music",
      x: 4,
      y: 938,
      width: 143,
      height: 24,
    },
    {
      type: "text",
      lang: "ko",
      variant: "label-lg",
      text: "주식회사 빅히트뮤직",
      x: 4,
      y: 970,
      width: 193,
      height: 24,
    },

    // Rebrand note — the only body-scale pair on this page
    {
      type: "text",
      lang: "en",
      text: "re-branded as Hybe Corporation",
      x: 8,
      y: 1028,
      width: 154,
      height: 40,
    },
    {
      type: "text",
      lang: "ko",
      text: ["하이브 코퍼레이션으로", "브랜드 변경"],
      x: 180,
      y: 1031,
      width: 134,
      height: 34,
    },

    { type: "image", src: `${ASSET}/photo_band_216.png`, x: 169, y: 216, width: 154, height: 64 },
    { type: "image", src: `${ASSET}/photo_right_upper.png`, x: 170, y: 376, width: 153, height: 144 },
    {
      type: "image",
      src: `${ASSET}/photo_right_tall.png`,
      x: 169.5,
      y: 616,
      width: 153.5,
      height: 223.5,
    },
    { type: "image", src: `${ASSET}/photo_wide_mid.png`, x: 0, y: 696, width: 241, height: 224 },
    {
      type: "image",
      src: `${ASSET}/photo_right_narrow.png`,
      x: 257,
      y: 856,
      width: 66,
      height: 142.5,
    },
    { type: "image", src: `${ASSET}/photo_bottom_band.png`, x: 0, y: 1096, width: 241, height: 40 },
    { type: "shape", asset: `${ASSET}/shape_pink.png`, x: 257, y: 1096, width: 66, height: 40 },
  ],
};
