import { useSyncExternalStore } from "react";
import { Breakpoint, breakpoints } from "@/types/token";

export const useMediaQuery = (breakpoint: Breakpoint) => {
  const query = `(min-width: ${breakpoints[breakpoint]})`;

  return useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", callback);
      return () => {
        mediaQuery.removeEventListener("change", callback);
      };
    },
    () => window.matchMedia(query).matches,
    () => false
  );
};
