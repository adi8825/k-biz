import type { TimelineRowConfig } from "./timelineRow";

/** Bucket boundaries are literal from Figma's own row labels (3/4, 5, 6, 7,
 * 8+) — not invented. `max: null` means unbounded (the "8+" row). */
export const memberCountRows: (TimelineRowConfig & { min: number; max: number | null })[] = [
  {
    key: "3-4",
    min: 3,
    max: 4,
    label: {
      number: "3/4",
      english: "Members",
      korean: "회원들",
      box: { x: 129, y: 64, width: 195, height: 64 },
    },
    curve: { x: 245, y: 16, width: 1446, height: 119 },
  },
  {
    key: "5",
    min: 5,
    max: 5,
    label: {
      number: "5",
      english: "Members",
      korean: "회원들",
      box: { x: 170, y: 263, width: 148, height: 64 },
    },
    curve: { x: 245, y: 227, width: 1446, height: 119 },
  },
  {
    key: "6",
    min: 6,
    max: 6,
    label: {
      number: "6",
      english: "Members",
      korean: "회원들",
      box: { x: 170, y: 476, width: 149, height: 64 },
    },
    curve: { x: 245, y: 438, width: 1446, height: 119 },
  },
  {
    key: "7",
    min: 7,
    max: 7,
    label: {
      number: "7",
      english: "Members",
      korean: "회원들",
      box: { x: 170, y: 696, width: 143, height: 64 },
    },
    curve: { x: 245, y: 649, width: 1446, height: 119 },
  },
  {
    key: "8+",
    min: 8,
    max: null,
    label: {
      number: "8+",
      english: "Members",
      korean: "회원들",
      box: { x: 170, y: 895, width: 186, height: 64 },
    },
    curve: { x: 245, y: 860, width: 1446, height: 119 },
  },
];
