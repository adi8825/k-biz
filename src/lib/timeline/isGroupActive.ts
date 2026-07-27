import type { Group } from "@/data/groups";
import type { FilterState } from "./filterState";

function groupValue(group: Group, category: keyof FilterState): string | null {
  switch (category) {
    case "nationality":
      return group.nationality === null ? null : String(group.nationality);
    case "language":
      return group.language;
    case "formation":
      return group.formation;
    case "status":
      return group.status === null ? null : String(group.status);
    case "type":
      return group.type;
  }
}

/** AND across categories, OR within a category. An empty category imposes
 * no restriction. Pure — never mutates `group` or `filterState`. */
export function isGroupActive(group: Group, filterState: FilterState): boolean {
  return (Object.keys(filterState) as (keyof FilterState)[]).every((category) => {
    const selected = filterState[category];
    if (selected.size === 0) return true;
    const value = groupValue(group, category);
    return value !== null && selected.has(value);
  });
}
