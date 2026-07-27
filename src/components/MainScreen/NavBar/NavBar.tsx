"use client";

import { useState } from "react";
import Logo from "./Logo";
import NavIcon from "./NavIcon";
import SortTabRow from "./SortTabRow";
import FilterTabRow from "./FilterTabRow";
import ModeSwitcher from "./ModeSwitcher";
import SoundToggle from "./SoundToggle";
import type { SortMode } from "@/lib/timeline/sortModes";
import type { ViewMode } from "@/lib/timeline/viewMode";
import {
  EMPTY_FILTER_STATE,
  type FilterCategory,
  type FilterState,
} from "@/lib/timeline/filterState";
import type { IconKey } from "./icons";

const SORT_ITEMS: { icon: IconKey; english: string; korean: string; mode: SortMode }[] = [
  { icon: "generation", english: "Generations", korean: "세대", mode: "generation" },
  { icon: "nationality", english: "Nationality", korean: "국적", mode: "nationality" },
  { icon: "type", english: "Type", korean: "성별", mode: "type" },
  { icon: "size", english: "Members", korean: "회원 수", mode: "memberCount" },
];

const FILTER_CATEGORIES: { icon: IconKey; category: FilterCategory }[] = [
  { icon: "nationality", category: "nationality" },
  { icon: "language", category: "language" },
  { icon: "formation", category: "formation" },
  { icon: "status", category: "status" },
  { icon: "type", category: "type" },
];

type NavBarProps = {
  sortMode?: SortMode;
  onSortModeChange?: (mode: SortMode) => void;
  filterState?: FilterState;
  openFilterCategory?: FilterCategory | null;
  onOpenFilterCategoryChange?: (category: FilterCategory | null) => void;
  onFilterValueToggle?: (category: FilterCategory, value: string) => void;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  /** Replays the Opening sequence. Supplied only where an Opening exists to
   * return to; without it History stays inert, as before. */
  onHistory?: () => void;
  /** Opens or closes the About screen. */
  onAbout?: () => void;
  /** Whether the About screen is currently open. */
  aboutOpen?: boolean;
  /** Opens About without closing it again — the music button's destination,
   * so pressing it while About is open cannot toggle it shut. */
  onOpenAbout?: () => void;
  /** Clears every filter selection. Touches filters only. */
  onResetFilters?: () => void;
};

