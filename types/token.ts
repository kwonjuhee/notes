export const fontSize = [11, 12, 14, 16, 20, 24, 30] as const;
export const fontWeight = ["light", "regular", "medium", "semibold", "bold", "extrabold"] as const;

export type FontSize = (typeof fontSize)[number];
export type FontWeight = (typeof fontWeight)[number];
