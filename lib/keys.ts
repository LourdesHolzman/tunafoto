export const KEYS = {
  left: "ArrowLeft",
  right: "ArrowRight",
} as const;

export type Key = (typeof KEYS)[keyof typeof KEYS];

export const PATHS = {
  home: "/",
  fotografia: "/fotografia",
} as const;

export type Path = (typeof PATHS)[keyof typeof PATHS];
