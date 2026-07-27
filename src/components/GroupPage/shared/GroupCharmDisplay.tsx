type GroupCharmDisplayProps = {
  asset: string;
  name: string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * The large charm graphic shown on every Group Page variant. Defaults to
 * Figma's centered position (`calc(50% - 85px)` / `calc(50% - 160px)` within
 * the 323px-wide panel) but accepts a `style` override since other variants
 * nudge this vertically by a few px.
 */
export default function GroupCharmDisplay({ asset, name, className, style }: GroupCharmDisplayProps) {
  return (
    <div
      className={`-translate-x-1/2 -translate-y-1/2 absolute ${className ?? ""}`}
      style={{
        left: "calc(50% - 85px)",
        top: "calc(50% - 160px)",
        width: 130.254,
        height: 544,
        ...style,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset} alt={name} className="size-full" />
    </div>
  );
}
