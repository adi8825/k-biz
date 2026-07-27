import { iconSrc, type IconKey } from "./icons";

type NavIconProps = {
  icon: IconKey;
  active?: boolean;
  size?: number;
};

export default function NavIcon({ icon, active = false, size = 20 }: NavIconProps) {
  const variant = iconSrc[icon];
  const src = active && variant.picked ? variant.picked : variant.default;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      style={{ width: size, height: size }}
      className={active ? "drop-shadow-[0_0_1.43px_rgba(255,255,255,0.5)]" : undefined}
    />
  );
}
