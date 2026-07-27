import { PanelBody } from "./GenPanel";
import { TYPE_PANELS, type TypeId } from "./typePanels";

const ASSET = "/mainscreen/typepanels";

/**
 * One group-type information panel.
 *
 * Occupies the identical 323x1136 box as the standing EditorialPanel and the
 * generation panels, so showing it swaps content without moving anything. The
 * plates and fact blocks come from the shared `PanelBody`; the only thing this
 * family adds is its own heading.
 */
export default function TypePanel({ type }: { type: TypeId }) {
  const panel = TYPE_PANELS[type];

  return (
    <div className="absolute inset-0 text-white" data-type-panel={type}>
      <PanelBody assetBase={ASSET} images={panel.images} texts={panel.texts} />

      {/* Figma's "Sorting" frame. Unlike the generation heading there is no
        * numeral — just the stacked English/Korean pair, in ENG_Title and
        * KOR_Title rather than the generation ramp. The 3px/23px padding and
        * the 8px gap are the frame's own, so the block measures its authored
        * size without any of it being stated twice. */}
      <div
        className="absolute flex flex-col items-center justify-center px-[3px] py-[23px]"
        style={{ left: panel.heading.x, top: panel.heading.y }}
      >
        <div className="flex flex-col items-start gap-[8px]">
          <p className="font-satoshi text-[32px] font-medium leading-[32px] text-white whitespace-nowrap">
            {panel.heading.en}
          </p>
          {/* 38px, not `leading-normal`: the browser resolves normal to 48px
            * for Pretendard at 32px, which made the heading block 134px tall
            * against Figma's 124. Figma's own KOR_Title box is 38. */}
          <p className="font-pretendard text-[32px] font-semibold uppercase leading-[38px] text-white whitespace-nowrap">
            {panel.heading.ko}
          </p>
        </div>
      </div>
    </div>
  );
}
