"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { useRouter } from "next/navigation";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "@/lib/canvas";
import ScaleStage from "@/components/ScaleStage";
import NavBar from "./NavBar/NavBar";
import Timeline from "./Timeline/Timeline";
import EditorialPanel from "./EditorialPanel/EditorialPanel";
import GenPanel from "./EditorialPanel/GenPanel";
import TypePanel from "./EditorialPanel/TypePanel";
import { TYPE_PANEL_IDS, type TypeId } from "./EditorialPanel/typePanels";
import GroupSizePanel from "./EditorialPanel/GroupSizePanel";
import { GROUP_SIZE_PANEL_IDS, type SizeId } from "./EditorialPanel/groupSizePanels";
import GroupDetailPanel from "@/components/GroupPage/GroupDetailPanel/GroupDetailPanel";
import AboutScreen from "./About/AboutScreen";
import { getGroupPages } from "@/content/groups";
import { clampPage, REGION_PAGE, type CharmRegion } from "@/lib/timeline/charmRegions";
import PanelCharm from "@/components/GroupPage/shared/PanelCharm";
import { isSvgPage } from "@/components/GroupPage/shared/types";
import type { GenId } from "./EditorialPanel/genPanels";
import type { SortMode } from "@/lib/timeline/sortModes";
import {
  EMPTY_FILTER_STATE,
  resetAllFilters,
  toggleFilterValue,
  type FilterCategory,
} from "@/lib/timeline/filterState";
import type { ViewMode } from "@/lib/timeline/viewMode";

const GEN_IDS: GenId[] = [1, 2, 3, 4, 5];

/** No panel transition system existed, so this matches the Timeline's own
 * restore timing (520ms ease-out) to stay in step with the charm dimming. */
const PANEL_FADE = "opacity 520ms ease-out";

/** Guided-preview timings, in ms. */
/** Which part each page lights. Page 0 is General, where Figma lights all
 * five, so it maps to null. Inverted from REGION_PAGE so the two cannot
 * disagree. */
const PAGE_REGION: Record<number, CharmRegion | null> = Object.fromEntries(
  (Object.entries(REGION_PAGE) as [CharmRegion, number][])
    .filter(([, page]) => page !== 0)
    .map(([region, page]) => [page, region]),
);

/** Guided-preview timings, in ms. */
const PREVIEW = { initialHold: 500, fadeIn: 300, fadeOut: 300, hold: 500 } as const;

/** Page-to-page crossfade. Both directions run at the same 300ms so the two
 * layers cross at the midpoint and their opacities sum to about 1 the whole
 * way — an uneven pair left the arriving page still climbing after the
 * leaving one had gone, which read as a dip. Both layers stay mounted
 * throughout, so the outgoing page is never removed mid-fade. */
function pageFade(isActive: boolean, reduced: boolean) {
  if (reduced) return "none";
  return `opacity ${isActive ? PREVIEW.fadeIn : PREVIEW.fadeOut}ms ease-out`;
}

