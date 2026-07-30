import AuthoredSvgPanel, { SLOT_HEIGHT } from "./AuthoredSvgPanel";
import { NATIONALITY_PANELS, type NationalityId } from "./nationalityPanels";

const ASSET = "/mainscreen/nationalitypanels";

/** Every panel asset in the project is exported 1px proud of its node box. */
const BLEED = 1;

/**
 * One Nationality information panel.
 *
 * A single authored SVG placed through the shared `AuthoredSvgPanel`, so it
 * renders in the same slot, at intrinsic size, with the same never-scaled
 * treatment as the Group Size family.
 *
 * Horizontally it is aligned by its ink rather than by its canvas: the exports
 * carry differing amounts of empty canvas on the left, so centring them would
 * push the artwork off the slot by up to 5px on the widest file. Offsetting by
 * `inkX` lands every panel's ink on the slot with the project's usual 1px
 * bleed. Vertically the canvas is already the slot's own height, so the top
 * needs only that same bleed — the empty band at the top of the artwork is
 * authored, not padding, and must not be closed up.
 */
export default function NationalityPanel({ nationality }: { nationality: NationalityId }) {
  const panel = NATIONALITY_PANELS[nationality];

  return (
    <AuthoredSvgPanel
      src={`${ASSET}/${panel.file}`}
      width={panel.width}
      height={panel.height}
      left={-BLEED - panel.inkX}
      /* Centred on the slot's own height, which absorbs the 1-2px each export
       * differs by instead of pinning one edge and letting the other drift. */
      top={(SLOT_HEIGHT - panel.height) / 2}
      marker={{ "data-nationality-panel": nationality }}
    />
  );
}
