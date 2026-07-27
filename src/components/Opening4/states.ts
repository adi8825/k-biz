/**
 * The four Opening4 states.
 *
 * Only genuine state differences live here. The accidental Figma
 * inconsistencies found during analysis were normalised and deliberately have
 * no config field: both lines are centred on x=1024 in every state, Korean
 * non-bold runs are Pretendard Regular, the trailing space after "Company" is
 * gone, and "Let's Go!" carries its apostrophe.
 *
 * All timings are measured from Figma's own 2000ms motion cohorts — none are
 * invented. See the note on each state's `timing`.
 */

export type Opening4StateId = 1 | 2 | 3 | 4;

/** A line is a run list so a state can be part-bold (4.1-4.3) or all one
 * weight (4.4) without needing separate shapes. */
export type CopyRun = { text: string; bold?: true };

/** Which element of the charm assembly is lit. 4.4 lights everything. */
export type Highlight = "language" | "flower" | "pearl" | "all";

export type Opening4State = {
  id: Opening4StateId;
  en: CopyRun[];
  ko: CopyRun[];
  highlight: Highlight;
  /**
   * 4.4 is a call to action rather than a caption and Figma sets it larger and
   * heavier — Satoshi Medium / Pretendard SemiBold at 32px against 24px
   * elsewhere. Measured, not assumed, so it is preserved rather than
   * normalised away.
   */
  type: { size: number; enWeight: number; koWeight: number; enTop: number; koTop: number };
  /** Window, in ms from the start of the state change, for the charm's
   * per-element opacity and for the caption cross-fade. */
  timing: { charm: [number, number]; text: [number, number] };
  /** Only 4.1 has an entrance, and it is the only scale in the whole sequence. */
  entranceScaleMs?: [number, number];
};

const CAPTION = { size: 24, enWeight: 400, koWeight: 400, enTop: 710, koTop: 766 };

export const OPENING4_STATES: Record<Opening4StateId, Opening4State> = {
  1: {
    id: 1,
    en: [{ text: "Most Of Their Song are in " }, { text: "Korean", bold: true }],
    ko: [{ text: "그들의 노래 대부분은 " }, { text: "한국어로", bold: true }, { text: " 되어 있다" }],
    highlight: "language",
    type: CAPTION,
    // Figma: charm cross-fade 0.4854-0.8021, captions 0.6696-0.9811 of 2000ms.
    timing: { charm: [971, 1604], text: [1339, 1962] },
    // Figma: scale 0.5 -> 1 over 0-0.3369 of 2000ms, easeOut.
    entranceScaleMs: [0, 674],
  },
  2: {
    id: 2,
    en: [{ text: "They were formed by a " }, { text: "Company", bold: true }],
    ko: [{ text: "그들은 한 " }, { text: "회사에", bold: true }, { text: " 의해 설립되었습니다" }],
    highlight: "flower",
    type: CAPTION,
    // Figma: charm 0-0.4936, captions 0.3696-0.6196 of 2000ms.
    timing: { charm: [0, 987], text: [739, 1239] },
  },
  3: {
    id: 3,
    en: [{ text: "Today, They are " }, { text: "Active", bold: true }],
    ko: [{ text: "오늘날 그들은 " }, { text: "여전히 활동적입니다", bold: true }],
    highlight: "pearl",
    type: CAPTION,
    // Figma: charm 0-0.25, captions 0.2321-0.4821 of 2000ms.
    timing: { charm: [0, 500], text: [464, 964] },
  },
  4: {
    id: 4,
    en: [{ text: "Let’s Go!" }],
    ko: [{ text: "가자!" }],
    highlight: "all",
    type: { size: 32, enWeight: 500, koWeight: 600, enTop: 711, koTop: 764 },
    /* Figma authors no incoming charm cross-fade on 4.4 — its only charm
     * animation is an outgoing fade toward whatever follows the Opening. Both
     * 4.3 and 4.4 time their charm animation at 0-0.25 of 2000ms, so that
     * measured window is used here too. Captions are 4.4's own measured
     * 0.2321-0.4821. */
    timing: { charm: [0, 500], text: [464, 964] },
  },
};

export const OPENING4_STATE_IDS: Opening4StateId[] = [1, 2, 3, 4];

/** Per-element charm opacity. Derived from `highlight` so the table cannot
 * drift out of step with the copy. The bar is a connector rather than an
 * attribute: Figma holds it at 0.35 until the charm completes in 4.4. */
export function charmOpacities(highlight: Highlight) {
  if (highlight === "all") return { bar: 1, language: 1, flower: 1, pearl: 1, tag: 1 };
  return {
    bar: 0.35,
    language: highlight === "language" ? 1 : 0.25,
    flower: highlight === "flower" ? 1 : 0.25,
    pearl: highlight === "pearl" ? 1 : 0.25,
    tag: 0.25,
  };
}

/** Figma eases every one of these segments with easeOut. */
export const OPENING4_EASING = "cubic-bezier(0, 0, 0.58, 1)";

/**
 * The motion cohort every state above is measured against. Figma authors each
 * Opening4 state as one 2000ms cohort, so this is also how long a state stays
 * up while the sequence plays itself — the authored figure, including the hold
 * that follows the last keyframe, rather than a chosen pace.
 */
export const OPENING4_COHORT_MS = 2000;

/**
 * When a state's captions may run, relative to the start of that state.
 *
 * 4.1 is the only state with an entrance, and its authored caption start
 * (1339ms) lands while the charm is still resolving into its first state — the
 * per-element cross-fade runs 971-1604ms. The captions are therefore held back
 * to the moment that cross-fade completes, which is the charm's own authored
 * finish rather than a guess. The 623ms fade itself is untouched; only its
 * start moves. Every other state keeps its authored window verbatim.
 */
export function captionWindow(state: Opening4State): [number, number] {
  const [start, end] = state.timing.text;
  if (!state.entranceScaleMs) return [start, end];
  const settled = state.timing.charm[1];
  return [settled, settled + (end - start)];
}

/** How far 4.1's captions were pushed back, so the state can be given exactly
 * that much extra time and its captions keep the hold Figma gives them. */
const CAPTION_HOLDBACK_MS =
  captionWindow(OPENING4_STATES[1])[0] - OPENING4_STATES[1].timing.text[0];

/** How long a state holds the screen while the sequence plays itself. */
export function stateDurationMs(id: Opening4StateId): number {
  return OPENING4_COHORT_MS + (id === 1 ? CAPTION_HOLDBACK_MS : 0);
}
