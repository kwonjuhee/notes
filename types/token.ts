export const color = ["brand", "green", "blue", "orange", "gray"] as const;
export const bgColor = {
  page: "--bg-page",
  surface: "--bg-surface",
  "surface-subtle": "--bg-surface-subtle",
  floating: "--bg-floating",
  "gray-subtle": "--bg-gray-subtle",
  "gray-solid": "--bg-gray-solid",
  "brand-subtle": "--bg-brand-subtle",
  "brand-solid": "--bg-brand-solid",
  transparent: "--bg-transparent",
} as const;

export const fontSize = [11, 12, 14, 16, 20, 24, 30] as const;
export const fontWeight = ["light", "regular", "medium", "semibold", "bold", "extrabold"] as const;

export const fgColor = [
  "neutral",
  "neutral-bold",
  "neutral-muted",
  "neutral-subtle",
  "gray",
  "gray-contrast",
  "brand",
  "brand-contrast",
] as const;

export const radius = ["none", "small", "medium", "large", "xlarge", "full"] as const;
export const breakpoints = {
  base: "0px",
  sm: "768px",
  md: "1024px",
  lg: "1280px",
} as const;

export type Color = (typeof color)[number];
export type BgColor = keyof typeof bgColor;
export type FontSize = (typeof fontSize)[number];
export type FontWeight = (typeof fontWeight)[number];
export type FgColor = (typeof fgColor)[number];
export type Radius = (typeof radius)[number];
export type Breakpoint = keyof typeof breakpoints;
