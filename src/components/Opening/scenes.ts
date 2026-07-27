import type { PlateId } from "./plates";

/**
 * Scene-dependent content for the Opening sequence.
 *
 * Only things that actually change between states live here: photo fills,
 * captions, the bilingual paragraph and the charm artwork. Lattice geometry
 * stays in `plates.ts` and is permanently mounted.
 *
 * Photos reference a plate by id, so their box comes from the lattice rather
 * than duplicated coordinates. `box` is only supplied where Figma genuinely
 * offsets the photo from its outline (a couple of 1–2px cases in opening1).
 */
export type OpeningScene = 1 | 2 | 3;

export type ScenePhoto = {
  /** Which lattice plate this photo fills. */
  plate: PlateId;
  /** Asset path, relative to the scene's asset directory. */
  src: string;
  /** Figma's bleed — the image overhangs its plate slightly. */
  imgW: number;
  imgH: number;
  alt: string;
  /** Overrides the plate box where Figma offsets the photo from the outline. */
  box?: { x: number; y: number; w: number; h: number };
  /** Rendered as a rounded, cropped fill inside a bordered plate. */
  cover?: boolean;
};

export type SceneCaption = {
  en: string;
  ko?: string;
  x: number;
  y: number;
  size: 15 | 16;
  align?: "center";
  width?: number;
};

export type SceneParagraph = {
  en: string;
  ko: string;
  /** The paragraph's own Figma container. Each state centres inside its own
   * box, so a 2-line and a 3-line paragraph both land where Figma puts them
   * without animating any layout. */
  boxY: number;
  boxH: number;
  /** Figma's vertical anchor within that box. */
  offset: number;
};

export type Scene = {
  assets: string;
  photos: ScenePhoto[];
  captions: SceneCaption[];
  paragraph: SceneParagraph;
  charm: "circle" | "square" | "octagon";
};

const A1 = "/opening/opening1";
const A2 = "/opening/opening2";
const A3 = "/opening/opening3";

