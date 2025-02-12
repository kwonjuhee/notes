import { createContext, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getValidTheme, Theme, ThemeStorageKey, updateDOMTheme } from "./shared";

export type ThemeContextValue = {
  theme?: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useThemeContextValue();

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeContextValue = () => {
  const { value: _theme, set: _setTheme } = useLocalStorage<Theme>(ThemeStorageKey);

  const theme = _theme ? getValidTheme(_theme) : undefined;

  const setTheme = (theme: Theme) => {
    updateDOMTheme(theme);
    _setTheme(theme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  useEffect(() => {
    if (theme) {
      setTheme(theme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return { theme, setTheme, toggleTheme };
};
