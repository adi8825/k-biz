import type { Group, GroupPosition } from "@/data/groups";
import { generationRows } from "@/data/generations";
import { distributeAlongCurve } from "./distributeAlongCurve";
import type { TimelineRow } from "./sortModes";

/**
 * Top 10 is an alternative view of the *default* timeline, not a global
 * ranking: the five strings and five generation labels are unchanged, and each
 * generation simply shows only the groups the dataset already flags as that
 * generation's top 10 (`group.top10`). Nothing here computes or infers a
 * ranking.
 *
 * The charms spread across the generation timeline's own extent rather than
 * the narrower sort span — measured from Figma's MainScreen/top10 frame, where
 * every generation's ten charms run from x=367 to x=1663.
 */
const TOP10_SPAN: [number, number] = [0.097618, 0.993192];

const CHARM_WIDTH = 38.31;
const CHARM_HEIGHT = 160;

export function getTop10Rows(groups: Group[]): TimelineRow[] {
  return generationRows.map((row) => {
    // Dataset order is kept as-is — it already matches the order Figma's
    // MainScreen/top10 lays the charms out in. Re-sorting by debut year is
    // wrong here: it reshuffles same-year groups away from the curated order.
    const ordered = groups.filter((g) => g.generation === row.generation && g.top10);

    const positions = distributeAlongCurve(ordered.length, row.curve, TOP10_SPAN);

    return {
      config: {
        key: String(row.generation),
        label: {
          variant: "generation" as const,
          number: row.number,
          english: row.enSuffix,
          korean: row.korean,
          years: row.years,
          type: row.type,
          box: row.label,
        },
        curve: row.curve,
      },
      items: ordered.map((group, i) => ({
        group,
        position: {
          ...group.positions[0],
          x: positions[i].x,
          y: positions[i].y,
          width: CHARM_WIDTH,
          height: CHARM_HEIGHT,
        } satisfies GroupPosition,
      })),
    };
  });
}