export default function NavBar({
  sortMode = "generation",
  onSortModeChange = () => {},
  filterState = EMPTY_FILTER_STATE,
  openFilterCategory = null,
  onOpenFilterCategoryChange = () => {},
  onFilterValueToggle = () => {},
  viewMode = "default",
  onViewModeChange = () => {},
  onHistory,
  onAbout,
  aboutOpen = false,
  onOpenAbout,
  onResetFilters,
}: NavBarProps) {
  const [historyHovered, setHistoryHovered] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);

  return (
    <div className="absolute left-0 top-0 h-[1152px] w-[170px] bg-ink">
      <div className="absolute left-[14px] top-[16px] flex flex-col items-start gap-[48px]">
        <div className="flex w-[141px] flex-col items-start gap-[8px]">
          <Logo />
          <div className="flex w-full flex-col items-start">
            <button
              type="button"
              aria-label={aboutOpen ? "Back" : "About"}
              aria-pressed={aboutOpen}
              aria-expanded={aboutOpen}
              onClick={onAbout}
              onMouseEnter={() => setAboutHovered(true)}
              onMouseLeave={() => setAboutHovered(false)}
              onFocus={() => setAboutHovered(true)}
              onBlur={() => setAboutHovered(false)}
              className="flex h-[45px] w-[141px] cursor-pointer items-center overflow-clip py-[4px]"
            >
              <NavIcon icon={aboutOpen ? "back" : "about"} size={18} />
              {/* Same label block as History below — same component, position,
                * timing and type. Copy is Figma's own "About / 대해서". */}
              <div className="nav-label flex flex-col items-start px-[8px]" data-shown={aboutHovered}>
                <p className="font-satoshi text-[16px] font-normal leading-[20px] tracking-[-0.32px] text-white whitespace-nowrap">
                  {aboutOpen ? "Back" : "About"}
                </p>
                <p className="font-pretendard text-[15px] font-light leading-[16.9px] tracking-[-0.3px] text-white whitespace-nowrap">
                  {aboutOpen ? "뒤로" : "대해서"}
                </p>
              </div>
            </button>
            {/* Hover label mirrors SortTabRow: same conditional reveal, same
             * two-line block at px-[8px] after the icon. Type is Figma's
             * Sidebar_Master/hover — Satoshi Regular 16/20 and Pretendard Light
             * 15/16.9, both at -2% tracking — which makes the block 37px and
             * lets it sit inside the existing 45px row. The vertical padding
             * drops 8px -> 4px purely to give that block room; with
             * `items-center` the 18px icon stays on exactly the same pixel. */}
            <button
              type="button"
              aria-label="History"
              disabled={aboutOpen}
              aria-disabled={aboutOpen || undefined}
              onClick={onHistory}
              onMouseEnter={() => setHistoryHovered(true)}
              onMouseLeave={() => setHistoryHovered(false)}
              onFocus={() => setHistoryHovered(true)}
              onBlur={() => setHistoryHovered(false)}
              style={{ opacity: aboutOpen ? 0.35 : 1, transition: "opacity 200ms ease-out" }}
              className="flex h-[45px] w-[141px] items-center overflow-clip py-[4px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/mainscreen/icons/history.svg"
                alt=""
                style={{ width: 18, height: 18 }}
              />
              <div className="nav-label flex flex-col items-start px-[8px]" data-shown={!aboutOpen && historyHovered}>
                <p className="font-satoshi text-[16px] font-normal leading-[20px] tracking-[-0.32px] text-white whitespace-nowrap">
                  History
                </p>
                <p className="font-pretendard text-[15px] font-light leading-[16.9px] tracking-[-0.3px] text-white whitespace-nowrap">
                  역사
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* While About is open every control below Back stays exactly where it
          * is, at the same size, and only loses contrast. `disabled` on each
          * button is what actually blocks pointer and keyboard activation. */}
        <div
          className="flex flex-col items-start gap-[40px]"
          style={{ opacity: aboutOpen ? 0.35 : 1, transition: "opacity 200ms ease-out" }}
        >
          <div className="flex flex-col items-start gap-[8px]">
            {/* Figma "Frame 466": an 82x42 block whose 22px title sits inset
              * 10px from the top and 6px from the left — 2px tighter than the
              * Filters heading below, which Figma authors identically in all
              * five Sidebar_Master states and in MainScreen/Defult. */}
            <div className="flex h-[42px] items-center gap-[8px] pl-[6px] pr-[8px]">
              <p className="font-satoshi text-[16px] font-bold leading-[22px] tracking-[0.16px] text-white whitespace-nowrap">
                Sort
              </p>
              <p className="font-pretendard text-[16px] font-semibold uppercase leading-[19px] tracking-[0.16px] text-white whitespace-nowrap">
                종류
              </p>
            </div>
            {SORT_ITEMS.map((item) => (
              <SortTabRow
                key={item.mode}
                icon={item.icon}
                english={item.english}
                korean={item.korean}
                active={sortMode === item.mode}
                onClick={() => onSortModeChange(item.mode)}
                disabled={aboutOpen}
              />
            ))}
          </div>

          <div className="flex flex-col items-start gap-[18px]">
            {/* The heading itself is the reset control — a real <button> so
             * Enter and Space work, with no added icon and the same
             * typography, spacing and position as before. */}
            <button
              type="button"
              onClick={onResetFilters}
              disabled={aboutOpen}
              aria-disabled={aboutOpen || undefined}
              aria-label="Reset all filters"
              className="flex cursor-pointer items-center gap-[8px] border-0 bg-transparent px-[8px] py-0"
            >
              <p className="font-satoshi text-[16px] font-bold leading-[22px] tracking-[0.16px] text-white whitespace-nowrap">
                Filters
              </p>
              <p className="font-pretendard text-[16px] font-semibold uppercase leading-[19px] tracking-[0.16px] text-white whitespace-nowrap">
                필터
              </p>
            </button>
            <div className="flex flex-col items-start gap-[16px]">
              {FILTER_CATEGORIES.map((item) => (
                <FilterTabRow
                  key={item.category}
                  icon={item.icon}
                  category={item.category}
                  isOpen={openFilterCategory === item.category}
                  filterState={filterState}
                  onToggleOpen={() =>
                    onOpenFilterCategoryChange(
                      openFilterCategory === item.category ? null : item.category,
                    )
                  }
                  onToggleValue={(value) => onFilterValueToggle(item.category, value)}
                  disabled={aboutOpen}
                />
              ))}
            </div>
          </div>

          <ModeSwitcher active={viewMode} onChange={onViewModeChange} disabled={aboutOpen} />
        </div>

        <div style={{ opacity: aboutOpen ? 0.35 : 1, transition: "opacity 200ms ease-out" }}>
          <SoundToggle disabled={aboutOpen} onOpenAbout={onOpenAbout} />
        </div>
      </div>
    </div>
  );
}
