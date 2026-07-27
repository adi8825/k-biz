type GroupTitleProps = {
  name: string;
  nameKo: string;
  koColor: string;
  className?: string;
  style?: React.CSSProperties;
};

/** Group name block (EN + KO stacked) — matches Figma's "Main_Title" component.
 * The Korean name is colored with the group's charm accent colour. */
export default function GroupTitle({ name, nameKo, koColor, className, style }: GroupTitleProps) {
  return (
    /* Both lines are left aligned and start at the block's own x, exactly as
     * Figma authors them (EN and KO both at x=3 in the General frame). They
     * were previously wrapped in centering rows, which pushed the shorter EN
     * line ~46px to the right of where the design puts it. */
    <div className={`absolute flex flex-col items-start gap-[16px] ${className ?? ""}`} style={style}>
      <p className="text-[32px] font-medium leading-[32px] whitespace-nowrap">{name}</p>
      <p
        className="font-pretendard text-[32px] font-semibold uppercase leading-[38px] whitespace-nowrap"
        style={{ color: koColor }}
      >
        {nameKo}
      </p>
    </div>
  );
}
