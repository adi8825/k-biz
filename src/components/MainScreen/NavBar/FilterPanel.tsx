import { FILTER_OPTIONS } from "@/lib/timeline/filterLabels";
import type { FilterCategory, FilterState } from "@/lib/timeline/filterState";
import FilterOptionIcon from "./FilterOptionIcon";

export default function FilterPanel({
  category,
  filterState,
  onToggle,
}: {
  category: FilterCategory;
  filterState: FilterState;
  onToggle: (value: string) => void;
}) {
  // Matches Figma exactly: Nationality, Type and Language use a 16px row gap in
  // their Options list; Formation and Status use 8px.
  const rowGap =
    category === "formation" || category === "status" ? "gap-[8px]" : "gap-[16px]";
  // Icon-to-text gap within a single option row: Language uses 4px, every
  // other category uses 8px.
  const iconGap = category === "language" ? "gap-[4px]" : "gap-[8px]";

  return (
    <div className={`flex flex-col items-start ${rowGap} bg-[#14081a]`}>
      {FILTER_OPTIONS[category].map((option) => {
        const selected = filterState[category].has(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onToggle(option.value)}
            aria-pressed={selected}
            className={`flex items-center ${iconGap}`}
          >
            <FilterOptionIcon category={category} value={option.value} />
            {/* Figma wraps each option line in an English_Title / Korean_Title
             * frame carrying 4px horizontal padding, so the option text sits
             * 4px further right than the category label above it. */}
            <div className="flex flex-col items-start gap-[4px]">
              {/* ENG_Fact: Satoshi Regular/16/weight400/line-height20/tracking-0.32 */}
              <p
                className={`px-[4px] font-satoshi text-[16px] leading-[20px] tracking-[-0.32px] text-white text-left ${
                  selected ? "font-medium" : "font-normal"
                }`}
              >
                {option.en}
              </p>
              {/* KOR_Fact: Pretendard Light/15/weight300/line-height16.9/tracking-0.3 */}
              <p
                className={`px-[4px] font-pretendard text-[15px] leading-[16.9px] tracking-[-0.3px] text-white text-left ${
                  selected ? "font-medium" : "font-light"
                }`}
              >
                {option.ko}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
