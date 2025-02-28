import clsx from "clsx";
import { forwardRef } from "react";
import { getLayoutCustomProperties, LayoutProps } from "@/types/layout";
import { Responsive } from "@/types/responsive";
import { getStyleCustomProperties, StyleProps } from "@/types/styleProps";
import { formatValue, getResponsiveCustomProperties } from "@/utils/responsive";
import styles from "./Flex.module.css";

type Display = "none" | "inline-flex" | "flex";
type Direction = "row" | "column" | "row-reverse" | "column-reverse";
type Align = "start" | "center" | "end" | "baseline" | "stretch";
type Justify = "start" | "center" | "end" | "space-between";
type Wrap = "nowrap" | "wrap" | "wrap-reverse";

export interface FlexProps extends LayoutProps, StyleProps, React.ComponentPropsWithoutRef<"div"> {
  display?: Responsive<Display>;
  direction?: Responsive<Direction>;
  align?: Responsive<Align>;
  justify?: Responsive<Justify>;
  wrap?: Responsive<Wrap>;
  gap?: Responsive<number>;
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ className, style, children, ...props }, ref) => {
    const { layoutCustomProperties, restProps } = getLayoutCustomProperties(props);
    const { styleCustomProperties, restProps: restProps_ } = getStyleCustomProperties(restProps);
    const { flexCustomProperties, flexProps } = getFlexCustomProperties(restProps_);

    return (
      <div
        ref={ref}
        style={{
          ...layoutCustomProperties,
          ...styleCustomProperties,
          ...flexCustomProperties,
          ...style,
        }}
        className={clsx(styles.flex, className)}
        {...flexProps}
      >
        {children}
      </div>
    );
  }
);

Flex.displayName = "Flex";

const getFlexCustomProperties = (props: FlexProps) => {
  const { display, direction, align, justify, wrap, gap = 0, ...rest } = props;
  const responsiveCustomProperties = getResponsiveCustomProperties({
    "--display": display,
    "--direction": direction,
    "--align": align,
    "--justify": justify,
    "--wrap": wrap,
    "--gap": formatValue(gap, (v: number) => `${v}px`),
  });

  return {
    flexCustomProperties: responsiveCustomProperties,
    flexProps: rest,
  };
};
