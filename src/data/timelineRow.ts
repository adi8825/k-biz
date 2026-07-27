export type TimelineRowLabel = {
  /** Which Figma title treatment to render. "generation" is the MainScreen
   * default row label (64px Satoshi Light number). "sort" is the
   * Nationality / Type / NumberOfMembers treatment, which uses the named
   * ENG_2H + KOR_2H styles and a 40px Total_Number. */
  variant?: "generation" | "sort";
  /** Big leading digit/range, e.g. "1", "3/4", "8+". Omitted for rows that
   * only show an English/Korean title (Nationality, Type). */
  number?: string;
  /** Shown next to `number` when present (e.g. "st Gen", "Members"), or
   * standalone as the row title otherwise (Nationality, Type). */
  english: string;
  korean: string;
  /** e.g. "1992-2002". Generation rows only. */
  years?: string;
  /** Figma does not use one type ramp for every generation row: the suffix is
   * 24px only on the 1st Gen row and 20px on the rest, and the year range is
   * 20px on rows 1-2 and 22px on rows 3-5. The 1st Gen row is also the only
   * one centred; the other four are left-aligned. Generation rows only. */
  type?: {
    enSize: number;
    enTracking: number;
    yearsSize: number;
    yearsTracking: number;
    centred: boolean;
  };
  box: { x: number; y: number; width: number; height: number };
};

export type TimelineRowConfig = {
  key: string;
  label: TimelineRowLabel;
  curve: { x: number; y: number; width: number; height: number };
};
