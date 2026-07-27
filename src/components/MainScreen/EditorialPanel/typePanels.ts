import type { PanelImage, PanelText } from "./genPanels";

/**
 * Information_Panels_Type — the four per-type panels shown while a Type row
 * label is hovered, in Type sort mode only.
 *
 * Transcribed from Figma frames CO-ED_Panel (1173:112497), BoyGroup_Panel
 * (1173:112608), Band_Panel (1173:112674) and GirlsGroup_Panel (1173:112744).
 * Every panel is 323x1136, the same box the standing EditorialPanel and the
 * generation panels occupy, so swapping between them cannot shift any layout.
 *
 * The shape is deliberately identical to `genPanels.ts` — flat `texts` and
 * `images` lists — so `GenPanel` renders these unchanged. Only the heading
 * differs, which is why `TypePanelData` carries a `heading` instead of the
 * generation numeral fields.
 *
 * Image filenames come from `public/mainscreen/typepanels/manifest.json`,
 * which maps each Figma vector node to its exported plate. Order is not
 * inferred from the filenames.
 */

export type TypeId = "coEd" | "boyGroup" | "band" | "girlGroup";

export type TypePanelData = {
  id: TypeId;
  /** The `type` value in groups.json that this panel describes. */
  typeValue: string;
  /** Figma's "Sorting" frame — the heading block's own origin. */
  heading: { x: number; y: number; en: string; ko: string };
  texts: PanelText[];
  images: PanelImage[];
};

