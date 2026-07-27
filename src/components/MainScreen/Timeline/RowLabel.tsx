"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { TimelineRowLabel } from "@/data/timelineRow";
import {
  POSITION_TRANSITION,
  EXIT_FADE,
  LABEL_TEXT_FADE,
  DIM_FADE,
  UNDIM_FADE,
  DIMMED_OPACITY,
} from "./transitions";

/**
 * Sort-screen title treatment (MainScreen/Sort/Nationality, /Type,
 * /NumberOfMembers). Uses Figma's named styles verbatim:
 *   Total_Number : Satoshi Regular 40 / line-height 48 / tracking 0
 *   ENG_2H       : Satoshi Regular 24 / line-height 24 / tracking 0
 *   KOR_2H       : Pretendard Light 24 / line-height 24 / tracking 0
 * Each of the English/Korean lines sits in a 32px-tall box with no gap
 * between them, matching the Figma "Title" auto-layout.
 */
function SortTitle({ number, english, korean }: TimelineRowLabel) {
  return (
    <div className="flex items-center">
      {number && (
        <div className="flex items-center justify-center">
          <p className="font-satoshi text-[40px] font-normal uppercase leading-[48px] tracking-[0px] text-white whitespace-nowrap">
            {number}
          </p>
        </div>
      )}
      <div className="flex flex-col items-start px-[8px]">
        <div className="flex h-[32px] w-full items-center justify-center">
          <p className="font-satoshi text-[24px] font-normal leading-[24px] tracking-[0px] text-white whitespace-nowrap">
            {english}
          </p>
        </div>
        <div className="flex h-[32px] items-center justify-center">
          <p className="font-pretendard text-[24px] font-light uppercase leading-[24px] tracking-[0px] text-white whitespace-nowrap">
            {korean}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Satoshi's "Auto" line height as Figma resolves it: 4/3 of the size, rounded
 * up (24 -> 32, 22 -> 30, 20 -> 27). The browser resolves `normal` to 1.5 for
 * this webfont, which made every generation label 3px too tall and pushed the
 * number and the year range off their authored rows.
 */
function satoshiAutoLeading(size: number): number {
  return Math.ceil((size * 4) / 3);
}

/** Figma's ramp where a row does not state its own; matches the 1st Gen row. */
const GEN_TYPE_FALLBACK = {
  enSize: 24,
  enTracking: 0.24,
  yearsSize: 20,
  yearsTracking: -0.2,
  centred: true,
} as const;

/**
 * MainScreen default generation label.
 *
 * The suffix and year sizes come from the row rather than being fixed here:
 * Figma sets them per generation (see `TimelineRowLabel["type"]`).
 */
function GenerationTitle({ number, english, korean, years, type }: TimelineRowLabel) {
  const t = type ?? GEN_TYPE_FALLBACK;
  return (
    <>
      <div className="flex items-center">
        {number && (
          <p className="font-satoshi text-[64px] font-light uppercase leading-[64px] tracking-[0.64px] text-white">
            {number}
          </p>
        )}
        <div className="flex flex-col items-start px-[8px]">
          <p
            className="font-satoshi text-white whitespace-nowrap"
            style={{
              fontSize: t.enSize,
              letterSpacing: t.enTracking,
              lineHeight: `${satoshiAutoLeading(t.enSize)}px`,
            }}
          >
            {english}
          </p>
          <p className="font-pretendard text-[24px] font-light uppercase leading-[26px] tracking-[0.24px] text-white">
            {korean}
          </p>
        </div>
      </div>
      {years && (
        <p
          className="font-satoshi text-white whitespace-nowrap"
          style={{
            fontSize: t.yearsSize,
            letterSpacing: t.yearsTracking,
            lineHeight: `${satoshiAutoLeading(t.yearsSize)}px`,
          }}
        >
          {years}
        </p>
      )}
    </>
  );
}

export default function RowLabel({
  label,
  dimmed = false,
  onHover,
}: {
  label: TimelineRowLabel;
  dimmed?: boolean;
  /** Supplied only for generation rows; `true` on enter, `false` on leave. */
  onHover?: (entering: boolean) => void;
}) {
  const { box, variant = "sort", number, english, korean } = label;
  /* Figma centres only the 1st Gen row; rows 2-5 are left-aligned. Sort rows
   * carry no `type` and stay centred, as before. */
  const centred = label.type?.centred ?? true;
  return (
    // The outer box is keyed by row index in Timeline, so it keeps its identity
    // across modes and travels on the shared tween. Only a surplus row enters
    // or leaves, via AnimatePresence.
    <motion.div
      className={`absolute left-0 top-0 flex flex-col justify-center gap-[4px] ${
        centred ? "items-center" : "items-start"
      }`}
      /* Inert marker: tells the Timeline's background click that a generation
       * heading is not empty space, so hovering one and clicking cannot drop
       * the current selection. Nothing about the label itself changes. */
      data-keep-selection
      style={{ width: box.width, height: box.height, pointerEvents: onHover ? "auto" : "none" }}
      onMouseEnter={onHover ? () => onHover(true) : undefined}
      onMouseLeave={onHover ? () => onHover(false) : undefined}
      initial={{ opacity: 0 }}
      animate={{ x: box.x, y: box.y, opacity: dimmed ? DIMMED_OPACITY : 1 }}
      exit={{ opacity: 0, transition: EXIT_FADE }}
      transition={{ ...POSITION_TRANSITION, opacity: dimmed ? DIM_FADE : UNDIM_FADE }}
    >
      {/* The wording belongs to the mode. `mode="wait"` fades the old text out
       * before the new fades in, so labels settle towards the end of the move
       * instead of snapping the moment the sort changes. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${number ?? ""}|${english}|${korean}`}
          className={`flex flex-col justify-center gap-[4px] ${
            centred ? "items-center" : "items-start"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={LABEL_TEXT_FADE}
        >
          {variant === "generation" ? <GenerationTitle {...label} /> : <SortTitle {...label} />}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