export default function MainScreen({ onHistory }: { onHistory?: () => void } = {}) {
  const [sortMode, setSortMode] = useState<SortMode>("generation");
  const [filterState, setFilterState] = useState(EMPTY_FILTER_STATE);
  const [openFilterCategory, setOpenFilterCategory] = useState<FilterCategory | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("default");
  /* Transient preview state. Deliberately separate from sort/filter/view so a
   * hover can never persist into the Timeline's real state. */
  const [hoveredGeneration, setHoveredGeneration] = useState<number | null>(null);
  /* The same transient contract, for the Type sort mode's rows. Kept separate
   * from `hoveredGeneration` so neither preview can leak into the other. */
  const [hoveredType, setHoveredType] = useState<TypeId | null>(null);
  /* And again for the Members rows. */
  const [hoveredSize, setHoveredSize] = useState<SizeId | null>(null);
  /* Persistent, and separate again: clicking a charm sets it, clicking the
   * same charm clears it, and nothing about sort, filters or view mode is
   * touched either way. */
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  /* Which of the selected group's pages is showing. Separate state again, and
   * only ever meaningful alongside a selection. */
  const [selectedGroupPage, setSelectedGroupPage] = useState(0);
  /* Page the guided preview is showing, or null when it is not running. Kept
   * apart from `selectedGroupPage` so the preview never overwrites what the
   * reader chose. */
  const [previewPage, setPreviewPage] = useState<number | null>(null);
  /* The About screen. Independent of group selection, sort, filters and view
   * mode — opening or closing it changes nothing underneath. */
  const [aboutOpen, setAboutOpen] = useState(false);
  const previewTimers = useRef<number[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  /** The reader has taken over; the preview stops and never resumes. */
  const stopPreview = useCallback(() => {
    previewTimers.current.forEach(clearTimeout);
    previewTimers.current = [];
    setPreviewPage(null);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedGroupId(null);
    setSelectedGroupPage(0);
    stopPreview();
  }, [stopPreview]);

  /**
   * A Timeline charm was clicked. It opens a group, or closes the one that is
   * already open — nothing else. Either way the page resets, so a group never
   * reopens on a page left over from last time.
   */
  const handleToggleGroup = useCallback(
    (groupId: string) => {
      setSelectedGroupId((prev) => (prev === groupId ? null : groupId));
      setSelectedGroupPage(0);
      stopPreview();
    },
    [stopPreview],
  );

  /**
   * A part of the panel's large charm was clicked. This moves between the
   * selected group's pages and deliberately leaves `selectedGroupId` alone,
   * so navigating can never close the profile.
   */
  const handleSelectRegion = useCallback(
    (region: CharmRegion) => {
      if (selectedGroupId === null) return;
      stopPreview();
      const pageCount = getGroupPages(selectedGroupId)?.length ?? 0;
      setSelectedGroupPage(clampPage(REGION_PAGE[region], pageCount));
    },
    [selectedGroupId, stopPreview],
  );

  /* Escape leaves the group, matching the background click. */
  useEffect(() => {
    if (selectedGroupId === null && !aboutOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      /* About sits above the Timeline, so it is what Escape dismisses first. */
      if (aboutOpen) setAboutOpen(false);
      else clearSelection();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedGroupId, aboutOpen, clearSelection]);

  /**
   * Clicking empty Timeline space clears the selection. Charms stop their own
   * clicks from reaching here, and the panels and NavBar are siblings of this
   * layer rather than children, so neither can reach it either; the only
   * descendant that must be spared is a generation heading, which says so
   * with `data-keep-selection`.
   */
  const handleBackgroundClick = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      if (selectedGroupId === null) return;
      if ((event.target as HTMLElement).closest("[data-keep-selection]")) return;
      clearSelection();
    },
    [selectedGroupId, clearSelection],
  );

  /* Panel priority: selected group, then hovered generation, then the
   * standing panel. Resolving it once here — rather than per panel — is what
   * stops a generation hover from displacing an active selection. */
  const selectedPages = selectedGroupId === null ? undefined : getGroupPages(selectedGroupId);
  /* Clamped on read too, so a content edit can never strand the index. */
  const activePage = clampPage(selectedGroupPage, selectedPages?.length ?? 0);
  /* While the guided preview runs it, not the reader's selection, decides
   * which page shows. Charm and panel therefore cannot drift apart: they are
   * the same layer, so one crossfade moves both. */
  const visiblePage = previewPage ?? activePage;
  const pageCount = selectedPages?.length ?? 0;

  /* Walks General -> Nationality -> Language -> Formation -> Status -> General
   * once, when a profile opens. Keyed on the group, so changing page leaves it
   * alone and reopening plays it again. Skipped entirely under reduced motion. */
  useEffect(() => {
    if (selectedGroupId === null || pageCount < 2 || reducedMotion) return;
    let at = PREVIEW.initialHold;
    const timers: number[] = [];
    for (let page = 1; page < pageCount; page += 1) {
      timers.push(window.setTimeout(() => setPreviewPage(page), at));
      at += PREVIEW.fadeIn + PREVIEW.hold;
    }
    timers.push(window.setTimeout(() => setPreviewPage(null), at));
    previewTimers.current = timers;
    return () => {
      timers.forEach(clearTimeout);
      previewTimers.current = [];
    };
  }, [selectedGroupId, pageCount, reducedMotion]);

  const previewedGeneration = selectedGroupId === null ? hoveredGeneration : null;
  const previewedType = selectedGroupId === null ? hoveredType : null;
  const previewedSize = selectedGroupId === null ? hoveredSize : null;
  const showEditorial =
    selectedPages === undefined &&
    previewedGeneration === null &&
    previewedType === null &&
    previewedSize === null;

  /* A Type panel only exists while the Type rows do. Changing sort or view mode
   * replaces the rows outright, so the pointer never leaves the old label and
   * no `false` ever arrives — the preview is dropped here instead. */
  useEffect(() => {
    setHoveredType(null);
    setHoveredSize(null);
  }, [sortMode, viewMode]);

  /* Inside OpeningFlow the flow supplies its replay callback. On the direct
   * route there is no Opening mounted to replay, so History goes to the
   * connected experience instead — same button, client-side navigation. */
  const router = useRouter();
  const goToOpening = useCallback(() => router.push("/opening"), [router]);
  const handleHistory = onHistory ?? goToOpening;

  return (
    <ScaleStage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
      <div className="relative size-full bg-ink">
        <div className="relative" style={{ zIndex: 30 }}>
        <NavBar
          sortMode={sortMode}
          onSortModeChange={setSortMode}
          filterState={filterState}
          openFilterCategory={openFilterCategory}
          onOpenFilterCategoryChange={setOpenFilterCategory}
          onFilterValueToggle={(category, value) =>
            setFilterState((prev) => toggleFilterValue(prev, category, value))
          }
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onHistory={handleHistory}
          onAbout={() => setAboutOpen((open) => !open)}
          aboutOpen={aboutOpen}
          /* The music button's only job now. Idempotent on purpose: About is
           * where the player lives, so pressing it can open About but never
           * close it, and it adds no state of its own. */
          onOpenAbout={() => setAboutOpen(true)}
          /* Reuses the existing `resetAllFilters` helper and closes any open
           * category so the filter UI returns to its default state. Sort, view
           * mode and the hovered generation are deliberately untouched. */
          onResetFilters={() => {
            setFilterState(resetAllFilters());
            setOpenFilterCategory(null);
          }}
        />
        </div>
        {/* Wraps the Timeline only, so this click layer never sees the NavBar
          * or the panels. `inset-0` matches the stage box exactly, and it is
          * unpositioned content otherwise, so the Timeline's own absolute
          * children land on the same pixels as before. */}
        <div className="absolute inset-0" onClick={handleBackgroundClick}>
          <Timeline
            sortMode={sortMode}
            filterState={filterState}
            viewMode={viewMode}
            hoveredGeneration={hoveredGeneration}
            onHoverGeneration={setHoveredGeneration}
            hoveredType={hoveredType}
            onHoverType={setHoveredType}
            hoveredSize={hoveredSize}
            onHoverSize={setHoveredSize}
            selectedGroupId={selectedGroupId}
            selectedGroupPage={activePage}
            onToggleGroup={handleToggleGroup}
            onClearSelection={clearSelection}
          />
        </div>
        {/* Hovering a generation heading previews that generation's panel.
         * It is layered over the standing panel and driven by transient state,
         * so nothing about the panel's own design or the Timeline's state
         * changes and leaving the heading restores exactly what was showing. */}
        <div style={{ opacity: showEditorial ? 1 : 0, transition: PANEL_FADE }}>
          <EditorialPanel />
        </div>
        <div
          className="absolute"
          style={{ left: 1717, top: 8, width: 323, height: 1136, pointerEvents: "none" }}
        >
          {GEN_IDS.map((gen) => (
            <div
              key={gen}
              className="absolute inset-0"
              style={{ opacity: previewedGeneration === gen ? 1 : 0, transition: PANEL_FADE }}
            >
              <GenPanel gen={gen} />
            </div>
          ))}
          {/* The Type family sits in the same slot, on the same fade, so the
            * two previews are interchangeable and neither can shift layout. */}
          {TYPE_PANEL_IDS.map((id) => (
            <div
              key={id}
              className="absolute inset-0"
              style={{ opacity: previewedType === id ? 1 : 0, transition: PANEL_FADE }}
            >
              <TypePanel type={id} />
            </div>
          ))}
          {/* The Group Size family shares the same slot and the same fade. */}
          {GROUP_SIZE_PANEL_IDS.map((id) => (
            <div
              key={id}
              className="absolute inset-0"
              style={{ opacity: previewedSize === id ? 1 : 0, transition: PANEL_FADE }}
            >
              <GroupSizePanel size={id} />
            </div>
          ))}
        </div>
        {/* The selected group's pages. `GroupDetailPanel` places itself in the
         * same 323x1136 box at (1717, 8) as the other two, so each layer sits
         * exactly where the panel it replaces was.
         *
         * One always-mounted layer per page, opacity-only, mirroring the
         * generation panels above: a page change never unmounts this area, so
         * the outgoing page fades out under the incoming one on the same
         * PANEL_FADE that brought the group in. Only the active page takes
         * pointer events, so clicks land on what is actually visible — and
         * land inside the panel rather than falling through to the background
         * deselect. */}
        {selectedPages?.map((page, index) => (
          <div
            key={index}
            style={{
              opacity: index === visiblePage ? 1 : 0,
              transition: pageFade(index === visiblePage, reducedMotion),
              pointerEvents: index === visiblePage ? "auto" : "none",
            }}
          >
            <GroupDetailPanel
              content={page}
              onSelectRegion={handleSelectRegion}
              onCharmInteract={stopPreview}
              renderCharm={false}
            />
          </div>
        ))}
        {/* One charm for the whole panel, mounted above the page layers and
         * never remounted. A page change animates its parts' opacity; it is
         * deliberately outside the crossfading layers so it cannot flicker. */}
        {selectedPages !== undefined && (
          <div className="absolute" style={{ left: 1717, top: 8, width: 323, height: 1136 }}>
            <PanelCharm
              name={selectedPages[0]?.name ?? ""}
              activeRegion={PAGE_REGION[visiblePage] ?? null}
              onSelectRegion={handleSelectRegion}
              onInteract={stopPreview}
              reducedMotion={reducedMotion}
              partsBase={selectedPages[0]?.charmPartsBase}
              /* A group authored as pre-rendered charm states supplies those
               * instead of sliced parts; the dimming is already in the art. */
              charmStatesBase={
                selectedPages[0] !== undefined && isSvgPage(selectedPages[0])
                  ? selectedPages[0].charmStatesBase
                  : undefined
              }
            />
          </div>
        )}
        <AboutScreen open={aboutOpen} />
      </div>
    </ScaleStage>
  );
}
