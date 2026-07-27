import type { TimelineRowConfig } from "./timelineRow";

/** Row key doubles as the exact `nationality` value it matches. */
export const nationalityRows: (TimelineRowConfig & { nationality: number })[] = [
  {
    key: "100",
    nationality: 100,
    label: {
      english: "All Korean",
      korean: "모든 한국어",
      box: { x: 173, y: 64, width: 126, height: 64 },
    },
    curve: { x: 245, y: 16, width: 1446, height: 119 },
  },
  {
    key: "75",
    nationality: 75,
    label: {
      english: "Mostly Korean",
      korean: "대부분 한국어",
      box: { x: 173, y: 262, width: 165, height: 64 },
    },
    curve: { x: 245, y: 227, width: 1446, height: 119 },
  },
  {
    // Figma's own Korean subtitle for this row is a duplicate of "All
    // Korean"'s ("모든 한국어") rather than a translation of "Half Korean" —
    // reproduced verbatim, not corrected, since it's the source design.
    key: "50",
    nationality: 50,
    label: {
      english: "Half Korean",
      korean: "모든 한국어",
      box: { x: 173, y: 475, width: 139, height: 64 },
    },
    curve: { x: 245, y: 438, width: 1446, height: 119 },
  },
  {
    key: "25",
    nationality: 25,
    label: {
      english: "Minority Korean",
      korean: "소수민족 한국인",
      box: { x: 173, y: 695, width: 181, height: 64 },
    },
    curve: { x: 245, y: 649, width: 1446, height: 119 },
  },
  {
    key: "0",
    nationality: 0,
    label: {
      english: "Non-Korean",
      korean: "비한국인",
      box: { x: 173, y: 894, width: 145, height: 64 },
    },
    curve: { x: 245, y: 860, width: 1446, height: 119 },
  },
];
