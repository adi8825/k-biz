import { Fragment } from "react";
import type { EditorialElement, TextVariant } from "./types";

/**
 * The panel's type scale, per variant and language. `body` reproduces the
 * original two styles exactly, so content written before variants existed is
 * untouched; the others are measured from the category pages.
 *
 * Korean always uses Pretendard. Figma labels a handful of the Korean runs as
 * Satoshi — which has no Hangul, so Figma is already showing a fallback there
 * — and matching that literally would only reproduce the substitution.
 */
const TEXT_STYLES: Record<TextVariant, Record<"en" | "ko", string>> = {
  body: {
    en: "text-[16px] leading-[20px] tracking-[-0.32px]",
    ko: "font-pretendard text-[15px] font-light leading-[16.9px] tracking-[-0.3px]",
  },
  "label-sm": {
    en: "text-[20px] leading-[20px]",
    ko: "font-pretendard text-[20px] leading-[20px]",
  },
  "label-lg": {
    en: "text-[24px] leading-[24px]",
    ko: "font-pretendard text-[24px] font-light leading-[24px]",
  },
  "stat-md": {
    en: "text-[32px] leading-[43px]",
    ko: "font-pretendard text-[32px] leading-[43px]",
  },
  "stat-lg": {
    en: "text-[40px] leading-[48px]",
    ko: "font-pretendard text-[40px] leading-[48px]",
  },
};

type EditorialCanvasProps = {
  elements: EditorialElement[];
};

/**
 * Generic renderer for a group's editorial composition — maps a flat array
 * of typed, absolutely-positioned elements onto the panel. One renderer for
 * every group; a different composition is just different data, never a new
 * component.
 */
export default function EditorialCanvas({ elements }: EditorialCanvasProps) {
  return (
    <>
      {elements.map((element, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: element.x,
            top: element.y,
            width: element.width,
            height: element.height,
            zIndex: element.zIndex,
            transform: element.rotation ? `rotate(${element.rotation}deg)` : undefined,
            borderRadius: element.borderRadius,
          }}
        >
          <ElementContent element={element} />
        </div>
      ))}
    </>
  );
}

function ElementContent({ element }: { element: EditorialElement }) {
  switch (element.type) {
    /* Exports come out 1px proud of their node box on every side, so both
     * images and shapes are drawn from -1,-1 at box+2 design pixels.
     *
     * The size is stated explicitly and never left to the bitmap: some assets
     * are 1x and some are 2x, so intrinsic sizing renders the 2x ones at
     * double their authored size. Design units are the only units the Figma
     * frame is expressed in, so they are the ones used here.
     *
     * The asset is already the node's authored composition — its crop, mask,
     * 8px radius and 2px stroke are baked in — so nothing here re-derives the
     * framing. `objectFit` stays available for the rare node that genuinely
     * crops, and is otherwise left alone. */
    case "image":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={element.src}
          alt={element.alt ?? ""}
          className="absolute max-w-none"
          style={{
            left: -1,
            top: -1,
            width: element.width + 2,
            height: element.height + 2,
            objectFit: element.objectFit,
            objectPosition: element.objectPosition,
          }}
        />
      );
    case "shape":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={element.asset}
          alt=""
          className="absolute max-w-none"
          style={{ left: -1, top: -1, width: element.width + 2, height: element.height + 2 }}
        />
      );
    case "text": {
      const textClassName = TEXT_STYLES[element.variant ?? "body"][element.lang];
      return (
        <p className={textClassName} style={{ textAlign: element.align }}>
          {Array.isArray(element.text)
            ? element.text.map((line, i) => (
                <Fragment key={i}>
                  {i > 0 && <br />}
                  {line}
                </Fragment>
              ))
            : element.text}
        </p>
      );
    }
  }
}
