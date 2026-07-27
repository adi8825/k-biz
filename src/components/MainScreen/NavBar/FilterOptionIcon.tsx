import type { CSSProperties } from "react";
import type { FilterCategory } from "@/lib/timeline/filterState";

const BASE = "/mainscreen/filters";

/** One drawn asset inside an icon. With no `style`/`className` the asset is
 * rendered at its natural size and centred — the default for every icon whose
 * artwork is a single glyph. Formation and Status are layered compositions, so
 * they carry their exact Figma geometry instead. */
type Layer = { file: string; className?: string; style?: CSSProperties };

type IconSpec = {
  /** Container from Figma. Used for alignment only — never applied to the
   * artwork, which always keeps its own proportions. */
  wrapper: string;
  /** Optional nested box, for the layered Formation compositions. */
  inner?: string;
  layers: Layer[];
};

function spec(category: FilterCategory, value: string): IconSpec {
  switch (category) {
    // Figma: 14x30 frame, 9.28571x30 glyph — natural size already fills it.
    case "nationality":
      return { wrapper: "h-[30px] w-[14px]", layers: [{ file: `nationality/${value}.svg` }] };

    // Figma: 20x20 frame. Each language glyph has its own proportions
    // (15.03x14.22, 16.53x13.04, 13.95x15.03, 15.84x15.03), so it must be
    // drawn at natural size — forcing a shared box stretched three of the four.
    case "language":
      return { wrapper: "size-[20px]", layers: [{ file: `language/${value}.svg` }] };

    // Figma: 20x30 frame, all four glyphs natural size and centred.
    case "type": {
      const file =
        value === "Girl_Group"
          ? "girl"
          : value === "Boy_Group"
            ? "boy"
            : value === "Co_Ed"
              ? "coed"
              : "band";
      return { wrapper: "h-[30px] w-[20px]", layers: [{ file: `type/${file}.svg` }] };
    }

    // Figma: 19x30 frame. The pearl artwork sits at a specific offset inside
    // it rather than defining the frame, so the geometry is explicit.
    case "status":
      return {
        wrapper: "h-[30px] w-[19px]",
        layers:
          value === "true"
            ? [{ file: "status/active.svg", style: { left: 2.513, top: -1, width: 17, height: 32 } }]
            : [{ file: "status/inactive.svg", style: { left: 8.5, top: -1, width: 2, height: 32 } }],
      };

    // Figma: 38x31 frame holding a layered charm, centred horizontally.
    case "formation":
      if (value === "Regular") {
        return {
          wrapper: "h-[31px] w-[38px]",
          inner: "-translate-x-1/2 absolute left-1/2 top-0 size-[31.35px]",
          layers: [
            { file: "formation/regular_1.svg", className: "absolute inset-0 size-full" },
            {
              file: "formation/regular_2.svg",
              className: "absolute size-[28.663px]",
              style: { left: 1.34, top: 1.34 },
            },
            {
              file: "formation/regular_3.svg",
              className:
                "-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 size-[26.871px]",
            },
          ],
        };
      }
      if (value === "Survival_Show") {
        return {
          wrapper: "h-[31px] w-[38px]",
          inner: "-translate-x-1/2 absolute left-1/2 top-0 size-[30.006px] overflow-clip",
          layers: [
            { file: "formation/survival_1.svg", className: "absolute inset-[1.49%]" },
            { file: "formation/survival_2.svg", className: "absolute inset-[5.97%]" },
            {
              file: "formation/survival_3.svg",
              className:
                "-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 h-[26.423px] w-[26.945px]",
            },
          ],
        };
      }
      return {
        wrapper: "h-[31px] w-[38px]",
        layers: [
          {
            file: "formation/global.svg",
            className: "-translate-x-1/2 absolute left-1/2 top-0 h-[31.35px] w-[34.037px]",
          },
        ],
      };
  }
}

/** Default treatment: natural size, centred, proportions preserved. */
const NATURAL_CENTRED =
  "-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 max-w-none shrink-0 object-contain";

/** Shared renderer for every filter-option icon across all five categories. */
export default function FilterOptionIcon({
  category,
  value,
}: {
  category: FilterCategory;
  value: string;
}) {
  const { wrapper, inner, layers } = spec(category, value);

  const drawn = layers.map((layer) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={layer.file}
      src={`${BASE}/${layer.file}`}
      alt=""
      className={
        layer.className
          ? `${layer.className} shrink-0 object-contain`
          : layer.style
            ? "absolute shrink-0 object-contain"
            : NATURAL_CENTRED
      }
      style={layer.style}
    />
  ));

  return (
    <div className={`relative shrink-0 ${wrapper}`}>
      {inner ? <div className={inner}>{drawn}</div> : drawn}
    </div>
  );
}
