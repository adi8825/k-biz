"use client";

import { useEffect, useRef } from "react";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "@/lib/canvas";
import ScaleStage from "@/components/ScaleStage";
import { openingFade } from "./transitions";
import { BREATHING_CLASS, breathingStyle } from "@/lib/opening/breathing";
import { PLATES, PLATES_MID, PLATES_BACK, plate, type Plate } from "./plates";
import {
  SCENES,
  SCENE_IDS,
  type OpeningScene,
  type Scene,
  type ScenePhoto,
  type SceneCaption,
  type SceneParagraph,
} from "./scenes";
import { auditPlateData, auditPlateDom, reportCensus } from "./plateCensus";

export type { OpeningScene };

const LATTICE = "/opening/opening1";

/** Figma's paragraphs use auto line-height, which the browser resolves
 * differently (48px). Measured line-top to line-top at native 2048:
 * Satoshi 32px -> 43px, Pretendard 32px -> 38px. */
const EN_LEADING = 43;
const KO_LEADING = 38;

function Plates({ items }: { items: Plate[] }) {
  return (
    <>
      {items.map((p) => (
        <div
          key={p.id}
          data-plate={p.id}
          className={`absolute ${p.border ? "rounded-[8px] border-[0.5px] border-solid border-white" : ""}`}
          style={{ left: p.x, top: p.y, width: p.w, height: p.h }}
        >
          {p.src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`${LATTICE}/${p.src}`}
              alt=""
              className="block size-full max-w-none"
              style={p.flipX ? { transform: "scaleX(-1)" } : undefined}
            />
          )}
        </div>
      ))}
    </>
  );
}

