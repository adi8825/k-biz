"use client";

import { useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import type { GroupPosition } from "@/data/groups";
import { POSITION_TRANSITION } from "./transitions";
import { SWAY_ANIMATION, swayStyle } from "@/lib/timeline/sway";

/**
 * Charms are rendered in a fixed dataset order and never reordered in the DOM
 * (see Timeline). Their place on screen comes purely from this transform, which
 * Framer Motion drives — so a sort change is a value change, not a DOM move.
 *
 * `initial={false}` keeps the first paint static: charms appear at their
 * position rather than flying in from the origin on page load.
 */
export default function Charm({
  name,
  position,
  active = true,
  visible = true,
  selected = false,
  selectable = true,
  pageCount = 0,
  currentPage = 0,
  onToggle,
}: {
  name: string;
  position: GroupPosition;
  active?: boolean;
  /** False in views that show a subset (Top 10). The charm stays mounted and
   * keeps its identity — it only fades out — so returning restores it without
   * a remount. */
  visible?: boolean;
  /** This group is the current Timeline selection. */
  selected?: boolean;
  /** False once a filter or view mode has taken the group out of play. The
   * charm still renders and still sways on hover; it just stops being an
   * offer, so it leaves the tab order and clicks do nothing. */
  selectable?: boolean;
  /** Authored information pages this group has. 0 when none exist yet. */
  pageCount?: number;
  /** Which of those pages is showing, while this charm is the selection. */
  currentPage?: number;
  /** Select this group, or clear it if it is already the selection. */
  onToggle?: () => void;
}) {
  const [swaying, setSwaying] = useState(false);

  /**
   * Selection only. The Timeline charm opens and closes a group and does
   * nothing else — page navigation belongs to the large charm inside the
   * panel, which is the control the design puts it on.
   */
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    /* Keeps the click from reaching the Timeline background, whose job is to
     * clear the selection. */
    event.stopPropagation();
    if (!selectable) return;
    onToggle?.();
  };

  return (
    /* A button rather than a div so selection is real to the keyboard and to
     * assistive tech: Enter and Space come free, and `aria-pressed` says which
     * charm is chosen. It wraps the sway layer instead of sitting inside it,
     * so the whole charm is the hit area and there is nothing nested for a
     * screen reader to trip over. The reset keeps the box identical to the
     * div it replaced. */
    <motion.button
      type="button"
      className="charm-dim absolute left-0 top-0 cursor-pointer border-0 bg-transparent p-0"
      // Drives the directional opacity transition in globals.css — fading out
      // is gentler than coming back.
      data-inactive={!active || !visible}
      style={{
        width: position.width,
        height: position.height,
        opacity: visible ? (active ? 1 : 0.15) : 0,
        filter: active ? undefined : "grayscale(1)",
        pointerEvents: visible ? undefined : "none",
      }}
      initial={false}
      animate={{ x: position.x, y: position.y }}
      transition={POSITION_TRANSITION}
      title={position.ambiguous ? `${name} (unconfirmed position)` : name}
      aria-label={name}
      aria-pressed={selected}
      /* Says which page is showing without touching the label, so the charm
       * still announces as its group and not as a paging widget. */
      aria-description={
        selected && pageCount > 0
          ? `${name} selected, information page ${currentPage + 1} of ${pageCount}`
          : undefined
      }
      /* Not `disabled`: that would suppress mouse events across the whole
       * subtree and take the hover sway with it. */
      aria-disabled={selectable ? undefined : true}
      tabIndex={selectable ? undefined : -1}
      onClick={handleClick}
    >
      {/* Inner layer so the sway can own `transform` outright -- the wrapper's
       * transform is Framer's position animation, and one element cannot carry
       * both. Rotation pivots from the top loop, so the charm hangs rather
       * than spins.
       *
       * The pointer starts a single cycle. Entering again while one is already
       * running is a no-op, so moving around inside the charm never restarts
       * it; and the cycle is only cleared when it reports itself finished, so
       * leaving early lets the swing decay instead of cutting it. Once it has
       * ended, the next hover starts a fresh one. */}
      <div
        className="charm-sway size-full"
        data-swaying={swaying}
        style={swayStyle(name)}
        onMouseEnter={() => setSwaying(true)}
        onAnimationEnd={(event) => {
          if (event.animationName === SWAY_ANIMATION) setSwaying(false);
        }}
      >
        {/* `object-fill` maps the charm viewBox linearly onto the box. With the
         * default `meet` fit the 39x161 and 38x161 assets letterbox by different
         * amounts, which would shift their loop centres apart by ~0.8px. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={position.asset} alt="" className="size-full object-fill" draggable={false} />
      </div>
    </motion.button>
  );
}
