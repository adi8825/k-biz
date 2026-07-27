/** Base geometry shared by every editorial element. Coordinates are
 * panel-local design pixels — i.e. the same x/y/width/height numbers Figma's
 * inspector shows, relative to the panel's own top-left (0,0), matching the
 * technique already used for Timeline/NavBar/the header. NOT percentages —
 * ScaleStage scales the whole page uniformly, so fixed pixel values here
 * already preserve the composition at any viewport size. */
type EditorialElementBase = {
  x: number;
  y: number;
  width: number;
  height: number;
  /** Omit to stack in array order; set only to deliberately break that order
   * (e.g. a shape peeking from behind a photo). */
  zIndex?: number;
  rotation?: number;
  borderRadius?: number;
};

export type ImageElement = EditorialElementBase & {
  type: "image";
  src: string;
  alt?: string;
  /** Omit to match plain <img> stretch-to-box behavior (no cropping) —
   * only set when a group's composition actually needs a crop. */
  objectFit?: "cover" | "contain";
  objectPosition?: string;
};

export type ShapeElement = EditorialElementBase & {
  type: "shape";
  asset: string;
};

/**
 * Type scale for editorial text. `body` is the original pair — Satoshi 16/20
 * and Pretendard Light 15/16.9 — and stays the default, so every existing
 * element renders exactly as before. The rest were measured off the category
 * pages, which carry stat figures and labels the General page never had.
 */
export type TextVariant = "body" | "label-sm" | "label-lg" | "stat-md" | "stat-lg";

export type TextElement = EditorialElementBase & {
  type: "text";
  lang: "en" | "ko";
  /** Omit for the original body scale. */
  variant?: TextVariant;
  /** A plain string wraps naturally within `width` — use this when Figma
   * itself didn't hand-break the text (e.g. BTS's facts). An array renders
   * each item as its own explicit line — use this to preserve Figma's exact
   * manual line breaks (e.g. NewJeans' facts). */
  text: string | string[];
  align?: "left" | "center" | "right";
};

/** One flat, ordered array — no row/grid container type. Two elements that
 * happen to share a similar `y` render side by side naturally; nothing
 * dedicated to "rows" is needed. */
export type EditorialElement = ImageElement | ShapeElement | TextElement;

/** Documented reference only — NOT enforced via collision detection.
 * Where the charm renders, in the same panel-local coordinate space as
 * editorial elements, so a composition can be designed around it (or
 * deliberately behind/in front of it via zIndex). */
export const CHARM_REGION = { x: 11.373, y: 136, width: 130.254, height: 544 } as const;

/** Content shape for the "General" panel variant.
 * `name` / `debutYear` / `charmAsset` / `koColor` come from groups.json
 * (see content/groups/<id>/general.ts). `nameKo`, `heroPhoto`, and
 * `elements` have no field in the dataset and stay authored per-group in
 * the content file — heroPhoto is part of the fixed header slot but is
 * presentation content, not structured data, so it lives here rather than
 * in groups.json. */
export type GroupGeneralContent = {
  name: string;
  nameKo: string;
  /**
   * Present only on a category page (Nationality / Language / Formation /
   * Status). When set, the header renders this heading where the General page
   * renders its Debut badge, and uses the category page's own title and hero
   * geometry. Omit it and the panel is byte-identical to before.
   */
  heading?: { en: string; ko: string };
  /**
   * The large charm exactly as this page's Figma frame draws it — the part
   * this page belongs to at full strength, the rest at 0.25. Falls back to
   * `charmAsset` (the plain, fully-lit charm) where a page has not been
   * transcribed yet.
   */
  charmState?: string;
  /** Folder holding this group's five sliced charm parts. */
  charmPartsBase?: string;
  /** The group's charm accent colour — sourced from `group.charm.color`. */
  koColor: string;
  charmAsset: string;
  debutYear: string;
  heroPhoto: string;
  elements: EditorialElement[];
};
