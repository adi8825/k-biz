"use client";

import { useEffect } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { getGroupById, groups, type GroupPosition } from "@/data/groups";
import { getTimelineRows, type SortMode } from "@/lib/timeline/sortModes";
import { getTop10Rows } from "@/lib/timeline/top10";
import { isGroupActive } from "@/lib/timeline/isGroupActive";
import { EMPTY_FILTER_STATE, type FilterState } from "@/lib/timeline/filterState";
import type { ViewMode } from "@/lib/timeline/viewMode";
import type { CharmRegion } from "@/lib/timeline/charmRegions";
import { getGroupPages } from "@/content/groups";
import CurveLine from "./CurveLine";
import RowLabel from "./RowLabel";
import Charm from "./Charm";

/** Rows are only generations in the generation-based layouts; in the other
 * sort modes a row is a nationality or a size band and has no generation to
 * preview. */
function generationOfRow(row: { config: { key: string; label: { variant?: string } } }): number | null {
  if (row.config.label.variant !== "generation") return null;
  const n = Number(row.config.key);
  return Number.isFinite(n) ? n : null;
}

export default function Timeline({
  sortMode = "generation",
  filterState = EMPTY_FILTER_STATE,
  viewMode = "default",
  hoveredGeneration = null,
  onHoverGeneration,
  selectedGroupId = null,
  selectedGroupPage = 0,
  onToggleGroup,
  onClearSelection,
}: {
  sortMode?: SortMode;
  filterState?: FilterState;
  viewMode?: ViewMode;
  /** Transient preview only — never written into the Timeline's own state, so
   * leaving the heading restores whatever was showing before. */
  hoveredGeneration?: number | null;
  onHoverGeneration?: (generation: number | null) => void;
  /** Persistent, unlike `hoveredGeneration`: it survives pointer leave and is
   * cleared only by clicking the same charm again, or by the group dropping
   * out of play. */
  selectedGroupId?: string | null;
  /** Which information page the selected group is showing. */
  selectedGroupPage?: number;
  /** A charm was clicked or keyed: open this group, or close it if already
   * open. Page navigation is the panel charm's job, not this one's. */
  onToggleGroup?: (groupId: string) => void;
  onClearSelection?: () => void;
}) {
  const isTop10 = viewMode === "top10";
  // Top 10 is a view of the generation timeline, so it takes precedence over
  // the sort selection while leaving that selection untouched.
  const rows = isTop10 ? getTop10Rows(groups) : getTimelineRows(sortMode, groups);
  // Groups hidden by Top 10 keep a position so they can fade out where they
  // already are, rather than jumping before disappearing.
  const fallbackRows = isTop10 ? getTimelineRows("generation", groups) : rows;

  // The active layout is flattened into a lookup rather than rendered in row
  // order. Charms are then emitted in a fixed dataset order, so the charm DOM
  // is never reordered by a sort change — React only updates each element's
  // animated position. Rendering in row order instead caused ~123 of 124
  // `insertBefore` moves per switch, which cancelled the in-flight animations
  // and made the charms snap.
  const positionByGroupId = new Map<string, GroupPosition>();
  for (const row of fallbackRows) {
    for (const item of row.items) {
      positionByGroupId.set(item.group.id, item.position);
    }
  }
  // Groups present in the active view override the fallback and stay visible.
  const visibleGroupIds = new Set<string>();
  for (const row of rows) {
    for (const item of row.items) {
      positionByGroupId.set(item.group.id, item.position);
      /* Top 10 shows the intersection of the authored selection and the active
       * filters. An excluded charm leaves the view exactly the way a
       * non-top-10 charm already does, rather than sitting in the row greyed
       * out — in a ten-charm row a grey charm still reads as present, which is
       * why filtering looked like it was not applying here. The position is
       * still recorded above, so it fades out where it stands.
       *
       * Default mode is untouched and keeps its authored dimming. The same
       * `isGroupActive` decides both, so there is no second filter rule. */
      if (!isTop10 || isGroupActive(item.group, filterState)) {
        visibleGroupIds.add(item.group.id);
      }
    }
  }

  /* A filter or a view-mode switch can take the selected group out of play
   * after the fact. Rather than leaving a panel up for a charm that can no
   * longer be interacted with, the selection drops itself and the panel and
   * opacity fall back to whatever they would otherwise be. */
  const selectedGroup = selectedGroupId === null ? undefined : getGroupById(selectedGroupId);
  const selectionStillInPlay =
    selectedGroupId === null ||
    (selectedGroup !== undefined &&
      visibleGroupIds.has(selectedGroupId) &&
      isGroupActive(selectedGroup, filterState));

  useEffect(() => {
    if (!selectionStillInPlay) onClearSelection?.();
  }, [selectionStillInPlay, onClearSelection]);

  return (
    <MotionConfig reducedMotion="user">
      {/* Strings and labels are keyed by row index: shared rows keep their
       * element and travel, only a surplus row enters/leaves. */}
      <AnimatePresence initial={false}>
        {rows.map((row, i) => (
          <CurveLine
            key={`curve-${i}`}
            curve={row.config.curve}
            dimmed={hoveredGeneration !== null && generationOfRow(row) !== hoveredGeneration}
          />
        ))}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {rows.map((row, i) => {
          const generation = generationOfRow(row);
          return (
            <RowLabel
              key={`label-${i}`}
              label={row.config.label}
              dimmed={hoveredGeneration !== null && generation !== hoveredGeneration}
              onHover={
                generation !== null && onHoverGeneration
                  ? (entering) => onHoverGeneration(entering ? generation : null)
                  : undefined
              }
            />
          );
        })}
      </AnimatePresence>
      {groups.map((group) => {
        const position = positionByGroupId.get(group.id);
        if (!position) return null;
        const visible = visibleGroupIds.has(group.id);
        const inPlay = visible && isGroupActive(group, filterState);
        const selected = group.id === selectedGroupId;
        /* Opacity priority: a selection lights exactly one charm and dims the
         * rest. With no selection, hovering a generation narrows the existing
         * active set rather than replacing it, so any filter keeps applying
         * underneath the preview. */
        const active =
          selectedGroupId !== null
            ? group.id === selectedGroupId
            : isGroupActive(group, filterState) &&
              (hoveredGeneration === null || group.generation === hoveredGeneration);
        return (
          <Charm
            key={group.id}
            name={group.name}
            position={position}
            active={active}
            visible={visible}
            selected={selected}
            selectable={inPlay}
            pageCount={getGroupPages(group.id)?.length ?? 0}
            currentPage={selected ? selectedGroupPage : 0}
            onToggle={onToggleGroup ? () => onToggleGroup(group.id) : undefined}
          />
        );
      })}
    </MotionConfig>
  );
}
