import { CANVAS_WIDTH, CANVAS_HEIGHT } from "@/lib/canvas";
import ScaleStage from "@/components/ScaleStage";
import { playfairDisplay } from "@/lib/fonts";
import { BREATHING_CLASS, breathingStyle } from "@/lib/opening/breathing";
import { OPENING0_PLATES, PHOTO_BLEED, type Opening0Plate } from "./plates";

const ASSETS = "/opening/opening0";

/** Figma's logo block, in frame-local coordinates. */
const LOGO_FRAME = { x: 542, y: 357, w: 963, h: 396 };
const LOGO_COLUMN = { x: 421, w: 120.855, gap: 8.632 };
const CHARM_SIZE = 120.855;

/**
 * A plate is one photo plus the hairline outline Figma draws over it.
 *
 * Only the photograph breathes. Its outline is part of the static lattice and
 * holds full opacity, which is what gives the wall its exhibition feel — a
 * fixed frame with a living image inside it — and keeps opening0 consistent
 * with opening1-3, where the lattice is a separate always-present layer.
 */
function Plate({ plate }: { plate: Opening0Plate }) {
  return (
    <div
      data-opening0-plate={plate.id}
      className="absolute"
      style={{ left: plate.x, top: plate.y, width: plate.w, height: plate.h }}
    >
      <div
        data-breathing={plate.id}
        className={`${BREATHING_CLASS} absolute inset-0`}
        style={breathingStyle(plate.id)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSETS}/photo_${plate.id}.png`}
          alt=""
          className="absolute block max-w-none"
          style={{
            left: -PHOTO_BLEED,
            top: -PHOTO_BLEED,
            width: plate.w + PHOTO_BLEED * 2,
            height: plate.h + PHOTO_BLEED * 2,
          }}
        />
      </div>
      <div
        className="absolute"
        style={{
          top: plate.outlineInsetY,
          bottom: plate.outlineInsetY,
          left: plate.outlineInsetX,
          right: plate.outlineInsetX,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSETS}/outline_${plate.id}.svg`} alt="" className="block size-full max-w-none" />
      </div>
    </div>
  );
}

/** The centre mark. Deliberately outside the animated layer — it never moves
 * and never fades. */
function Logo() {
  return (
    <div className="absolute" style={{ left: LOGO_FRAME.x, top: LOGO_FRAME.y, width: LOGO_FRAME.w, height: LOGO_FRAME.h }}>
      <div
        className="absolute flex flex-col items-center"
        style={{ left: LOGO_COLUMN.x, top: 0, width: LOGO_COLUMN.w, gap: LOGO_COLUMN.gap }}
      >
        <div className="relative shrink-0" style={{ width: 22.444, height: 72.513 }}>
          <div className="absolute" style={{ top: 0, bottom: 0, left: "4.11%", right: "4.11%" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${ASSETS}/logo_bar.svg`} alt="" className="block size-full max-w-none" />
          </div>
        </div>

        <div className="relative shrink-0" style={{ width: CHARM_SIZE, height: CHARM_SIZE }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${ASSETS}/logo_ring_outer.svg`}
            alt=""
            className="absolute block max-w-none"
            style={{ left: 0, top: 0, width: CHARM_SIZE, height: CHARM_SIZE }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${ASSETS}/logo_ring_inner.svg`}
            alt=""
            className="absolute block max-w-none"
            style={{ left: 5.18, top: 5.18, width: 110.496, height: 110.496 }}
          />
          <div
            className="-translate-x-1/2 -translate-y-1/2 absolute"
            style={{ left: "calc(50% - 0.86px)", top: "50%", width: 81.145, height: 69.06 }}
          >
            <div className="absolute" style={{ top: "-1.39%", right: "-2.94%", bottom: "-0.33%", left: "-0.56%" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${ASSETS}/logo_mark.svg`} alt="K-BIZ" className="block size-full max-w-none" />
            </div>
          </div>
        </div>
      </div>

      <p
        className={`${playfairDisplay.className} -translate-x-1/2 absolute whitespace-nowrap text-center text-[60px] italic leading-normal text-white`}
        style={{ left: "calc(50% - 0.5px)", top: 254 }}
      >
        K BIZ
      </p>
    </div>
  );
}

/**
 * opening0 — the idle state shown before the sequence begins.
 *
 * Isolated on purpose: it shares no plate data, scene record or transition
 * timing with opening1–3, so nothing here can disturb the approved sequence.
 */
export default function Opening0() {
  return (
    <ScaleStage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
      <div className="relative size-full overflow-hidden bg-ink">
        {OPENING0_PLATES.map((plate) => (
          <Plate key={plate.id} plate={plate} />
        ))}
        <Logo />
      </div>
    </ScaleStage>
  );
}
