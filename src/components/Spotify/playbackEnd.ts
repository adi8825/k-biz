/**
 * Deciding when the playlist has run out.
 *
 * Spotify's embed has no repeat option and fires no "playlist ended" event, so
 * looping means inferring the ending from the playback updates it does send.
 * That inference lives here, apart from the player itself, because it is the
 * one piece of this that is worth reasoning about on its own — and the one
 * piece that can be checked without a browser, an iframe and a ten-minute wait.
 */

/** The fields of a `playback_update` this needs. All times are milliseconds. */
export type PlaybackData = {
  isPaused: boolean;
  isBuffering: boolean;
  position: number;
  /** Length of the current track. Optional because it is read defensively —
   * without it the loop stays off rather than guessing. */
  duration?: number;
};

/**
 * How close to the end still counts as "it finished by itself".
 *
 * The embed reports position in coarse steps, so the last update before a stop
 * can land short of the duration. Generous on purpose: the cost of being
 * slightly wrong here is only that a pause taken in the final second reads as
 * an ending, which restarts the music — which is what looping does anyway.
 */
export const END_EPSILON_MS = 1500;

/**
 * How long a stop has to last before it is treated as the end of the playlist.
 *
 * The thing an ending must not be confused with is the gap between two tracks.
 * This wait is what separates them: between tracks the embed picks itself up
 * again well inside this window, so only a stop that stays a stop survives it.
 */
export const END_CONFIRM_MS = 2500;

/**
 * Whether an update describes playback that ran out rather than a reader who
 * pressed pause.
 *
 * Deliberately conservative: it answers yes only for a stop sitting at the end
 * of a track that actually played. A pause taken in the middle answers no,
 * which is what keeps the loop from fighting the reader's own pause button.
 */
export function isStoppedAtEnd(data: PlaybackData | undefined): boolean {
  if (!data || !data.isPaused) return false;
  const { position, duration } = data;
  if (typeof duration !== "number" || !Number.isFinite(duration) || duration <= 0) return false;
  if (typeof position !== "number" || !Number.isFinite(position) || position <= 0) return false;
  return position >= duration - END_EPSILON_MS;
}
