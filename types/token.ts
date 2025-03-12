import colorTokens from "@/styles/tokens/vars/color";
import darkThemeTokens from "@/styles/tokens/vars/dark-theme";
import lightThemeTokens from "@/styles/tokens/vars/light-theme";

type ExtractColor<Token extends string> = Token extends `${infer Color}-${string}` ? Color : never;
type RemovePrefix<
  Value extends string,
  Prefix extends string,
> = Value extends `${Prefix}${infer Rest}` ? Rest : never;

export type ColorToken = keyof typeof colorTokens;
export type SemanticColorToken = keyof typeof lightThemeTokens | keyof typeof darkThemeTokens;

export type Color = ExtractColor<ColorToken>;
export type BgColor = RemovePrefix<SemanticColorToken, "bg-">;
export type FgColor = RemovePrefix<SemanticColorToken, "fg-">;

export type FontSize = (typeof fontSize)[number];
export type FontWeight = (typeof fontWeight)[number];
export type Radius = (typeof radius)[number];
export type Breakpoint = keyof typeof breakpoints;

// prettier-ignore
export const colors: Color[] = [
  "gray", "brand", "red", "yellow", "green",
  "bluegray", "bluelight", "blue", "indigo",
  "purple", "pink", "rose", "orange"
];

export const fontSize = [11, 12, 14, 16, 20, 24, 30] as const;
export const fontWeight = ["light", "regular", "medium", "semibold", "bold", "extrabold"] as const;

export const radius = ["none", "small", "medium", "large", "xlarge", "full"] as const;
export const breakpoints = {
  base: "0px",
  sm: "768px",
  md: "1024px",
  lg: "1280px",
} as const;