export const SCENES: Record<OpeningScene, Scene> = {
  1: {
    assets: A1,
    charm: "circle",
    photos: [
      { plate: "vector126", src: "louis_armstrong.png", imgW: 75, imgH: 225, alt: "Louis Armstrong" },
      // Figma offsets these two 1–2px from their outlines; preserved verbatim.
      { plate: "vector113", src: "doris_day.png", imgW: 162, imgH: 386, alt: "Doris Day", box: { x: 371, y: 743, w: 160, h: 384 } },
      { plate: "vector127", src: "simon_garfunkel.png", imgW: 162, imgH: 146, alt: "Simon & Garfunkel" },
      { plate: "vector114", src: "aretha_franklin.png", imgW: 250.001, imgH: 226, alt: "Aretha Franklin" },
      { plate: "vector115", src: "prince.png", imgW: 162, imgH: 306, alt: "Prince", box: { x: 370, y: 105, w: 160, h: 304 } },
      { plate: "vector128", src: "madonna.png", imgW: 74, imgH: 146, alt: "Madonna" },
      { plate: "vector125", src: "patti_page.png", imgW: 251, imgH: 306, alt: "Patti Page" },
      { plate: "vector129", src: "beatles.png", imgW: 162, imgH: 146, alt: "The Beatles" },
      { plate: "vector130", src: "elvis_presley.png", imgW: 250, imgH: 225.95, alt: "Elvis Presley" },
      { plate: "vector131", src: "nat_king_cole.png", imgW: 162, imgH: 146, alt: "Nat King Cole" },
    ],
    captions: [
      { en: "Louis Armstrong", ko: "루이 암스트롱", x: 1282, y: 915, size: 15 },
      { en: "Elvis Presley", ko: "엘비스 프레슬리", x: 1764, y: 1074, size: 15, align: "center" },
      { en: "Doris Day", ko: "도리스 데이", x: 450, y: 1074, size: 16, width: 82 },
      { en: "Simon & Garfunkel", ko: "사이먼 앤 가펑클", x: 1624, y: 832, size: 16 },
      { en: "Aretha Franklin", ko: "아레사 프랭클린", x: 846, y: 913, size: 16 },
      { en: "Prince", ko: "프린스", x: 481, y: 193, size: 16 },
      { en: "Madonna", ko: "마돈나", x: 1863, y: 433, size: 16, width: 82 },
      { en: "Patti Page", ko: "패티 페이지", x: 104.5, y: 593, size: 16, width: 82 },
      { en: "The Beatles", ko: "비틀즈", x: 1252, y: 113, size: 15 },
      { en: "Nat King Cole", ko: "냇 킹 콜", x: 1683, y: 429, size: 15 },
    ],
    paragraph: {
      en: "The introduction of American popular music to post war South Korea laid the foundation for modern K-pop.",
      ko: "전후 한국에 미국 대중음악이 도입되면서 현대 케이팝의 토대가 마련되었습니다.",
      boxY: 356,
      boxH: 315,
      offset: 62.5,
    },
  },

  2: {
    assets: A2,
    charm: "square",
    photos: [
      { plate: "vector108", src: "capped_person.png", imgW: 164.5, imgH: 309, alt: "Archival photograph" },
      { plate: "vector112", src: "seo_taiji.png", imgW: 248, imgH: 226, alt: "Seo Taiji" },
      { plate: "vector99", src: "seotaiji_and_boys.png", imgW: 514, imgH: 306, alt: "Seo Taiji and Boys" },
      { plate: "vector109", src: "yang_hyunsuk.png", imgW: 161.5, imgH: 385, alt: "Yang Hyunsuk" },
      { plate: "vector110", src: "group_photo.png", imgW: 249, imgH: 146.5, alt: "Archival group photograph" },
      { plate: "vector111", src: "trio_red.png", imgW: 249, imgH: 146, alt: "Archival performance photograph" },
    ],
    captions: [
      { en: "Seotaiji and Boys", ko: "서태지와 아이들", x: 1537, y: 105, size: 16, align: "center", width: 114 },
      { en: "Seo Taiji", ko: "서태지", x: 910, y: 111.5, size: 16, align: "center", width: 55 },
      { en: "Yang Hyunsuk", ko: "양 현석", x: 142, y: 756, size: 16, align: "center", width: 96 },
      { en: "I Know", ko: "난 알아요", x: 1875, y: 271, size: 16, align: "center", width: 59 },
      { en: "(1992)", x: 1973, y: 200, size: 16, align: "center", width: 41 },
    ],
    paragraph: {
      en: "In 1992, Seo Taiji and Boys revolutionized the Korean music industry, marking the beginning of a new era",
      ko: "1992년 서태지와 아이들은 한국 음악 산업에 혁명을 일으켜 새로운 시대의 시작을 알렸습니다.",
      boxY: 356,
      boxH: 315,
      offset: 62.5,
    },
  },

  3: {
    assets: A3,
    charm: "octagon",
    // opening3 carries no captions — every caption frame is hidden in Figma.
    captions: [],
    // Figma renames nodes between frames, so these are matched to plates by
    // coordinate and the files are named after the plate they fill.
    photos: [
      { plate: "vector122", src: "vector122.png", imgW: 162, imgH: 226, alt: "K-pop group photograph" },
      { plate: "vector54", src: "vector54.png", imgW: 162, imgH: 386, alt: "K-pop group photograph" },
      { plate: "vector123", src: "vector123.png", imgW: 250, imgH: 146, alt: "K-pop group photograph" },
      { plate: "photo07", src: "photo07.png", imgW: 250, imgH: 226, alt: "K-pop group photograph" },
      { plate: "vector124", src: "vector124.png", imgW: 162, imgH: 226, alt: "K-pop group photograph" },
      { plate: "photo15", src: "photo15.png", imgW: 250, imgH: 226, alt: "K-pop group photograph" },
      { plate: "vector119", src: "vector119.png", imgW: 248.5, imgH: 146, alt: "K-pop group photograph" },
      { plate: "vector120", src: "vector120.png", imgW: 74.001, imgH: 146, alt: "K-pop group photograph" },
      { plate: "photo12", src: "photo12.png", imgW: 162, imgH: 145, alt: "K-pop group photograph" },
      { plate: "photo02", src: "photo02.png", imgW: 161, imgH: 65, alt: "K-pop group photograph" },
      { plate: "photo20", src: "photo20.png", imgW: 161.9, imgH: 146, alt: "K-pop group photograph" },
      { plate: "photo16", src: "photo16.png", imgW: 161.899, imgH: 226, alt: "K-pop group photograph" },
      { plate: "vector117a", src: "vector117a.png", imgW: 74, imgH: 146, alt: "K-pop group photograph" },
      { plate: "photo09", src: "photo09.png", imgW: 162, imgH: 146, alt: "K-pop group photograph" },
      { plate: "vector121", src: "vector121.png", imgW: 160, imgH: 145, alt: "K-pop group photograph" },
      { plate: "photo18", src: "photo18.png", imgW: 162, imgH: 146, alt: "K-pop group photograph" },
      { plate: "photo17", src: "photo17.png", imgW: 74, imgH: 227.5, alt: "K-pop group photograph" },
      { plate: "photo13", src: "photo13.png", imgW: 250, imgH: 226, alt: "K-pop group photograph" },
      { plate: "photo10", src: "photo10.png", imgW: 162, imgH: 66, alt: "K-pop group photograph" },
      { plate: "photo01", src: "photo01.png", imgW: 71, imgH: 144, alt: "K-pop group photograph", cover: true },
      { plate: "photo14", src: "photo14.png", imgW: 162, imgH: 146, alt: "K-pop group photograph" },
      { plate: "photo19", src: "photo19.png", imgW: 162, imgH: 226, alt: "K-pop group photograph" },
      { plate: "vector117b", src: "vector117b.png", imgW: 74, imgH: 146, alt: "K-pop group photograph" },
    ],
    paragraph: {
      en: "Today, K-pop is one of the world's most influential cultural exports, shaping music, fashion, and popular culture across the globe",
      ko: "오늘날 케이팝은 전 세계적으로 음악, 패션, 대중문화를 형성하며 세계에서 가장 영향력 있는 문화 수출품 중 하나입니다",
      boxY: 357,
      boxH: 396,
      offset: 62.85,
    },
  },
};

export const SCENE_IDS: OpeningScene[] = [1, 2, 3];
