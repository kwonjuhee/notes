import clsx from "clsx";
import { getLayoutCustomProperties, LayoutProps } from "@/types/layout";
import styles from "./Flex.module.css";

type Display = "none" | "inline-flex" | "flex";
type Direction = "row" | "column" | "row-reverse" | "column-reverse";
type Align = "start" | "center" | "end" | "baseline" | "stretch";
type Justify = "start" | "center" | "end" | "space-between";
type Wrap = "wrap" | "wrap-reverse";

export interface FlexProps extends LayoutProps, React.ComponentPropsWithoutRef<"div"> {
  display?: Display;
  direction?: Direction;
  align?: Align;
  justify?: Justify;
  wrap?: Wrap;
  gap?: number;
}

export const Flex = ({
  display = "flex",
  direction = "row",
  align = "start",
  justify = "start",
  wrap,
  gap = 0,
  className,
  children,
  style,
  ...props
}: FlexProps) => {
  const { layoutCustomProperties, restProps } = getLayoutCustomProperties(props);

  return (
    <div
      style={
        {
          ...layoutCustomProperties,
          "--flex-gap": `${gap}px`,
          ...style,
        } as React.CSSProperties
      }
      className={clsx(
        styles.flex,
        styles[`display-${display}`],
        styles[`direction-${direction}`],
        styles[`align-${align}`],
        styles[`justify-${justify}`],
        wrap && styles[`${wrap}`],
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
};
