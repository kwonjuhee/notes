import { formatValue, getResponsiveCustomProperties } from "@/utils/responsive";
import { Responsive } from "./responsive";
import { BgColor, Color, Radius } from "./token";

export type StyleProps = {
  backgroundColor?: Responsive<BgColor>;
  borderWidth?: Responsive<string>;
  borderTopWidth?: Responsive<string>;
  borderRightWidth?: Responsive<string>;
  borderBottomWidth?: Responsive<string>;
  borderLeftWidth?: Responsive<string>;
  borderColor?: Responsive<Color>;
  borderRadius?: Responsive<Radius>;
};

export const getStyleCustomProperties = (props: StyleProps) => {
  const {
    backgroundColor,
    borderWidth,
    borderTopWidth,
    borderRightWidth,
    borderBottomWidth,
    borderLeftWidth,
    borderColor,
    borderRadius,
    ...rest
  } = props;
  const responsiveCustomProperties = getResponsiveCustomProperties({
    "--background-color": backgroundColor
      ? formatValue(backgroundColor, (v: BgColor) => `var(--bg-${v})`)
      : undefined,
    "--border-width": borderWidth,
    "--border-top-width": borderTopWidth,
    "--border-right-width": borderRightWidth,
    "--border-bottom-width": borderBottomWidth,
    "--border-left-width": borderLeftWidth,
    "--border-color": borderColor
      ? formatValue(borderColor, (v: string) => `var(--border-${v})`)
      : undefined,
    "--border-radius": borderRadius
      ? formatValue(borderRadius, (v: string) => `var(--radius-${v})`)
      : undefined,
  });

  return {
    styleCustomProperties: responsiveCustomProperties,
    restProps: rest,
  };
};
