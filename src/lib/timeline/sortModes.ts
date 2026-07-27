import type { Group, GroupPosition } from "@/data/groups";
import { generationRows } from "@/data/generations";
import { nationalityRows } from "@/data/nationalityRows";
import { typeRows } from "@/data/typeRows";
import { memberCountRows } from "@/data/memberCountRows";
import type { TimelineRowConfig } from "@/data/timelineRow";
import { distributeAlongCurve } from "./distributeAlongCurve";
import { charmTopOnCurve } from "./curveGeometry";

export type SortMode = "generation" | "nationality" | "type" | "memberCount";

export type TimelineRow = {
  config: TimelineRowConfig;
  items: { group: Group; position: GroupPosition }[];
};

const CHARM_WIDTH = 38.31;
const CHARM_HEIGHT = 160;

function orderGroups(groups: Group[]): Group[] {
  return [...groups].sort((a, b) => {
    const yearDiff = (a.debutYear ?? 0) - (b.debutYear ?? 0);
    if (yearDiff !== 0) return yearDiff;
    return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
  });
}

function buildComputedRow(
  config: TimelineRowConfig,
  bucketGroups: Group[],
): TimelineRow {
  const ordered = orderGroups(bucketGroups);
  const positions = distributeAlongCurve(ordered.length, config.curve);
  return {
    config,
    items: ordered.map((group, i) => ({
      group,
      position: {
        figmaNodeId: `${config.key}-${group.id}`,
        figmaName: group.name,
        asset: group.positions[0].asset,
        x: positions[i].x,
        y: positions[i].y,
        width: CHARM_WIDTH,
        height: CHARM_HEIGHT,
      },
    })),
  };
}

export function getTimelineRows(mode: SortMode, groups: Group[]): TimelineRow[] {
  switch (mode) {
    case "generation":
      return generationRows.map((row) => ({
        config: {
          key: String(row.generation),
          label: {
            variant: "generation",
            number: row.number,
            english: row.enSuffix,
            korean: row.korean,
            years: row.years,
            type: row.type,
            box: row.label,
          },
          curve: row.curve,
        },
        // Generation keeps Figma's hand-placed x (it encodes debut order), but
        // takes its y from the same shared curve anchor as every other mode so
        // the loop hangs on the line rather than a few px below it.
        items: groups
          .filter((g) => g.generation === row.generation)
          .map((group) => {
            const position = group.positions[0];
            return {
              group,
              position: {
                ...position,
                y: charmTopOnCurve(
                  position.x + position.width / 2,
                  position.height,
                  row.curve,
                ),
              },
            };
          }),
      }));

    case "nationality":
      return nationalityRows.map((row) =>
        buildComputedRow(
          row,
          groups.filter((g) => g.nationality === row.nationality),
        ),
      );

    case "type":
      return typeRows.map((row) =>
        buildComputedRow(
          row,
          groups.filter((g) => g.type === row.type),
        ),
      );

    case "memberCount":
      return memberCountRows.map((row) =>
        buildComputedRow(
          row,
          groups.filter((g) => {
            const count = g.memberCount ?? 0;
            return count >= row.min && (row.max === null || count <= row.max);
          }),
        ),
      );
  }
}
