import { CustomProperty, isResponsiveObject, Responsive } from "@/types/responsive";
import { Breakpoint } from "@/types/token";

export const getResponsiveCustomProperties = <Value extends string | number>(
  customProperties: Record<CustomProperty, Responsive<Value> | undefined>
) => {
  const responsiveCustomProperties: Record<CustomProperty, Value> = {};

  (Object.entries(customProperties) as [CustomProperty, Responsive<Value> | undefined][]).forEach(
    ([key, prop]) => {
      if (isResponsiveObject(prop)) {
        (Object.entries(prop) as [Breakpoint, Value][]).forEach(([bp, value]) => {
          const bpPrefix = bp === "base" ? "--" : `--${bp}-`;
          const bpProperty = `${bpPrefix}${key.replace(/^--/, "")}` as CustomProperty;
          responsiveCustomProperties[bpProperty] = value;
        });
      } else if (prop !== undefined) {
        responsiveCustomProperties[key] = prop;
      }
    }
  );

  return responsiveCustomProperties;
};

export const formatValue = <Value extends string | number>(
  value: Responsive<Value>,
  format: (value: Value) => string
) => {
  if (isResponsiveObject(value)) {
    return Object.fromEntries(Object.entries(value).map(([bp, value]) => [bp, format(value)]));
  }

  return format(value);
};
