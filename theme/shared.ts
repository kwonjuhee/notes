export type Theme = "light" | "dark";

export const isValidTheme = (theme: string): theme is Theme =>
  theme === "light" || theme === "dark";

export const getValidTheme = (theme: string) => {
  return isValidTheme(theme) ? theme : defaultTheme;
};

export const updateDOMTheme = (theme: Theme) => {
  document.body.setAttribute(themeDataAttribute, theme);
};

export const defaultTheme = "light" as const;

export const themeDataAttribute = "data-theme";

export const ThemeStorageKey = "theme";
