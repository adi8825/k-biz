import raw from "../../data/groups.json";

export type GroupPosition = {
  figmaNodeId: string;
  figmaName: string;
  asset: string;
  x: number;
  y: number;
  width: number;
  height: number;
  /** True when this position couldn't be confidently tied to a single real
   * dataset record (e.g. Figma reused the same placeholder name for several
   * timeline slots). Needs manual confirmation before being treated as fact. */
  ambiguous?: boolean;
};

export type Group = {
  /** Permanent, unique, URL/filename-safe id — lowercase letters, numbers,
   * and hyphens only. Stable across renames; the preferred lookup key for
   * everything (content folders, routes, charm asset references, etc). */
  id: string;
  name: string;
  generation: 1 | 2 | 3 | 4 | 5 | null;
  debutYear: number | null;
  formation: string | null;
  language: string | null;
  memberCount: number | null;
  nationality: number | null;
  status: boolean | null;
  top10: boolean | null;
  type: string | null;
  positions: GroupPosition[];
  /** Optional until every group has been migrated — only entries that have
   * this filled in can rely on it (see content/groups/<id>/general.ts, which
   * throws rather than falling back if it's missing). */
  charm?: {
    color: string;
  };
};

export const groups: Group[] = raw as Group[];

export function getGroupById(id: string): Group | undefined {
  return groups.find((g) => g.id === id);
}

/** @deprecated Kept as a compatibility helper during the id migration.
 * Prefer `getGroupById` — display names can change, ids don't. */
export function getGroupByName(name: string): Group | undefined {
  return groups.find((g) => g.name === name);
}
