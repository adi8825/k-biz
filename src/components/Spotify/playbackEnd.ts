/**
 * Deciding when the playlist has run out.
 *
 * Spotify's embed has no repeat option and fires no "playlist ended" event, so
 * looping means inferring the ending from the playback updates it does send.
 * That inference lives here, apart from the player, because it is the one piece
 * worth reasoning about on its own — and the one piece that can be checked
 * without a browser, an iframe and a ten-minute wait.
 *
 * What the embed actually does, measured from its own updates rather than taken
 * from the documentation:
 *
 *   {isPaused:false, position:29632, duration:29713, playingURI:"…x14mIZ"}
 *   {isPaused:false, position:29713, duration:29713, playingURI:"…x14mIZ"}
 *   {isPaused:false, position:29713, duration:29713, playingURI:"…x14mIZ"}
 *   {isPaused:false, position:0,     duration:29713, playingURI:"…eK03g1"}
 *
 * Three things follow, and each one shapes the rule below:
 *
 *  - It moves between tracks *without ever pausing*. `isPaused` stays false
 *    across the boundary, so an ending cannot be recognised by a pause.
 *  - `duration` is the length of what is actually playing — 29713ms, the
 *    30-second preview an anonymous listener gets — not the full track, so
 *    comparing position against it works.
 *  - The next track arrives about 90ms later, and identical updates repeat.
 *
 * So the end of the playlist is not a state the embed reports; it is the
 * *absence* of the next track. Reaching the end of a track arms a restart, and
 * any genuine movement afterwards disarms it. Mid-playlist the next track
 * always arrives long before the window is up, so only the last track's ending
 * survives it.
 */

/** The fields of a `playback_update` this needs. All times are milliseconds. */
export type PlaybackData = {
  isPaused: boolean;
  isBuffering: boolean;
  position: number;
  /** Length of what is currently playing. Optional because it is read
   * defensively — without it the loop stays off rather than guessing. */
  duration?: number;
  /** Which track is playing. Undocumented, but the embed sends it, and it is
   * what makes a new track distinguishable from a repeated update. */
  playingURI?: string;
};

/**
 * How close to the end still counts as having run out.
 *
 * The embed lands exactly on `duration` at a boundary, so this only has to
 * absorb the odd short update. Generous on purpose: the cost of being slightly
 * wrong is that a pause taken in the final second reads as an ending, which
 * restarts the music — which is what looping does anyway.
 */
export const END_EPSILON_MS = 1500;

/**
 * How long to wait for the next track before treating the end of a track as
 * the end of the playlist.
 *
 * Measured gap between tracks is about 90ms, so this is more than an order of
 * magnitude of headroom for a slow network without being long enough to hear
 * as a stall at the actual end.
 */
export const END_CONFIRM_MS = 2500;

/**
 * Where playback is, as one comparable value.
 *
 * Used to tell real movement from a repeated update: the embed re-sends the
 * same position, and a repeat must not be mistaken for the next track arriving,
 * or a pending restart would be disarmed forever and the playlist would simply
 * stop.
 */
export function progressSignature(data?: PlaybackData): string {
  return `${data?.playingURI ?? ""}|${data?.position ?? -1}`;
}

/**
 * Whether playback has run to the end of what it was playing.
 *
 * Deliberately narrow. It does not ask whether playback is paused, because the
 * embed does not pause between tracks; it asks whether the position reached the
 * end. A reader pausing mid-track answers no, which is what keeps the loop from
 * fighting the pause button.
 */
export function isAtTrackEnd(data?: PlaybackData): boolean {
  if (!data) return false;
  const { position, duration } = data;
  if (typeof duration !== "number" || !Number.isFinite(duration) || duration <= 0) return false;
  if (typeof position !== "number" || !Number.isFinite(position)) return false;
  if (position > 0 && position >= duration - END_EPSILON_MS) return true;
  /* Stopped and sitting at zero. Not observed at a boundary, but covered in
   * case the playlist's end rewinds instead of holding: a reader's pause never
   * lands exactly on zero, so this cannot be confused with one. */
  if (data.isPaused && position === 0) return true;
  return false;
}

/** What one update should do to a pending restart. */
export type LoopAction = "ignore" | "cancel" | "arm";

/**
 * The whole loop decision for a single update, as a pure step.
 *
 * `ignore` leaves any pending restart alone — the update carried no new
 * position, so it says nothing about whether the playlist moved on. `cancel`
 * means playback demonstrably moved, so an ending armed earlier did not turn
 * out to be the last one. `arm` starts the wait.
 */
export function loopAction(
  previousSignature: string,
  data: PlaybackData | undefined,
  hasPlayed: boolean,
): { signature: string; action: LoopAction } {
  const signature = progressSignature(data);
  if (signature === previousSignature) return { signature, action: "ignore" };
  if (hasPlayed && isAtTrackEnd(data)) return { signature, action: "arm" };
  return { signature, action: "cancel" };
}
