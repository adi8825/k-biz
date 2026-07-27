import { GEN_PANELS, type GenId } from "./genPanels";

const ASSET = "/mainscreen/genpanels";

/** Figma's named styles, the same pair the standing panel and the sidebar use.
 * ENG_Fact: Satoshi Regular 16 / 20 / -0.32.  KOR_Fact: Pretendard Light 15 /
 * 16.9 / -0.3. */
const EN_TEXT = "font-satoshi text-[16px] font-normal leading-[20px] tracking-[-0.32px]";
const KO_TEXT = "font-pretendard text-[15px] font-light leading-[16.9px] tracking-[-0.3px]";

/** Every plate bleeds exactly 1px past its box on all four sides. */
const BLEED = 1;

/**
 * One generation's information panel.
 *
 * Occupies the identical 323x1136 box as the standing EditorialPanel, so
 * showing it swaps content without moving anything.
 */
export default function GenPanel({ gen }: { gen: GenId }) {
  const panel = GEN_PANELS[gen];

  return (
    <div className="absolute inset-0 text-white" data-gen-panel={gen}>
      {panel.images.map((img, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${img.file}-${i}`}
          src={`${ASSET}/${img.file}`}
          alt=""
          className="absolute block max-w-none"
          style={{
            left: img.x - BLEED,
            top: img.y - BLEED,
            width: img.w + BLEED * 2,
            height: img.h + BLEED * 2,
          }}
        />
      ))}

      {/* Heading: the numeral sits beside a stacked English/Korean pair, the
       * same treatment the timeline's generation labels use. */}
      <div
        className="absolute flex flex-col items-center justify-center px-[3px] py-[23px]"
        style={{ left: panel.headingLeft, top: 0 }}
      >
        <div className="flex items-center" style={{ gap: panel.headingGap }}>
          <p className="font-satoshi text-[72px] font-light uppercase leading-[72px] text-white whitespace-nowrap">
            {panel.gen}
          </p>
          <div className="flex flex-col items-start">
            <p className="font-satoshi text-[32px] font-medium leading-[32px] text-white whitespace-nowrap">
              {panel.ordinal}
            </p>
            <p className="font-pretendard text-[32px] font-semibold uppercase leading-normal text-white whitespace-nowrap">
              세대
            </p>
          </div>
        </div>
      </div>

      {panel.texts.map((t, i) => (
        <div
          key={`t-${i}`}
          className={`absolute flex items-center ${t.centred ? "-translate-x-1/2" : ""}`}
          style={{
            left: t.centred ? "calc(50% - 0.5px)" : t.x,
            top: t.y,
            paddingLeft: t.px,
            paddingRight: t.px,
            paddingTop: t.py,
            paddingBottom: t.py,
          }}
        >
          <div className={`${t.lang === "en" ? EN_TEXT : KO_TEXT} text-white`} style={{ width: t.w }}>
            {t.lines.map((line, j) => (
              <p key={j} className={t.lang === "en" ? "leading-[20px]" : "leading-[16.9px]"}>
                {line}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