function PhotoLayer({
  scene,
  photos,
  visible,
}: {
  scene: Scene;
  photos: ScenePhoto[];
  visible: boolean;
}) {
  return (
    <>
      {photos.map((ph) => {
        const p = plate(ph.plate);
        const box = ph.box ?? { x: p.x, y: p.y, w: p.w, h: p.h };
        return (
          // Outer layer: scene-transition opacity only. Nested opacities
          // multiply, so this still reaches a true 0 wherever the breathing
          // inside it happens to be in its cycle.
          <div
            key={`${scene.assets}-${ph.plate}`}
            className={`absolute ${ph.cover ? "overflow-hidden rounded-[8px]" : ""}`}
            style={{ left: box.x, top: box.y, width: box.w, height: box.h, ...openingFade(visible) }}
          >
            {/* Inner layer: the continuous breathing loop. Only photographs
             * breathe — the lattice outlines behind them never do. */}
            <div
              data-breathing={ph.plate}
              className={`${BREATHING_CLASS} size-full`}
              style={breathingStyle(ph.plate)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${scene.assets}/${ph.src}`}
                alt={ph.alt}
                className={`block max-w-none ${ph.cover ? "size-full object-cover" : ""}`}
                style={
                  ph.cover
                    ? undefined
                    : {
                        width: ph.imgW,
                        height: ph.imgH,
                        marginLeft: (box.w - ph.imgW) / 2,
                        marginTop: (box.h - ph.imgH) / 2,
                        transform: p.flipX ? "scaleX(-1)" : undefined,
                      }
                }
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

function CaptionLayer({ items, visible }: { items: SceneCaption[]; visible: boolean }) {
  return (
    <>
      {items.map((c) => (
        <div
          key={`${c.x}-${c.en}`}
          className={`absolute flex flex-col ${
            c.align === "center" ? "items-center justify-center" : "items-start"
          }`}
          style={{ left: c.x, top: c.y, width: c.width, ...openingFade(visible) }}
        >
          <div className="flex items-center justify-center py-[2px]">
            <p
              className="font-satoshi leading-[19px] text-white whitespace-nowrap"
              style={{ fontSize: c.size, letterSpacing: c.size === 16 ? "-0.32px" : "-0.3px" }}
            >
              {c.en}
            </p>
          </div>
          {c.ko && (
            <div className="flex items-center justify-center py-[2px]">
              <p
                className="font-pretendard leading-[19px] text-white whitespace-nowrap"
                style={{ fontSize: c.size }}
              >
                {c.ko}
              </p>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

/** Charm artwork changes in every scene; the container never moves. */
function Charm({ variant }: { variant: Scene["charm"] }) {
  const size = { width: 92.353, height: 92.353 };
  if (variant === "circle") {
    return (
      <div className="relative" style={size}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/opening/opening1/ellipse42.svg" alt="" className="absolute inset-0 size-full" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/opening/opening1/ellipse43.svg"
          alt=""
          className="absolute"
          style={{ left: 3.96, top: 3.96, width: 84.437, height: 84.437 }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/opening/opening1/redo.svg"
          alt=""
          className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2"
          style={{ width: 79.16, height: 79.16 }}
        />
      </div>
    );
  }
  if (variant === "square") {
    return (
      <div className="relative overflow-clip" style={size}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/opening/opening2/charm_1.svg" alt="" className="absolute inset-[1.49%]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/opening/opening2/charm_2.svg" alt="" className="absolute inset-[5.97%]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/opening/opening2/charm_3.svg"
          alt=""
          className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2"
          style={{ width: 79.377, height: 77.84, top: "calc(50% - 0.03px)" }}
        />
      </div>
    );
  }
  return (
    <div className="relative" style={size}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/opening/opening3/charm.svg"
        alt=""
        className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 max-w-none"
        style={{ width: 100.269, height: 92.353 }}
      />
    </div>
  );
}

/** Each paragraph state centres inside its own Figma container, so a 2-line
 * and a 3-line paragraph both land where Figma puts them without animating
 * any layout — only opacity changes. */
function Paragraph({ para, visible }: { para: SceneParagraph; visible: boolean }) {
  return (
    <div
      className="absolute"
      style={{ left: 543, top: para.boxY, width: 963, height: para.boxH, ...openingFade(visible) }}
    >
      <div
        className="-translate-y-1/2 absolute left-0 flex w-[963px] flex-col items-start"
        style={{ top: `calc(50% + ${para.offset}px)` }}
      >
        <div className="flex w-full flex-col items-start gap-[28px]">
          <div className="flex w-full items-center justify-center">
            <p
              className="w-[814px] text-center font-satoshi text-[32px] text-white"
              style={{ lineHeight: `${EN_LEADING}px` }}
            >
              {para.en}
            </p>
          </div>
          <div className="flex w-full items-center justify-center">
            <p
              className="w-[692px] text-center font-pretendard text-[32px] text-white"
              style={{ lineHeight: `${KO_LEADING}px` }}
            >
              {para.ko}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Opening1({ scene = 1 }: { scene?: OpeningScene }) {
  const stageRef = useRef<HTMLDivElement>(null);

  // Development-time plate census. Produces no UI.
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    reportCensus(auditPlateData(), "data");
    const root = stageRef.current;
    if (!root) return;
    // Wait for ScaleStage's ResizeObserver to apply its transform, then measure
    // geometry and scale together so the two can never disagree.
    const id = requestAnimationFrame(() =>
      reportCensus(auditPlateDom(root, CANVAS_WIDTH), "dom"),
    );
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <ScaleStage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
      <div ref={stageRef} className="relative size-full overflow-hidden bg-ink">
        {/* Permanently mounted and completely static in every scene. */}
        <Plates items={PLATES} />

        {/* Scenes 1 and 2 sit at Figma's original z-position, between the
         * first plate group and the rest. */}
        {SCENE_IDS.filter((id) => id !== 3).map((id) => (
          <PhotoLayer
            key={`photos-${id}`}
            scene={SCENES[id]}
            photos={SCENES[id].photos}
            visible={scene === id}
          />
        ))}

        <Plates items={PLATES_MID} />
        <Plates items={PLATES_BACK} />

        {/* opening3 paints its photos above the whole lattice. */}
        <PhotoLayer scene={SCENES[3]} photos={SCENES[3].photos} visible={scene === 3} />

        {SCENE_IDS.map((id) => (
          <CaptionLayer key={`captions-${id}`} items={SCENES[id].captions} visible={scene === id} />
        ))}

        {/* Charm container is fixed for the whole sequence; only the artwork
         * and the paragraph beneath it cross-fade. */}
        <div className="absolute" style={{ left: 543, top: 356, width: 963, height: 315 }}>
          <div
            className="-translate-x-1/2 absolute flex flex-col items-center"
            style={{ left: "calc(50% - 0.43px)", top: 0, width: 112.143 }}
          >
            <div className="relative" style={{ width: 92.353, height: 92.353 }}>
              {SCENE_IDS.map((id) => (
                <div key={`charm-${id}`} className="absolute inset-0" style={openingFade(scene === id)}>
                  <Charm variant={SCENES[id].charm} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {SCENE_IDS.map((id) => (
          <Paragraph key={`para-${id}`} para={SCENES[id].paragraph} visible={scene === id} />
        ))}
      </div>
    </ScaleStage>
  );
}
