export type GenerationRowConfig = {
  generation: 1 | 2 | 3 | 4 | 5;
  number: string;
  enSuffix: string;
  korean: string;
  years: string;
  /** Figma's per-row type ramp; see TimelineRowLabel["type"]. */
  type: {
    enSize: number;
    enTracking: number;
    yearsSize: number;
    yearsTracking: number;
    centred: boolean;
  };
  label: { x: number; y: number; width: number; height: number };
  curve: { x: number; y: number; width: number; height: number };
};

export const generationRows: GenerationRowConfig[] = [
  {
    generation: 1,
    number: "1",
    enSuffix: "st Gen",
    korean: "세대",
    years: "1992-2002",
    type: { enSize: 24, enTracking: 0.24, yearsSize: 20, yearsTracking: -0.2, centred: true },
    label: { x: 202, y: 64, width: 106, height: 95 },
    curve: { x: 245, y: 16, width: 1446, height: 119 },
  },
  {
    generation: 2,
    number: "2",
    enSuffix: "nd Gen",
    korean: "세대",
    years: "2003-2011",
    type: { enSize: 20, enTracking: -0.2, yearsSize: 20, yearsTracking: -0.2, centred: false },
    label: { x: 202, y: 275, width: 117, height: 95 },
    curve: { x: 245, y: 227, width: 1446, height: 119 },
  },
  {
    generation: 3,
    number: "3",
    enSuffix: "rd Gen",
    korean: "세대",
    years: "2012-2017",
    type: { enSize: 20, enTracking: -0.2, yearsSize: 22, yearsTracking: 0.22, centred: false },
    label: { x: 202, y: 486, width: 113, height: 98 },
    curve: { x: 245, y: 438, width: 1446, height: 119 },
  },
  {
    generation: 4,
    number: "4",
    enSuffix: "th Gen",
    korean: "세대",
    years: "2018-2022",
    type: { enSize: 20, enTracking: -0.2, yearsSize: 22, yearsTracking: 0.22, centred: false },
    label: { x: 202, y: 706, width: 115, height: 98 },
    curve: { x: 245, y: 649, width: 1446, height: 119 },
  },
  {
    generation: 5,
    number: "5",
    enSuffix: "th Gen",
    korean: "세대",
    years: "2023-Today",
    type: { enSize: 20, enTracking: -0.2, yearsSize: 22, yearsTracking: 0.22, centred: false },
    label: { x: 202, y: 905, width: 120, height: 98 },
    curve: { x: 245, y: 860, width: 1446, height: 119 },
  },
];
