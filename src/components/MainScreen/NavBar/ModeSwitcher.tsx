"use client";

import NavIcon from "./NavIcon";
import type { ViewMode } from "@/lib/timeline/viewMode";

const MODES: { key: ViewMode; en: string; ko: string }[] = [
  { key: "default", en: "Default", ko: "세대" },
  { key: "top10", en: "Top 10", ko: "국적" },
  { key: "explore", en: "Explore", ko: "탐구하다" },
];

export default function ModeSwitcher({
  active = "default",
  onChange = () => {},
  disabled = false,
}: {
  active?: ViewMode;
  onChange?: (mode: ViewMode) => void;
  /** About is open: stay in place, but stop responding. */
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col items-start">
      {MODES.map((mode) => {
        const isActive = active === mode.key;
        return (
          <button
            key={mode.key}
            type="button"
            disabled={disabled}
            aria-disabled={disabled || undefined}
            onClick={() => onChange(mode.key)}
            aria-label={mode.en}
            aria-pressed={isActive}
            className="flex w-[141px] flex-col items-start overflow-clip py-[8px]"
          >
            <div className="flex w-[141px] items-center">
              <span className="flex size-[20px] shrink-0 items-center justify-center">
                <NavIcon icon="mode" active={isActive} size={16} />
              </span>
              <div className="flex items-center gap-[8px] px-[8px]">
                <p
                  className={`font-satoshi text-[16px] leading-[20px] tracking-[-0.32px] text-white whitespace-nowrap ${
                    isActive ? "font-medium" : "font-normal"
                  }`}
                >
                  {mode.en}
                </p>
                <p
                  className={`font-pretendard text-[15px] leading-[16.9px] text-white uppercase whitespace-nowrap ${
                    isActive ? "font-medium" : "font-light tracking-[-0.3px]"
                  }`}
                >
                  {mode.ko}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
