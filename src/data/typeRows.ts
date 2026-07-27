import type { TimelineRowConfig } from "./timelineRow";

/** Row key doubles as the exact `type` value it matches. Row order is
 * literal from Figma (Co-Ed, Band, Girl Group, Boy Group, top to bottom) —
 * not a derived rule. */
export const typeRows: (TimelineRowConfig & { type: string })[] = [
  {
    key: "Co_Ed",
    type: "Co_Ed",
    label: {
      english: "Co-Ed Group",
      korean: "공동 편집 그룹",
      box: { x: 170, y: 64, width: 159, height: 64 },
    },
    curve: { x: 245, y: 16, width: 1446, height: 119 },
  },
  {
    key: "Band",
    type: "Band",
    label: {
      english: "Band",
      korean: "밴드",
      box: { x: 170, y: 298, width: 72, height: 64 },
    },
    curve: { x: 245, y: 247, width: 1446, height: 119 },
  },
  {
    key: "Girl_Group",
    type: "Girl_Group",
    label: {
      english: "Girl Group",
      korean: "걸그룹",
      box: { x: 170, y: 594, width: 126, height: 64 },
    },
    curve: { x: 245, y: 549, width: 1446, height: 119 },
  },
  {
    key: "Boy_Group",
    type: "Boy_Group",
    label: {
      english: "Boy Group",
      korean: "보이 그룹",
      box: { x: 170, y: 897, width: 129, height: 64 },
    },
    curve: { x: 245, y: 860, width: 1446, height: 119 },
  },
];
