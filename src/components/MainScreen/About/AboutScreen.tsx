"use client";

import { Fragment, useEffect, type UIEvent } from "react";
import { useSpotify } from "@/components/Spotify/SpotifyProvider";
import {
  ABOUT_CONTENT_HEIGHT,
  ABOUT_INTRO,
  ABOUT_SECTIONS,
  ABOUT_TITLE,
  type AboutBlock,
} from "./aboutContent";

/**
 * The About screen — a pixel transcription of the Figma "About_Screens" frame
 * (1155:265017).
 *
 * It covers the canvas rather than living in the 323px side-panel slot, which
 * is what the frame authors: a full 2048x1152 screen carrying the methodology
 * document in four 434px columns. The sidebar is part of that frame too, so
 * this layer is drawn beneath the NavBar and leaves it visible.
 *
 * The document is 1624px tall inside a 1152px frame, so the content scrolls.
 * That is the only behaviour not literally in the frame — Figma simply clips
 * the overflow, and clipping it here would make the last two rows and the
 * disclaimer unreachable.
 */

/* Figma's two body ramps, reproduced as authored. */
const BODY_CLASS = {
  en: "text-[16px] leading-[20px] tracking-[-0.32px]",
  ko: "font-pretendard text-[15px] font-light leading-[16.9px] tracking-[-0.3px]",
} as const;

function Block({ block }: { block: AboutBlock }) {
  return (
    <div
      className="absolute text-white"
      style={{ left: block.x, top: block.y, width: block.width }}
    >
      {block.heading && (
        <p
          className={
            block.headingSize === 24
              ? "font-satoshi text-[24px] leading-[24px]"
              : "font-satoshi text-[20px] leading-[20px]"
          }
        >
          {block.heading}
        </p>
      )}
      <p className={BODY_CLASS[block.bodyStyle]}>
        {block.body.map((line, i) => (
          <Fragment key={i}>
            {i > 0 && <br />}
            {line}
          </Fragment>
        ))}
      </p>
    </div>
  );
}

export default function AboutScreen({ open }: { open: boolean }) {
  const spotify = useSpotify();
  const setPlayerVisible = spotify?.setPlayerVisible;

  /* The player is the provider's, mounted once outside the stage; this only
   * asks for it to be shown while About is on screen. No second player, no
   * second piece of playback state — closing About hides it and leaves
   * whatever is playing playing. */
  useEffect(() => {
    setPlayerVisible?.(open);
  }, [open, setPlayerVisible]);

  /* Publishes the scroll offset the player positions itself against, so it
   * travels with the composition rather than hovering over it. Written
   * straight to the custom property rather than through state, so scrolling
   * never re-renders the document. */
  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    document.documentElement.style.setProperty(
      "--about-scroll",
      `${event.currentTarget.scrollTop}px`,
    );
  };

  return (
    <div
      aria-hidden={!open}
      onScroll={handleScroll}
      className="absolute inset-0 overflow-y-auto overflow-x-hidden bg-ink"
      style={{
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 300ms ease-out",
        zIndex: 20,
      }}
    >
      {/* The document's own height, so the screen scrolls rather than clipping
       * its last rows. Every child sits at its authored frame coordinate. */}
      <div className="relative" style={{ width: 2048, height: ABOUT_CONTENT_HEIGHT }}>
        <p
          className="absolute font-satoshi text-[32px] font-medium leading-[32px] text-white"
          style={{ left: ABOUT_TITLE.en.x, top: ABOUT_TITLE.en.y, width: ABOUT_TITLE.en.width }}
        >
          {ABOUT_TITLE.en.text}
        </p>
        <p
          className="absolute font-pretendard text-[32px] font-semibold leading-[38px] text-white"
          style={{ left: ABOUT_TITLE.ko.x, top: ABOUT_TITLE.ko.y, width: ABOUT_TITLE.ko.width }}
        >
          {ABOUT_TITLE.ko.text}
        </p>

        {[...ABOUT_INTRO, ...ABOUT_SECTIONS].map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </div>
  );
}
