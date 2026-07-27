export type IconKey =
  | "generation"
  | "nationality"
  | "type"
  | "formation"
  | "language"
  | "status"
  | "size"
  | "about"
  | "back"
  | "mode";

export const iconSrc: Record<IconKey, { default: string; picked?: string }> = {
  /* Figma’s own keyboard_backspace, from the About_Screens Nav_Bar. */
  back: { default: "/mainscreen/icons/keyboard_backspace.svg" },
  generation: {
    default: "/mainscreen/icons/supervisor_default.svg",
    picked: "/mainscreen/icons/supervisor_picked.svg",
  },
  nationality: {
    default: "/mainscreen/icons/japanese_flag_default.svg",
    picked: "/mainscreen/icons/japanese_flag_picked.svg",
  },
  type: {
    default: "/mainscreen/icons/transgender_default.svg",
    picked: "/mainscreen/icons/transgender_picked.svg",
  },
  formation: {
    default: "/mainscreen/icons/diversity_default.svg",
    picked: "/mainscreen/icons/diversity_picked.svg",
  },
  language: {
    default: "/mainscreen/icons/language_korean_default.svg",
    picked: "/mainscreen/icons/language_korean_picked.svg",
  },
  status: {
    default: "/mainscreen/icons/add_task.svg",
  },
  size: {
    default: "/mainscreen/icons/reduce_capacity.svg",
  },
  about: {
    default: "/mainscreen/icons/info.svg",
  },
  mode: {
    default: "/mainscreen/icons/radio_unchecked.svg",
    picked: "/mainscreen/icons/radio_checked.svg",
  },
};
