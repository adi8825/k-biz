"use client";

import { useState } from "react";
import NavIcon from "./NavIcon";
import type { IconKey } from "./icons";
import type { FilterCategory, FilterState } from "@/lib/timeline/filterState";
import { FILTER_TAB_TEXT } from "@/lib/timeline/filterLabels";
import FilterPanel from "./FilterPanel";

export default function FilterTabRow({
  icon,
  category,
  isOpen,
  filterState,
  onToggleOpen,
  onToggleValue,
  disabled = false,
}: {
  icon: IconKey;
  category: FilterCategory;
  isOpen: boolean;
  filterState: FilterState;
  onToggleOpen: () => void;
  onToggleValue: (value: string) => void;
  /** About is open: stay in place, but stop responding. */
  disabled?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const hasSelections = filterState[category].size > 0;
  const showLabel = !disabled && (isOpen || hasSelections || hovered);
  const { en, ko } = FILTER_TAB_TEXT[category];

  return (
    <div className="flex flex-col items-start">
      <button
        type="button"
        disabled={disabled}
        aria-disabled={disabled || undefined}
        onClick={onToggleOpen}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label={`Filter by ${en}`}
        aria-pressed={isOpen}
        className="flex h-[55px] w-[141px] shrink-0 items-center overflow-clip"
      >
        <NavIcon icon={icon} active={showLabel} />
        {/* Always mounted so the fade-out can finish; only opacity changes. */}
        <div className="nav-label flex flex-col items-start px-[8px]" data-shown={showLabel}>
          {/* ENG_Bar_Picked: Satoshi Medium/16/weight500/line-height20/tracking-0.32 */}
          <p className="font-satoshi text-[16px] font-medium leading-[20px] tracking-[-0.32px] text-white whitespace-nowrap">
            {en}
          </p>
          {/* KOR_Bar_Picked: Pretendard Medium/15/weight500/line-height16.9/tracking 0 */}
          <p className="font-pretendard text-[15px] font-medium uppercase leading-[16.9px] tracking-[0px] text-white whitespace-nowrap">
            {ko}
          </p>
        </div>
      </button>
      {isOpen && (
        <div className="pt-[8px]">
          <FilterPanel category={category} filterState={filterState} onToggle={onToggleValue} />
        </div>
      )}
    </div>
  );
}
