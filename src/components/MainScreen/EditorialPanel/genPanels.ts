/**
 * Information_Panels_Gen — the five per-generation panels shown while a
 * generation heading is hovered.
 *
 * Transcribed from Figma frames 1stGen_Panel … 5thGen_Panel. Every panel is
 * 323x1136, the same box the standing EditorialPanel occupies, so swapping
 * between them cannot shift any layout.
 *
 * Both element kinds are absolutely positioned in Figma, so they are stored as
 * flat lists rather than five bespoke components. Image plates all bleed
 * exactly 1px past their box on every side, the same rule the Opening lattice
 * uses, so only the box is stored.
 */

export type GenId = 1 | 2 | 3 | 4 | 5;

/** A fact block. `lines` holds Figma's own line breaks; a single-entry array
 * wraps naturally inside `w`. `centred` mirrors Figma's translate-x-1/2. */
export type PanelText = {
  lang: "en" | "ko";
  lines: string[];
  y: number;
  w: number;
  px: number;
  py: number;
  x?: number;
  centred?: true;
};

export type PanelImage = { file: string; x: number; y: number; w: number; h: number };

export type GenPanel = {
  gen: GenId;
  /** Figma splits the heading into the numeral and its ordinal suffix. */
  ordinal: string;
  headingLeft: number;
  headingGap: number;
  texts: PanelText[];
  images: PanelImage[];
};

