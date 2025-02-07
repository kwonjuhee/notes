import clsx from "clsx";
import { getLayoutCustomProperties, LayoutProps } from "@/types/layout";
import { Responsive } from "@/types/responsive";
import { Color, Radius } from "@/types/token";
import { formatValue, getResponsiveCustomProperties } from "@/utils/responsive";
import styles from "./Box.module.css";

type Display = "none" | "inline" | "block";

type StyleProps = {
  backgroundColor?: Responsive<Color>;
  borderWidth?: Responsive<string>;
  borderTopWidth?: Responsive<string>;
  borderRightWidth?: Responsive<string>;
  borderBottomWidth?: Responsive<string>;
  borderLeftWidth?: Responsive<string>;
  borderColor?: Responsive<Color>;
  borderRadius?: Responsive<Radius>;
};

export interface BoxProps extends React.ComponentPropsWithoutRef<"div">, LayoutProps, StyleProps {
  display?: Responsive<Display>;
}

export const Box = ({ style, className, children, ...props }: BoxProps) => {
  const { layoutCustomProperties, restProps } = getLayoutCustomProperties(props);
  const { boxCustomProperties, boxProps } = getBoxCustomProperties(restProps);

  return (
    <div
      style={{
        ...layoutCustomProperties,
        ...boxCustomProperties,
        ...style,
      }}
      className={clsx(styles.box, className)}
      {...boxProps}
    >
      {children}
    </div>
  );
};

const getBoxCustomProperties = (props: BoxProps) => {
  const {
    display,
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
    "--display": display,
    "--background-color": backgroundColor
      ? formatValue(backgroundColor, (v: string) => `var(--bg-${v}-subtle)`)
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
    boxCustomProperties: responsiveCustomProperties,
    boxProps: rest,
  };
};
