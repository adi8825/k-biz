type StatBadgeProps = {
  labelEn: string;
  labelKo: string;
  value: string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * A labeled stat pill — EN/KO label stacked on one side, a large value on the
 * other, with Figma's soft pink glow. Matches the "Debut / 데뷔 — 2022" badge;
 * the Nationality/Language/Formation/Status variants reuse this same shape
 * for their own label+value pairs (e.g. "Members / 명의 멤버 — 5").
 */
export default function StatBadge({ labelEn, labelKo, value, className, style }: StatBadgeProps) {
  return (
    <div
      className={`absolute flex items-center overflow-clip rounded-[8px] px-[3px] py-[9px] drop-shadow-[0px_0px_10px_rgba(242,89,163,0.25)] ${className ?? ""}`}
      style={style}
    >
      <div className="flex flex-col items-start px-[8px]">
        <div className="flex w-full items-center justify-center">
          <p className="text-[16px] leading-[20px] tracking-[-0.32px] whitespace-nowrap">{labelEn}</p>
        </div>
        <div className="flex items-center justify-center">
          <p className="font-pretendard text-[15px] font-light leading-[16.9px] tracking-[-0.3px] whitespace-nowrap">
            {labelKo}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center py-[8px]">
        <p className="text-[32px] leading-[43px] uppercase whitespace-nowrap">{value}</p>
      </div>
    </div>
  );
}
