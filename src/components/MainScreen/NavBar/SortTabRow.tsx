"use client";

import { useState } from "react";
import NavIcon from "./NavIcon";
import type { IconKey } from "./icons";

export default function SortTabRow({
  icon,
  english,
  korean,
  active,
  onClick,
  disabled = false,
}: {
  icon: IconKey;
  english: string;
  korean: string;
  active: boolean;
  onClick: () => void;
  /** About is open: stay in place, but stop responding. */
  disabled?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const showLabel = !disabled && (active || hovered);

  return (
    <button
      type="button"
      disabled={disabled}
      aria-disabled={disabled || undefined}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label={`Sort by ${english}`}
      aria-pressed={active}
      className="flex h-[55px] w-[141px] shrink-0 items-center overflow-clip"
    >
      <NavIcon icon={icon} active={showLabel} />
      {/* Always mounted so the fade-out can finish; only opacity changes, and
       * the fixed-width clipped row means its box never moves the icon. */}
      <div className="nav-label flex flex-col items-start px-[8px]" data-shown={showLabel}>
        <p
          className={`font-satoshi text-[16px] tracking-[-0.32px] text-white whitespace-nowrap ${
            active ? "font-medium" : "font-normal"
          }`}
        >
          {english}
        </p>
        <p
          className={`font-pretendard text-[15px] tracking-[-0.3px] text-white whitespace-nowrap ${
            active ? "font-medium uppercase" : "font-light"
          }`}
        >
          {korean}
        </p>
      </div>
    </button>
  );
}
