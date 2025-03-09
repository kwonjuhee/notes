import { Breakpoint, breakpoints } from "./token";

export type Responsive<T> = T | Partial<Record<Breakpoint, T>>;

export const isResponsiveObject = <T>(
  prop: Responsive<T>
): prop is Partial<Record<Breakpoint, T>> => {
  return (
    typeof prop === "object" &&
    prop !== null &&
    Object.keys(prop).some((key) => breakpoints[key as Breakpoint])
  );
};

export type CustomProperty = `--${string}`;

export type ResponsiveProps<T extends object> = {
  [K in Breakpoint]?: Omit<T, Breakpoint>;
};
