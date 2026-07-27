import type { FilterCategory } from "./filterState";

export type FilterOption = { value: string; en: string; ko: string };

/** Friendlier display labels for exact dataset values — kept separate from
 * groups.json so the dataset itself is never renamed/normalized. Order and
 * copy are taken verbatim from the Figma Filter_Tab "Open" component. */
export const FILTER_OPTIONS: Record<FilterCategory, FilterOption[]> = {
  nationality: [
    { value: "100", en: "All Korean", ko: "모든 한국어" },
    { value: "75", en: "Mostly Korean", ko: "대부분 한국어" },
    { value: "50", en: "Half Korean", ko: "모든 한국어" },
    { value: "25", en: "Minority Korean", ko: "소수민족 한국인" },
    { value: "0", en: "Non-Korean", ko: "비한국인" },
  ],
  language: [
    { value: "KR", en: "Korean", ko: "한국어" },
    { value: "JP", en: "Japanese", ko: "일본어" },
    { value: "CN", en: "Chinese", ko: "중국어" },
    { value: "EN", en: "English", ko: "영어" },
  ],
  formation: [
    { value: "Regular", en: "Company", ko: "회사" },
    { value: "Survival_Show", en: "Survival Show", ko: "서바이벌 쇼" },
    { value: "Global_Project", en: "Global Project", ko: "글로벌 프로젝트" },
  ],
  status: [
    { value: "true", en: "Active", ko: "활동적인" },
    { value: "false", en: "Inactive", ko: "활발하지 않은" },
  ],
  type: [
    { value: "Girl_Group", en: "Girls Group", ko: "걸 그룹" },
    { value: "Boy_Group", en: "Boys Group", ko: "남자 그룹" },
    { value: "Co_Ed", en: "Co-Ed Group", ko: "공동 편집 그룹" },
    { value: "Band", en: "Bands", ko: "밴드" },
  ],
};

export const FILTER_TAB_TEXT: Record<FilterCategory, { en: string; ko: string }> = {
  nationality: { en: "Nationality", ko: "국적" },
  language: { en: "Language", ko: "언어" },
  formation: { en: "Formation", ko: "형성" },
  status: { en: "Status", ko: "활동 상태" },
  type: { en: "Type", ko: "성별" },
};
