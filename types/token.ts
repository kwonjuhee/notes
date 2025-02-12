export const color = ["brand", "gray"] as const;
export const fontSize = [11, 12, 14, 16, 20, 24, 30] as const;
export const fontWeight = ["light", "regular", "medium", "semibold", "bold", "extrabold"] as const;
export const textColor = [
  "bold",
  "subtle",
  "subtlest",
  "brand-bold",
  "brand-default",
  "brand-subtle",
] as const;
export const radius = ["none", "small", "medium", "large", "xlarge", "full"] as const;
export const breakpoints = {
  base: "0px",
  sm: "768px",
  md: "1024px",
  lg: "1280px",
} as const;

export type Color = (typeof color)[number];
export type FontSize = (typeof fontSize)[number];
export type FontWeight = (typeof fontWeight)[number];
export type TextColor = (typeof textColor)[number];
export type Radius = (typeof radius)[number];
export type Breakpoint = keyof typeof breakpoints;
