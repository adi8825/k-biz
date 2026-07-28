"use client";

import type { MouseEvent } from "react";
import { regionAtFraction, type CharmRegion } from "@/lib/timeline/charmRegions";
import { charmParts, partOpacity } from "./charmParts";

type PanelCharmProps = {
  name: string;
  /**
   * The part this page is about, or null for General, where Figma lights
   * every part. Only opacities change when this changes — the elements
   * themselves never remount.
   */
  activeRegion: CharmRegion | null;
  onSelectRegion?: (region: CharmRegion) => void;
  /** Any touch of the charm — pointer, focus or click. Hands control back to
   * the reader, which stops the guided preview. */
  onInteract?: () => void;
  /** Skips the part fade for readers who ask for less motion. */
  reducedMotion?: boolean;
  /** Charm-part folder for the group being shown. */
  partsBase?: string;
  /**
   * Folder of five pre-rendered charm *states* — the whole charm drawn once per
   * page, with that page's part lit and the rest already dimmed.
   *
   * An alternative to `partsBase` for a group authored that way: the dimming
   * is baked into the artwork rather than applied here. Files are named for the
   * region their page belongs to, so General is `tag` — the tag's page is page
   * 0, which lights every part.
   */
  charmStatesBase?: string;
  className?: string;
  style?: React.CSSProperties;
};

/** Part fade. Long enough to read as a dissolve rather than a switch. */
const PART_FADE_MS = 350;

/** The five pre-rendered states, named for the region whose page they belong
 * to. `tag` is the General state, where every part is lit. */
const CHARM_STATES: CharmRegion[] = ["bar", "language", "flower", "pearl", "tag"];

/**
 * The large charm inside the Group Detail Panel — and the panel's page
 * control. Clicking a part of it opens that part's page: the tag returns to
 * General, the bar goes to Nationality, the language plate to Language, the
 * flower to Formation, the pearl to Status.
 *
 * One stable instance for the whole panel. The five parts are mounted once
 * and never replaced; a page change only animates their opacity between 1 and
 * 0.25, the two values Figma authors. Because the charm no longer lives
 * inside the page layers, the page crossfade cannot make it flicker.
 *
 * Region detection reuses the Timeline's band table: the parts sit at the
 * same fractions of the charm's height here as they do on the small charm
 * (bar 0-0.12, language to 0.19, flower to 0.40, pearl to 0.50, tag below),
 * measured from this element's own box so it holds at any ScaleStage scale.
 */
export default function PanelCharm({
  name,
  activeRegion,
  onSelectRegion,
  onInteract,
  reducedMotion = false,
  partsBase,
  charmStatesBase,
  className,
  style,
}: PanelCharmProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onInteract?.();
    /* The panel sits above the Timeline background, whose click clears the
     * selection; navigating pages must never close the profile. */
    event.stopPropagation();
    if (event.detail === 0) return; // keyboard: no pointer, so no region
    const bounds = event.currentTarget.getBoundingClientRect();
    onSelectRegion?.(regionAtFraction((event.clientY - bounds.top) / bounds.height));
  };

  return (
    <button
      type="button"
      aria-label={`${name} charm — choose an information page`}
      onClick={handleClick}
      onPointerEnter={onInteract}
      onFocus={onInteract}
      className={`-translate-x-1/2 -translate-y-1/2 absolute cursor-pointer border-0 bg-transparent p-0 ${className ?? ""}`}
      style={{
        left: "calc(50% - 85px)",
        top: "calc(50% - 160px)",
        width: 130.254,
        height: 544,
        ...style,
      }}
    >
      {/* All five states mounted at once and crossfaded, so a page change is a
       * dissolve between two whole charms rather than a swap — and this stable
       * instance is never remounted, exactly as the sliced parts are not. */}
      {charmStatesBase
        ? CHARM_STATES.map((state) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={state}
              src={`${charmStatesBase}/${state}.png`}
              alt=""
              className="pointer-events-none absolute max-w-none"
              style={{
                left: -1,
                top: -1,
                width: 132.254,
                height: 546,
                opacity: state === (activeRegion ?? "tag") ? 1 : 0,
                transition: reducedMotion ? "none" : `opacity ${PART_FADE_MS}ms ease-in-out`,
              }}
            />
          ))
        : charmParts(partsBase).map((part) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={part.region}
            src={part.src}
            alt=""
            className="pointer-events-none absolute max-w-none"
            style={{
              left: -1,
              top: part.top,
              width: 132.254,
              height: part.height,
              opacity: partOpacity(part.region, activeRegion),
              transition: reducedMotion ? "none" : `opacity ${PART_FADE_MS}ms ease-in-out`,
            }}
          />
        ))}
    </button>
  );
}