export const GEN_PANELS: Record<GenId, GenPanel> = {
  1: {
    gen: 1,
    ordinal: "st Gen",
    headingLeft: 185,
    headingGap: 5,
    texts: [
      { lang: "en", x: -5, y: 213, w: 158, px: 7, py: 6, lines: ["Fans Used Colored Raincoats and Balloons Instead of Lightsticks"] },
      { lang: "ko", x: 167, y: 207, w: 133, px: 13, py: 16, lines: ["팬들은 라이트 스틱 대신 컬러 우비와 풍선을 사용했다"] },
      { lang: "en", x: 81, y: 449, w: 176, px: 3, py: 9, lines: ["Fierce Physical Rivalries Broke Out Between Opposing Fanbases"] },
      { lang: "ko", x: 84, y: 548, w: 148, px: 2, py: 5, lines: ["반대 팬층 간의 치열한 물리적 경쟁이 시작되었다"] },
      { lang: "en", x: 0, y: 691, w: 169, px: 9, py: 7, lines: ["Groups Established the Standard Roles and Synchronized Dancing"] },
      { lang: "ko", x: 176, y: 778, w: 136, px: 2, py: 5, lines: ["그룹들이 표준 역할을 설정하고 동기화된 ", "춤을 추다"] },
      { lang: "en", x: 165, y: 930, w: 142, px: 9, py: 7, lines: ['The "Big 3" Agencies Were Founded During This Era'] },
      { lang: "ko", x: 182, y: 1024, w: 119, px: 4, py: 7, lines: ['"빅 3" 에이전시는 이 시대에 설립되었다'] },
    ],
    images: [
      { file: "g1_a.png", x: -0.5, y: 0, w: 152.5, h: 200.5 },
      { file: "g1_b.png", x: 81, y: 136, w: 242, h: 63.5 },
      { file: "g1_c.png", x: 81, y: 296, w: 242, h: 223.5 },
      { file: "g1_e.png", x: 0, y: 296, w: 65, h: 222 },
      { file: "g1_d.png", x: 0, y: 536.5, w: 323, h: 222 },
      { file: "g1_i.svg", x: 258, y: 535, w: 65, h: 64 },
      { file: "g1_f.png", x: 0, y: 776, w: 153, h: 144 },
      { file: "g1_g.png", x: 0, y: 856, w: 323, h: 144 },
      { file: "g1_h.png", x: 0, y: 1016, w: 153.5, h: 120.5 },
      { file: "g1_j.svg", x: 81, y: 1016, w: 72, h: 64 },
      { file: "g1_k.svg", x: 169, y: 1096, w: 154, h: 41 },
    ],
  },

  2: {
    gen: 2,
    ordinal: "nd Gen",
    headingLeft: 164,
    headingGap: 8,
    texts: [
      { lang: "en", x: 0, y: 136, w: 185, px: 8, py: 6, lines: ["Concept-Driven Album Eras and Multi-Member Lineups Became Standard"] },
      { lang: "ko", x: 0, y: 208, w: 144, px: 8, py: 16, lines: ["콘셉트 기반 앨범 시대와 ", "멀티 멤버 라인업이 ", "표준이 되다"] },
      { lang: "en", x: 169, y: 291, w: 148, px: 3, py: 9, lines: ["Iconic Viral Hits Introduced K-Pop to Global Audiences"] },
      { lang: "ko", x: 170, y: 379, w: 148, px: 2, py: 5, lines: ["전 세계 관객에게 케이팝을 소개한 아이코닉 바이럴 히트곡"] },
      { lang: "en", x: 0, y: 530, w: 190, px: 9, py: 7, lines: ['"Golden Age" Music Shows and Variety Appearances Exploded Popularity'] },
      { lang: "ko", x: 91, y: 616, w: 136, px: 2, py: 5, lines: ['"골든 에이지" 음악 프로그램과 버라이어티 출연으로 폭발적인 인기'] },
      { lang: "en", centred: true, y: 862, w: 292, px: 9, py: 7, lines: ["Idol Groups Standardized Formal Sub-Units for Targeted Promos"] },
      { lang: "ko", x: 9, y: 945, w: 218, px: 4, py: 7, lines: ["아이돌 그룹, 타겟 프로모션을 위한 공식 하위 유닛 표준화"] },
    ],
    images: [
      { file: "g2_a.png", x: 0, y: 0, w: 153, h: 120 },
      { file: "g2_b.png", x: 169, y: 136, w: 154, h: 144 },
      { file: "g2_d.png", x: 0, y: 296, w: 241, h: 224 },
      { file: "g2_g.svg", x: 257, y: 457.5, w: 66, h: 142.5 },
      { file: "g2_e.png", x: -0.02, y: 616, w: 323.025, h: 223.5 },
      { file: "g2_c.png", x: 169, y: 936, w: 154, h: 144 },
      { file: "g2_f.png", x: 0, y: 1016, w: 241.5, h: 120 },
      { file: "g2_h.svg", x: 257, y: 1096, w: 66, h: 40 },
    ],
  },

  3: {
    gen: 3,
    ordinal: "rd Gen",
    headingLeft: 169,
    headingGap: 8,
    texts: [
      { lang: "en", x: 81, y: 140, w: 217, px: 7, py: 6, lines: ["Streaming Platforms and Social Media Driven Fan Engagement"] },
      { lang: "ko", x: 166, y: 214, w: 133, px: 13, py: 16, lines: ["스트리밍 플랫폼 및 소셜 미디어 기반 팬 참여"] },
      { lang: "en", x: 31, y: 376, w: 264, px: 3, py: 9, lines: ["Reality Survival Shows Formed Massive Permanent and Temporary Groups"] },
      { lang: "ko", x: 31, y: 460, w: 168, px: 2, py: 5, lines: ["대규모 영구 및 임시 그룹을 결성한 리얼리티 서바이벌 쇼"] },
      { lang: "en", x: 81, y: 691, w: 169, px: 9, py: 7, lines: ["Deep Concept Lore and Multi-Album Universes Became Essential"] },
      { lang: "ko", x: 168, y: 786, w: 141, px: 2, py: 5, lines: ["딥 컨셉 로어와 멀티 앨범 유니버스가 필수가 되다"] },
      { lang: "en", x: 0, y: 1013, w: 160, px: 5, py: 7, lines: ["K-Pop Broke Into Major Western Stadiums and Festivals"] },
      { lang: "ko", x: 0, y: 1099, w: 249, px: 5, py: 7, lines: ["케이팝, 서부 주요 경기장과 축제에 진출하다"] },
    ],
    images: [
      { file: "g3_a.png", x: 0, y: 0, w: 152.5, h: 200.5 },
      { file: "g3_d.png", x: 0, y: 216, w: 241, h: 144.5 },
      { file: "g3_h.svg", x: 257.5, y: 296, w: 65.5, h: 64 },
      { file: "g3_e.png", x: 169, y: 456, w: 154, h: 144 },
      { file: "g3_f.png", x: 1, y: 536, w: 152, h: 224 },
      { file: "g3_b.png", x: 169, y: 616, w: 154, h: 144 },
      { file: "g3_i.svg", x: 80.5, y: 776.5, w: 72.5, h: 63.5 },
      { file: "g3_c.png", x: 1, y: 777, w: 240, h: 224 },
      { file: "g3_j.svg", x: 257, y: 856, w: 66, h: 144 },
      { file: "g3_g.png", x: 168.5, y: 1016, w: 154.5, h: 120 },
    ],
  },

  4: {
    gen: 4,
    ordinal: "th Gen",
    headingLeft: 166,
    headingGap: 8,
    texts: [
      { lang: "en", x: 5, y: 219, w: 228, px: 7, py: 6, lines: ["Groups often debut with detailed storylines"] },
      { lang: "ko", x: 167, y: 294, w: 133, px: 13, py: 16, lines: ["그룹은 종종 자세한 ", "스토리라인으로 데뷔다"] },
      { lang: "en", x: 0, y: 449, w: 176, px: 3, py: 9, lines: ['Girl crush" became ', "one of the dominant ", "concepts for girl groups"] },
      { lang: "ko", x: 171, y: 536, w: 148, px: 2, py: 5, lines: ['걸크러시"는 걸그룹의 ', "주요 콘셉트 중 하나가 ", "되었습니다"] },
      { lang: "en", x: 12, y: 862, w: 210, px: 9, py: 7, lines: ["English songs and versions ", "became much more common"] },
      { lang: "ko", x: 17, y: 946, w: 203, px: 4, py: 7, lines: ["영어 노래와 버전이 훨씬 더 흔해 ", "졌습니다"] },
    ],
    images: [
      { file: "g4_a.png", x: 0, y: 0, w: 323, h: 200.5 },
      { file: "g4_b.png", x: 257, y: 216, w: 66, h: 64 },
      { file: "g4_d.png", x: 0, y: 296, w: 153, h: 144 },
      { file: "g4_k.svg", x: 0, y: 376, w: 65, h: 64 },
      { file: "g4_e.png", x: 169, y: 376, w: 154, h: 144 },
      { file: "g4_f.png", x: 0, y: 536, w: 153, h: 224 },
      { file: "g4_g.png", x: 169, y: 616, w: 154, h: 144 },
      { file: "g4_l.svg", x: 257, y: 696, w: 66, h: 144 },
      { file: "g4_h.png", x: -2, y: 776, w: 243, h: 63.5 },
      { file: "g4_c.png", x: 257, y: 856, w: 66, h: 64 },
      { file: "g4_j.png", x: 169, y: 936, w: 154, h: 200 },
      { file: "g4_i.png", x: 0, y: 1016, w: 151, h: 120 },
    ],
  },

  5: {
    gen: 5,
    ordinal: "th Gen",
    headingLeft: 169,
    headingGap: 0,
    texts: [
      { lang: "en", x: 5, y: 301, w: 228, px: 7, py: 6, lines: ["Shifted Focus Toward Short-Form Social Media Virality"] },
      { lang: "ko", x: 81, y: 376, w: 135, px: 13, py: 16, lines: ["숏폼 소셜 미디어 ", "바이럴리티로 초점 전환"] },
      { lang: "en", x: 0, y: 529, w: 176, px: 3, py: 9, lines: ["Songs Feature Shorter Durations and Hook-Forward Production"] },
      { lang: "ko", x: 169, y: 628, w: 150, px: 2, py: 5, lines: ["곡의 지속 시간 단축과 ", "후크 포워드 프로덕션 기능"] },
      { lang: "en", x: 0, y: 771, w: 133, px: 9, py: 7, lines: ["AI and Virtual Idols Integrated Deeply Into Concepts"] },
      { lang: "ko", x: 175, y: 863, w: 135, px: 4, py: 7, lines: ["AI와 가상 아이돌이 ", "개념에 깊이 통합되었다"] },
      { lang: "en", x: 83, y: 1019, w: 222, px: 9, py: 7, lines: ["Easy-to-Learn Dance Challenges Drive Song Chart Success"] },
      { lang: "ko", centred: true, y: 1101, w: 310, px: 4, py: 7, lines: ["배우기 쉬운 댄스 챌린지가 노래 차트 성공을 이끈 이유"] },
    ],
    images: [
      { file: "g5_h.svg", x: 0, y: 0, w: 153, h: 40 },
      { file: "g5_a.png", x: 0, y: 56, w: 241, h: 144 },
      { file: "g5_i.svg", x: 169, y: 136, w: 154, h: 144 },
      { file: "g5_b.png", x: 0.5, y: 216, w: 152.5, h: 64 },
      { file: "g5_g.png", x: 257, y: 296, w: 66, h: 224 },
      { file: "g5_l.svg", x: 0, y: 376, w: 65, h: 144 },
      { file: "g5_c.png", x: 81, y: 456, w: 242, h: 144 },
      { file: "g5_f.png", x: 0, y: 616, w: 323, h: 144 },
      { file: "g5_e.png", x: 169, y: 776, w: 154, h: 63 },
      { file: "g5_d.png", x: 0, y: 856, w: 322.5, h: 144 },
      { file: "g5_j.svg", x: 81, y: 856, w: 72, h: 63.5 },
      { file: "g5_k.svg", x: 0, y: 1016, w: 65, h: 64 },
    ],
  },
};
