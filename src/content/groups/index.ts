import type { GroupGeneralContent } from "@/components/GroupPage/shared/types";
import { content as bts } from "./bts/general";
import { content as btsNationality } from "./bts/nationality";
import { content as btsLanguage } from "./bts/language";
import { content as btsFormation } from "./bts/formation";
import { content as btsStatus } from "./bts/status";
import { content as newjeans } from "./newjeans/general";
import { content as njNationality } from "./newjeans/nationality";
import { content as njLanguage } from "./newjeans/language";
import { content as njFormation } from "./newjeans/formation";
import { content as njStatus } from "./newjeans/status";
import { content as nct } from "./nct/general";
import { content as nctNationality } from "./nct/nationality";
import { content as nctLanguage } from "./nct/language";
import { content as nctFormation } from "./nct/formation";
import { content as nctStatus } from "./nct/status";

/**
 * Authored panel pages, keyed by the group id in `groups.json`.
 *
 * A group's panel cannot be derived from the dataset — `nameKo`, `heroPhoto`
 * and the whole `elements` composition are transcribed per group from Figma
 * and have no field in `groups.json`. So this registry is the list of groups
 * whose panel actually exists, and it is deliberately partial: adding a group
 * means adding its `content/groups/<id>/general.ts` and one line here, with
 * no change to the Timeline or the selection logic.
 *
 * Each entry is an ordered list of pages, and each page is one
 * `GroupGeneralContent` rendered through the existing `GroupDetailPanel` —
 * a second page is a second authored content file, not a new component. BTS
 * and NewJeans have one page each today; nothing here fabricates a second.
 */
/**
 * Page order is fixed and meaningful: it is what the charm regions index
 * into. `[General, Nationality, Language, Formation, Status]` matches the
 * associations the Opening already teaches — the charm's language part is
 * "most of their songs are in Korean", the flower is "formed by a Company",
 * the pearl is "they are Active" — and the tag, the group's name, is page 0.
 */
export const GROUP_CONTENT: Record<string, GroupGeneralContent[]> = {
  bts: [bts, btsNationality, btsLanguage, btsFormation, btsStatus],
  newjeans: [newjeans, njNationality, njLanguage, njFormation, njStatus],
  nct: [nct, nctNationality, nctLanguage, nctFormation, nctStatus],
};

export function getGroupPages(id: string): GroupGeneralContent[] | undefined {
  return GROUP_CONTENT[id];
}
