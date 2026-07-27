"use client";

import { useState } from "react";
import { useSpotify } from "@/components/Spotify/SpotifyProvider";

/**
 * The sidebar's music control. Same 20px box, same position and spacing as
 * the Sound/Mute button it replaces — only the icon and what it opens have
 * changed.
 *
 * Clicking opens the About screen, which is where the player now lives. It
 * never opens a tab, and it never tears the embed down: playback is the
 * reader's to control inside Spotify's own player, and it carries on wherever
 * they go afterwards. About is the only destination, so this cannot open a
 * second view or hold a state of its own — while About is already open the
 * button is disabled along with the rest of the sidebar.
 */
export default function SoundToggle({
  disabled = false,
  onOpenAbout,
}: { disabled?: boolean; onOpenAbout?: () => void } = {}) {
  const spotify = useSpotify();
  const [hovered, setHovered] = useState(false);

  if (!spotify) return null;

  const { isPlaying } = spotify;

  return (
    /* Figma's "Sound" instance is a bare 20x20 box, so the row is pinned to
     * that height: letting it grow to the label's 37px pushed the icon 5.5px
     * down and stretched the sidebar column past its authored 1120px. The
     * label is taller than the row it sits in and is therefore not clipped —
     * it centres on the icon and stays well inside the 141px column. */
    <div
      className="flex h-[20px] w-[141px] items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
    <button
      type="button"
      disabled={disabled}
      aria-disabled={disabled || undefined}
      onClick={onOpenAbout}
      aria-label="Open About, where the music player lives"
      title="Background music on Spotify"
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="relative block size-[20px] shrink-0 cursor-pointer text-white"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/mainscreen/icons/spotify.svg"
        alt=""
        className={`size-full transition-opacity duration-200 ${
          isPlaying ? "opacity-100" : "opacity-40"
        }`}
      />
    </button>
      {/* Same .nav-label component, timing and type as History. Figma's
        * sidebar has no authored name for this control, so it reuses the
        * button's own accessible name rather than inventing new copy. */}
      <div
        className="nav-label pointer-events-none flex flex-col items-start px-[8px]"
        data-shown={!disabled && hovered}
      >
        <p className="font-satoshi text-[16px] font-normal leading-[20px] tracking-[-0.32px] text-white whitespace-nowrap">
          Spotify
        </p>
        <p className="font-pretendard text-[15px] font-light leading-[16.9px] tracking-[-0.3px] text-white whitespace-nowrap">
          음악
        </p>
      </div>
    </div>
  );
}
