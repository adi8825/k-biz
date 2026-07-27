import type { Group, GroupPosition } from "@/data/groups";
import { generationRows } from "@/data/generations";
import { distributeAlongCurve } from "./distributeAlongCurve";
import type { SortMode, TimelineRow } from "./sortModes";

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

/**
 * How each sort mode orders groups *within* a Top 10 row.
 *
 * In Default mode a sort re-buckets the rows themselves — Nationality builds
 * "All Korean / Mostly Korean / ...", Type builds "Co-Ed / Band / Girl / Boy".
 * Top 10 cannot do that: its five rows are the generations, and moving a group
 * between them would break the authored selection. So here the same fields
 * decide the order along the row instead, following the top-to-bottom order
 * Figma gives those rows so the two modes read the same way:
 *
 *   nationality  100, 75, 50, 25, 0        (descending)
 *   type         Co-Ed, Band, Girl, Boy    (Figma's literal row order)
 *   memberCount  3/4, 5, 6, 7, 8+          (ascending)
 *
 * `generation` keeps the dataset order, which is already Figma's curated
 * MainScreen/top10 order — so the default Top 10 view is byte-identical to
 * what it was before sorting was connected.
 */
const TYPE_RANK: Record<string, number> = {
  Co_Ed: 0,
  Band: 1,
  Girl_Group: 2,
  Boy_Group: 3,
};

function sortKey(mode: SortMode, group: Group): number {
  switch (mode) {
    case "nationality":
      return -(group.nationality ?? -1);
    case "type":
      return group.type === null ? Number.MAX_SAFE_INTEGER : (TYPE_RANK[group.type] ?? Number.MAX_SAFE_INTEGER);
    case "memberCount":
      return group.memberCount ?? 0;
    case "generation":
      return 0;
  }
}

export function getTop10Rows(groups: Group[], sortMode: SortMode = "generation"): TimelineRow[] {
  return generationRows.map((row) => {
    // Dataset order is kept as-is — it already matches the order Figma's
    // MainScreen/top10 lays the charms out in. Re-sorting by debut year is
    // wrong here: it reshuffles same-year groups away from the curated order.
    const members = groups.filter((g) => g.generation === row.generation && g.top10);

    /* Membership is decided before this and is never touched: the same groups
     * go in and come out, only their order along the row changes. The slots
     * below are computed from that unchanged count, so the authored spacing
     * holds and the sorted groups simply occupy the existing positions in
     * their new order. `sort` is stable in every engine this targets, so equal
     * keys keep Figma's curated order as the tiebreak. */
    const ordered =
      sortMode === "generation"
        ? members
        : [...members].sort((a, b) => sortKey(sortMode, a) - sortKey(sortMode, b));

    const positions = distributeAlongCurve(members.length, row.curve, TOP10_SPAN);

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
