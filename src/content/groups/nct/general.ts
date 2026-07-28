import { getGroupById } from "@/data/groups";
import type { GroupGeneralContent } from "@/components/GroupPage/shared/types";

const ASSET = "/groups/nct/general";

const group = getGroupById("nct");
if (!group) {
  throw new Error('"nct" not found in groups.json');
}
const charmAsset = group.positions[0]?.asset;
if (!charmAsset) {
  throw new Error('"nct" has no charm position/asset in groups.json');
}
/* groups.json carries no `charm.color` for NCT, and this task does not change
 * that file, so the accent is read from the group's own authored charm — the
 * stroke of /charms/NCT.svg. BTS's charm.color (#c97dff) is exactly its SVG
 * stroke, so this is the same value from the same source, not a new one. */
const koColor = group.charm?.color ?? "#ff9a3d";

/**
 * General page for NCT — transcribed from the Figma
 * "Group_Panel/NCT" frame (1180:112906).
 *
 * Same shape as the BTS and NewJeans pages: the header renders the name,
 * the hero photo and the debut badge, and everything else is a flat
 * list of authored elements at their Figma coordinates.
 */
export const content: GroupGeneralContent = {
  name: group.name,
  debutYear: String(group.debutYear ?? "—"),
  charmAsset,
  koColor,
  charmPartsBase: "/groups/nct/charm/parts",

  nameKo: "엔시티",
  heroPhoto: `${ASSET}/p01.png`,

  elements: [
    { type: "image", src: `${ASSET}/p02.png`, x: 169, y: 216, width: 154, height: 64 },
    { type: "text", lang: "en", text: "Official Fan Club Is Named NCTzen By Members", x: 169, y: 298, width: 155, height: 60 },
    { type: "text", lang: "ko", text: "공식 팬클럽, 회원들에 의해 NCTzen으로 선정됨", x: 168, y: 388, width: 140, height: 51 },
    { type: "image", src: `${ASSET}/p03.png`, x: 169, y: 456, width: 155.5, height: 144 },
    { type: "image", src: `${ASSET}/p04.png`, x: 257, y: 456, width: 66, height: 64 },
    { type: "text", lang: "en", text: "The Group Features Multiple Specialized Sub Units", x: 176, y: 617, width: 137, height: 60 },
    { type: "image", src: `${ASSET}/p06.png`, x: 0, y: 696, width: 241, height: 144 },
    { type: "text", lang: "ko", text: "그룹에는 여러 개의 특수 하위 유닛이 있습니다", x: 174, y: 710, width: 140, height: 34 },
    { type: "image", src: `${ASSET}/p05.png`, x: 257, y: 776, width: 66, height: 64 },
    { type: "image", src: `${ASSET}/p07.png`, x: 0, y: 856, width: 65, height: 144 },
    { type: "text", lang: "en", text: "NCT U Operates With A Rotating Member Lineup", x: 95, y: 869, width: 215, height: 40 },
    { type: "text", lang: "ko", text: "NCT U, 순환 멤버 라인업으로 운영", x: 94, y: 964, width: 200, height: 17 },
    { type: "image", src: `${ASSET}/p08.png`, x: 169, y: 1016, width: 154, height: 120 },
    { type: "text", lang: "en", text: "Number 127 Represents The Longitude Of Seoul", x: 6, y: 1017, width: 155, height: 60 },
    { type: "text", lang: "ko", text: "숫자 127은 서울의 경도를 나타냅니다", x: 16, y: 1109, width: 287, height: 17 },
  ],
};
