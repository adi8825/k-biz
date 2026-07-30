/** The panel slot every family shares. */
export const SLOT_WIDTH = 323;
export const SLOT_HEIGHT = 1136;

/**
 * One information panel that arrives as a single authored SVG.
 *
 * Shared by the Group Size and Nationality families, which are both exported
 * whole from Figma rather than transcribed into plates and text. It only places
 * the file: the artwork is the panel, so there is nothing to lay out and
 * nothing to restyle.
 *
 * The image is always drawn at its own intrinsic size and never fitted to the
 * slot, because these exports come out a little larger than the panel and
 * differ from each other — fitting would silently rescale the artwork and
 * distort it. Where it sits is the caller's decision, since the families were
 * exported to different conventions.
 */
export default function AuthoredSvgPanel({
  src,
  width,
  height,
  left,
  top,
  marker,
}: {
  src: string;
  /** The file's own pixel size. Rendered at exactly this. */
  width: number;
  height: number;
  /** Panel-local position of the image's top-left corner. */
  left: number;
  top: number;
  /** Per-family `data-` attribute, so each family stays identifiable. */
  marker?: Record<string, string>;
}) {
  return (
    <div className="absolute inset-0" {...marker}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="absolute block max-w-none"
        style={{ left, top, width, height }}
      />
    </div>
  );
}
