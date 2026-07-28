import GroupTitle from "../shared/GroupTitle";
import PanelCharm from "../shared/PanelCharm";
import type { CharmRegion } from "@/lib/timeline/charmRegions";
import StatBadge from "../shared/StatBadge";
import EditorialCanvas from "../shared/EditorialCanvas";
import { isSvgPage, type GroupPanelPage, type GroupSvgPage } from "../shared/types";

/** The slot every panel family shares. */
const SLOT = { left: 1717, top: 8, width: 323, height: 1136 } as const;

/** Every panel asset in the project is exported 1px proud of its node box. */
const BLEED = 1;

type GroupDetailPanelProps = {
  content: GroupPanelPage;
  /** Supplied on the Timeline, where the panel's charm chooses the page. */
  onSelectRegion?: (region: CharmRegion) => void;
  /** Called when the reader touches the charm, so the guided preview stops. */
  onCharmInteract?: () => void;
  /** False where the charm is hoisted above the page layers, so a page change
   * cannot crossfade it. The Timeline does this; /group does not. */
  renderCharm?: boolean;
};

/**
 * "General" panel variant. The fixed header (name, hero image, debut info,
 * charm) has the same structure and position for every group — only its
 * content changes. The editorial elements below share the same panel-local
 * coordinate space as the header and can be positioned anywhere, including
 * beside or behind the charm; a different `content.elements` array is a
 * different composition, with no new component required.
 */
export default function GroupDetailPanel({ content, onSelectRegion, onCharmInteract, renderCharm = true }: GroupDetailPanelProps) {
  if (isSvgPage(content)) {
    return (
      <SvgPanelPage
        page={content}
        onSelectRegion={onSelectRegion}
        onCharmInteract={onCharmInteract}
        renderCharm={renderCharm}
      />
    );
  }

  const { name, nameKo, koColor, charmAsset, debutYear, heroPhoto, elements, heading } = content;

  /* Category pages carry their own header: the same three slots, but the
   * title and hero sit a few pixels over and the badge slot holds the
   * category name instead of the debut year. Measured from the Figma
   * Group/{Nationality,Language,Formation,Status} frames. */
  const isCategory = heading !== undefined;

  return (
    <div
      className="absolute font-satoshi text-white"
      style={{ left: 1717, top: 8, width: 323, height: 1136 }}
    >
      {/* Fixed header — same structure/position for every group */}
      <GroupTitle
        name={name}
        nameKo={nameKo}
        koColor={koColor}
        /* Figma: Main_Title sits at (3, 17) on General and (-1, 17) on the
         * category pages. */
        style={isCategory ? { left: -1, top: 17, width: 148 } : { left: 3, top: 17, width: 148 }}
      />

      <div
        className="absolute"
        style={
          isCategory
            ? { left: 168, top: 0, width: 155, height: 120 }
            : { left: 172, top: 0, width: 152, height: 127 }
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroPhoto} alt="" className="size-full" />
      </div>

      {heading ? (
        <div className="absolute" style={{ left: 169, top: 135, width: 154 }}>
          <p className="text-[32px] font-medium leading-[32px] whitespace-nowrap">{heading.en}</p>
          <p className="font-pretendard text-[32px] font-medium leading-[32px] whitespace-nowrap">
            {heading.ko}
          </p>
        </div>
      ) : (
        <StatBadge labelEn="Debut" labelKo="데뷔" value={debutYear} style={{ left: 177, top: 130 }} />
      )}

      {renderCharm && (
        <PanelCharm name={name} activeRegion={null} onSelectRegion={onSelectRegion} onInteract={onCharmInteract} />
      )}

      {/* Flexible editorial composition — shares this same coordinate space */}
      <EditorialCanvas elements={elements} />
    </div>
  );
}

/**
 * A page that arrives as one finished SVG.
 *
 * Deliberately thin: it places the artwork and nothing else. The header, the
 * composition, the outlined type and the charm are all already drawn in the
 * file, so re-rendering any of them here would double them.
 *
 * The image is drawn at its own intrinsic size — never fitted to the slot —
 * because Figma exports each page at the union of its content bounds, so the
 * files differ in size and any fitting would silently rescale the artwork.
 * Instead the ink is offset onto the slot, which leaves the authored scale,
 * crop and aspect ratio exactly as exported. The surplus canvas around the ink
 * is transparent padding; it extends past the slot, where the stage's own
 * `overflow: hidden` clips it.
 *
 * The artwork leaves the charm slot empty, the same way every other group's
 * page does, so the charm is still drawn by `PanelCharm` over the top — there
 * is no second charm to collide with. For KATSEYE that charm arrives as five
 * pre-rendered states rather than five sliced parts, which `PanelCharm`
 * handles; nothing about this page differs because of it.
 */
function SvgPanelPage({
  page,
  onSelectRegion,
  onCharmInteract,
  renderCharm,
}: {
  page: GroupSvgPage;
  onSelectRegion?: (region: CharmRegion) => void;
  onCharmInteract?: () => void;
  renderCharm: boolean;
}) {
  return (
    <div className="absolute font-satoshi text-white" style={SLOT}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={page.svg}
        alt=""
        /* Not interactive: the panel's own box stays the hit area, so a click
         * inside the panel behaves exactly as it does for every other group
         * and one landing in the transparent surplus is not swallowed. */
        className="pointer-events-none absolute block max-w-none"
        style={{
          left: -BLEED - page.inkX,
          top: -BLEED - page.inkY,
          width: page.width,
          height: page.height,
        }}
      />
      {renderCharm && (
        <PanelCharm
          name={page.name}
          activeRegion={null}
          onSelectRegion={onSelectRegion}
          onInteract={onCharmInteract}
          charmStatesBase={page.charmStatesBase}
        />
      )}
    </div>
  );
}
