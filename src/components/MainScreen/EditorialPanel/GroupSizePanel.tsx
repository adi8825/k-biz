import { GROUP_SIZE_PANELS, type SizeId } from "./groupSizePanels";

const ASSET = "/mainscreen/groupsizepanels";

/** The panel slot every family shares. */
const SLOT_WIDTH = 323;
const SLOT_HEIGHT = 1136;

/**
 * One Group Size information panel.
 *
 * A single authored SVG rather than a plate-and-text registry, so this only
 * places the file — it does not rebuild the composition.
 *
 * The export is a little larger than the 323x1136 slot on every file, so it is
 * drawn at its own intrinsic size and centred on the slot, which puts the
 * bleed evenly outside on all four sides. Never scaled to the slot: stretching
 * it would distort the authored artwork.
 */
export default function GroupSizePanel({ size }: { size: SizeId }) {
  const panel = GROUP_SIZE_PANELS[size];

  return (
    <div className="absolute inset-0" data-size-panel={size}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${ASSET}/${panel.file}`}
        alt=""
        className="absolute block max-w-none"
        style={{
          left: (SLOT_WIDTH - panel.width) / 2,
          top: (SLOT_HEIGHT - panel.height) / 2,
          width: panel.width,
          height: panel.height,
        }}
      />
    </div>
  );
}