export const TYPE_PANELS: Record<TypeId, TypePanelData> = {
  coEd: {
    id: "coEd",
    typeValue: "Co_Ed",
    heading: { x: 185, y: 0, en: "CO-ED", ko: "공동 편집" },
    texts: [
      { lang: "en", x: 5, y: 301, w: 228, px: 7, py: 6, lines: ["Co-ed groups feature both male and female performing members"] },
      { lang: "ko", x: 81, y: 368, w: 135, px: 13, py: 16, lines: ["남녀 공동 편집 그룹에는 남성과 여성 공연 멤버가 모두 포함됩니다"] },
      { lang: "en", x: 0, y: 518, w: 176, px: 3, py: 9, lines: ["Choreography blends dynamic partner dancing with unified group routines"] },
      { lang: "ko", x: 169, y: 618, w: 150, px: 2, py: 5, lines: ["역동적인 파트너를 결합한 안무 통일된 그룹 루틴으로 춤을 추다"] },
      { lang: "en", x: -5, y: 766, w: 160, px: 9, py: 7, lines: ["Mixed-gender sub units allow agencies to test experimental concepts"] },
      { lang: "ko", x: 172, y: 856, w: 139, px: 4, py: 7, lines: ["혼합 성별 하위 단위를 통해 기관은 실험 개념을 테스트할 수 있습니다"] },
      { lang: "en", x: 73, y: 1021, w: 238, px: 9, py: 7, lines: ["Agencies historically viewed mixed-gender groups as high market risks"] },
      { lang: "ko", x: 4, y: 1092, w: 310, px: 4, py: 7, lines: ["기관들은 역사적으로 혼합 성별 그룹을 높은 시장 위험으로 간주했습니다"] },
    ],
    images: [
      { file: "coed_02.png", x: 0, y: 0, w: 153, h: 40 },
      { file: "coed_01.png", x: 0, y: 56, w: 241, h: 144 },
      { file: "coed_03.png", x: 169, y: 136, w: 154, h: 144 },
      { file: "coed_04.png", x: 0.5, y: 216, w: 152.5, h: 64 },
      { file: "coed_12.png", x: 257, y: 296, w: 66, h: 224 },
      { file: "coed_11.png", x: 0, y: 376, w: 65, h: 144 },
      { file: "coed_05.png", x: 81, y: 456, w: 242, h: 144 },
      { file: "coed_10.png", x: 0, y: 616, w: 323, h: 144 },
      { file: "coed_07.png", x: 169, y: 776, w: 154, h: 63 },
      { file: "coed_06.png", x: 0, y: 856, w: 322.5, h: 144 },
      { file: "coed_08.png", x: 81, y: 856, w: 72, h: 63.5 },
      { file: "coed_09.png", x: 0, y: 1016, w: 65, h: 64 },
    ],
  },

  boyGroup: {
    id: "boyGroup",
    typeValue: "Boy_Group",
    heading: { x: 164, y: 0, en: "Boy Group", ko: "보이 그룹" },
    texts: [
      { lang: "en", x: 0, y: 136, w: 232, px: 8, py: 6, lines: ["Mandatory military service forces planned group hiatuses or sub-units"] },
      { lang: "ko", x: 0, y: 214, w: 144, px: 8, py: 16, lines: ["의무 군 복무 계획 그룹 히아투스 또는 하위 부대"] },
      { lang: "en", x: 169, y: 283, w: 148, px: 3, py: 9, lines: ["Choreography heavily features high-energy and intense acrobatic power moves"] },
      { lang: "ko", x: 170, y: 379, w: 148, px: 2, py: 5, lines: ["안무는 고에너지와 강렬한 곡예 파워 무브먼트를 특징으로 합니다"] },
      { lang: "en", x: 0, y: 541, w: 222, px: 9, py: 7, lines: ["BTS became the first K-pop group nominated for Grammys"] },
      { lang: "ko", x: 76, y: 628, w: 167, px: 2, py: 5, lines: ["방탄소년단, 그래미 후보에 오른 최초의 케이팝 그룹이 되다"] },
      { lang: "en", x: 6, y: 862, w: 292, px: 9, py: 7, lines: ["BIGBANG pioneered self-producing idol culture and fashion influence"] },
      { lang: "ko", x: 8, y: 942, w: 218, px: 4, py: 7, lines: ["빅뱅은 자체 제작 아이돌 문화와 패션 영향력을 개척했습니다"] },
    ],
    images: [
      { file: "boy_01.png", x: 0, y: 0, w: 153, h: 120 },
      { file: "boy_02.png", x: 169, y: 136, w: 154, h: 144 },
      { file: "boy_04.png", x: 0, y: 296, w: 241, h: 224 },
      { file: "boy_06.png", x: 257, y: 457.5, w: 66, h: 142.5 },
      { file: "boy_05.png", x: -0.025, y: 616, w: 323.025, h: 223.5 },
      { file: "boy_03.png", x: 169, y: 936, w: 154, h: 144 },
      { file: "boy_07.png", x: 0, y: 1016, w: 241.5, h: 120 },
      { file: "boy_08.png", x: 257, y: 1096, w: 66, h: 40 },
    ],
  },

  band: {
    id: "band",
    typeValue: "Band",
    heading: { x: 196, y: 0, en: "Band", ko: "밴드" },
    texts: [
      { lang: "en", x: 81, y: 130, w: 228, px: 7, py: 6, lines: ["Broadcast shows frequently require miming over recorded instrumental tracks"] },
      { lang: "ko", x: 166, y: 207, w: 139, px: 13, py: 16, lines: ["방송 프로그램은 녹음된 악기 트랙을 따라해야 하는 경우가 많습니다"] },
      { lang: "en", x: 31, y: 376, w: 264, px: 3, py: 9, lines: ["Traditional instruments like keytars add unique live performance dynamics"] },
      { lang: "ko", x: 31, y: 463, w: 181, px: 2, py: 5, lines: ["키타와 같은 전통 악기는 독특한 라이브 공연 역학을 더합니다"] },
      { lang: "en", x: 81, y: 691, w: 169, px: 9, py: 7, lines: ["Band members actively compose and write their own music"] },
      { lang: "ko", x: 169, y: 777, w: 141, px: 2, py: 5, lines: ["밴드 멤버들이 적극적으로 작곡하고 글을 씁니다 그들만의 음악"] },
      { lang: "en", x: 0, y: 1013, w: 175, px: 5, py: 7, lines: ["Idol bands focus heavily on live touring over choreography"] },
      { lang: "ko", x: 0, y: 1092, w: 249, px: 5, py: 7, lines: ["아이돌 밴드는 안무보다 라이브 투어에 집중합니다"] },
    ],
    images: [
      { file: "band_01.png", x: 0, y: 0, w: 152.5, h: 200.5 },
      { file: "band_04.png", x: 0, y: 216, w: 241, h: 144.5 },
      { file: "band_05.png", x: 257.5, y: 296, w: 65.5, h: 64 },
      { file: "band_06.png", x: 169, y: 456, w: 154, h: 144 },
      { file: "band_07.png", x: 1, y: 536, w: 152, h: 224 },
      { file: "band_02.png", x: 169, y: 616, w: 154, h: 144 },
      { file: "band_08.png", x: 80.5, y: 776.5, w: 72.5, h: 63.5 },
      { file: "band_03.png", x: 1, y: 777, w: 240, h: 224 },
      { file: "band_09.png", x: 257, y: 856, w: 66, h: 144 },
      { file: "band_10.png", x: 168.5, y: 1016, w: 154.5, h: 120 },
    ],
  },

  girlGroup: {
    id: "girlGroup",
    typeValue: "Girl_Group",
    heading: { x: 167, y: 4, en: "Girl Group", ko: "걸 그룹" },
    texts: [
      { lang: "en", x: -5, y: 213, w: 160, px: 7, py: 6, lines: ["Virtual and AI avatars expand modern female group universe lore"] },
      { lang: "ko", x: 167, y: 207, w: 133, px: 13, py: 16, lines: ["가상 및 AI 아바타, 현대 여성 그룹 우주의 전설 확장"] },
      { lang: "en", x: 78, y: 449, w: 176, px: 3, py: 9, lines: ["S.E.S and Fin.K.L pioneered first generation girl group culture"] },
      { lang: "ko", x: 84, y: 548, w: 148, px: 2, py: 5, lines: ["S.E.S.와 핑클은 1세대 걸그룹 문화를 개척했습니다"] },
      { lang: "en", x: -9, y: 688, w: 173, px: 9, py: 7, lines: ["High physical album sales reflect exceptionally loyal female fanbases"] },
      { lang: "ko", x: 174, y: 777, w: 140, px: 2, py: 5, lines: ["하이 피지컬 앨범 판매는 매우 충성도가 높은 여성 팬층을 반영합니다"] },
      { lang: "en", x: 165, y: 922, w: 151, px: 9, py: 7, lines: ["SNSD established the gold standard for synchronized group performances"] },
      { lang: "ko", x: 166, y: 1016, w: 150, px: 4, py: 7, lines: ["SNSD는 동기화된 그룹 공연을 위한 표준을 확립했습니다"] },
    ],
    images: [
      { file: "girl_01.png", x: 0, y: 0, w: 65, h: 200 },
      { file: "girl_12.png", x: 81, y: 0, w: 72, h: 120 },
      { file: "girl_02.png", x: 81, y: 136, w: 242, h: 63.5 },
      { file: "girl_06.png", x: 0, y: 296, w: 65, h: 222 },
      { file: "girl_03.png", x: 81, y: 296, w: 242, h: 223.5 },
      { file: "girl_05.png", x: 258, y: 535, w: 65, h: 64 },
      { file: "girl_04.png", x: 0, y: 536.5, w: 323, h: 222 },
      { file: "girl_07.png", x: 0, y: 776, w: 153, h: 144 },
      { file: "girl_08.png", x: 0, y: 856, w: 323, h: 144 },
      { file: "girl_09.png", x: 0, y: 1016, w: 153.5, h: 120.5 },
      { file: "girl_10.png", x: 81, y: 1016, w: 72, h: 64 },
      { file: "girl_11.png", x: 169, y: 1096, w: 154, h: 41 },
    ],
  },
};

export const TYPE_PANEL_IDS: TypeId[] = ["coEd", "boyGroup", "band", "girlGroup"];

/** Which panel a Type row's `type` value opens, keyed by the row key that
 * `typeRows` already uses. Nothing new is invented — the values are the same
 * ones `groups.json` and the Timeline filters carry. */
export function typePanelForValue(typeValue: string): TypeId | null {
  const hit = TYPE_PANEL_IDS.find((id) => TYPE_PANELS[id].typeValue === typeValue);
  return hit ?? null;
}
