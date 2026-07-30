import AuthoredSvgPanel, { SLOT_HEIGHT, SLOT_WIDTH } from "./AuthoredSvgPanel";
import { GROUP_SIZE_PANELS, type SizeId } from "./groupSizePanels";

const ASSET = "/mainscreen/groupsizepanels";

/**
 * One Group Size information panel.
 *
 * A single authored SVG rather than a plate-and-text registry, so this only
 * places the file — it does not rebuild the composition. The placement itself
 * now lives in the shared `AuthoredSvgPanel`, which the Nationality family uses
 * too; the position below is unchanged and still belongs to this family.
 *
 * The export is a little larger than the 323x1136 slot on every file, so it is
 * drawn at its own intrinsic size and centred on the slot, which puts the
 * bleed evenly outside on all four sides. Never scaled to the slot: stretching
 * it would distort the authored artwork.
 */
export default function GroupSizePanel({ size }: { size: SizeId }) {
  const panel = GROUP_SIZE_PANELS[size];

  return (
    <AuthoredSvgPanel
      src={`${ASSET}/${panel.file}`}
      width={panel.width}
      height={panel.height}
      left={(SLOT_WIDTH - panel.width) / 2}
      top={(SLOT_HEIGHT - panel.height) / 2}
      marker={{ "data-size-panel": size }}
    />
  );
}
