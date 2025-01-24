import clsx from "clsx";
import { Color, Radius } from "@/types/token";
import styles from "./Box.module.css";

type Display = "none" | "inline" | "block";
type MarginProps = {
  margin?: string;
  marginX?: string;
  marginY?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
};
type PaddingProps = {
  padding?: string;
  paddingX?: string;
  paddingY?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
};
type Overflow = "visible" | "hidden" | "clip" | "scroll" | "auto";
type WidthAndHeightProps = {
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  overflow?: Overflow;
  overflowX?: Overflow;
  overflowY?: Overflow;
};
type Position = "static" | "relative" | "absolute" | "fixed" | "sticky";
type PositionProps = {
  position?: Position;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
};
type FlexItemProps = {
  flexBasis?: "auto" | "max-content" | "min-content" | "fit-content" | "content" | string;
  flexGrow?: number;
  flexShrink?: number;
};
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

export interface BoxProps
  extends React.ComponentPropsWithoutRef<"div">,
    MarginProps,
    PaddingProps,
    WidthAndHeightProps,
    PositionProps,
    FlexItemProps,
    StyleProps {
  display?: Display;
}

export const Box = ({ display = "block", style, className, children, ...props }: BoxProps) => {
  const { boxCustomProperties, boxProps } = getBoxCustomProperties(props);

  return (
    <div
      style={{
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
    margin,
    marginX,
    marginY,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    position,
    top,
    right,
    bottom,
    left,
    flexBasis,
    flexGrow,
    flexShrink,
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
      "--box-margin": margin,
      "--box-margin-left": marginLeft,
      "--box-margin-x": marginX,
      "--box-margin-y": marginY,
      "--box-margin-top": marginTop,
      "--box-margin-right": marginRight,
      "--box-margin-bottom": marginBottom,
      "--box-padding": padding,
      "--box-padding-x": paddingX,
      "--box-padding-y": paddingY,
      "--box-padding-top": paddingTop,
      "--box-padding-right": paddingRight,
      "--box-padding-bottom": paddingBottom,
      "--box-padding-left": paddingLeft,
      "--box-width": width,
      "--box-min-width": minWidth,
      "--box-max-width": maxWidth,
      "--box-height": height,
      "--box-min-height": minHeight,
      "--box-max-height": maxHeight,
      "--box-position": position,
      "--box-top": top,
      "--box-right": right,
      "--box-bottom": bottom,
      "--box-left": left,
      "--box-flex-basis": flexBasis,
      "--box-flex-grow": flexGrow,
      "--box-flex-shrink": flexShrink,
      "--box-background-color": `var(--bg-${backgroundColor}-subtle)`,
      "--box-border-width": borderWidth,
      "--box-border-top-width": borderTopWidth,
      "--box-border-right-width": borderRightWidth,
      "--box-border-bottom-width": borderBottomWidth,
      "--box-border-left-width": borderLeftWidth,
      "--box-border-color": `var(--border-${borderColor})`,
      "--box-border-radius": `var(--radius-${borderRadius})`,
    },
    boxProps: rest,
  };
};
