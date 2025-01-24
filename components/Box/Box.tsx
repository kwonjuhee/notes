import clsx from "clsx";
import { getLayoutCustomProperties, LayoutProps } from "@/types/layout";
import { Color, Radius } from "@/types/token";
import styles from "./Box.module.css";

type Display = "none" | "inline" | "block";

type StyleProps = {
  backgroundColor?: Color;
  borderWidth?: string;
  borderTopWidth?: string;
  borderRightWidth?: string;
  borderBottomWidth?: string;
  borderLeftWidth?: string;
  borderColor?: Color;
  borderRadius?: Radius;
};

export interface BoxProps extends React.ComponentPropsWithoutRef<"div">, LayoutProps, StyleProps {
  display?: Display;
}

export const Box = ({ display = "block", style, className, children, ...props }: BoxProps) => {
  const { layoutCustomProperties, restProps } = getLayoutCustomProperties(props);
  const { boxCustomProperties, boxProps } = getBoxCustomProperties(restProps);

  return (
    <div
      style={{
        ...layoutCustomProperties,
        ...boxCustomProperties,
        ...style,
      }}
      className={clsx(styles.box, styles[`display-${display}`], className)}
      {...boxProps}
    >
      {children}
    </div>
  );
};

const getBoxCustomProperties = (props: BoxProps) => {
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
  return {
    boxCustomProperties: {
      "--background-color": backgroundColor ? `var(--bg-${backgroundColor}-subtle)` : undefined,
      "--border-width": borderWidth,
      "--border-top-width": borderTopWidth,
      "--border-right-width": borderRightWidth,
      "--border-bottom-width": borderBottomWidth,
      "--border-left-width": borderLeftWidth,
      "--border-color": borderColor ? `var(--border-${borderColor})` : undefined,
      "--border-radius": borderRadius ? `var(--radius-${borderRadius})` : undefined,
    },
    boxProps: rest,
  };
};
