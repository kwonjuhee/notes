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
      "--margin": margin,
      "--margin-left": marginLeft,
      "--margin-x": marginX,
      "--margin-y": marginY,
      "--margin-top": marginTop,
      "--margin-right": marginRight,
      "--margin-bottom": marginBottom,
      "--padding": padding,
      "--padding-x": paddingX,
      "--padding-y": paddingY,
      "--padding-top": paddingTop,
      "--padding-right": paddingRight,
      "--padding-bottom": paddingBottom,
      "--padding-left": paddingLeft,
      "--width": width,
      "--min-width": minWidth,
      "--max-width": maxWidth,
      "--height": height,
      "--min-height": minHeight,
      "--max-height": maxHeight,
      "--position": position,
      "--top": top,
      "--right": right,
      "--bottom": bottom,
      "--left": left,
      "--flex-basis": flexBasis,
      "--flex-grow": flexGrow,
      "--flex-shrink": flexShrink,
      "--background-color": `var(--bg-${backgroundColor}-subtle)`,
      "--border-width": borderWidth,
      "--border-top-width": borderTopWidth,
      "--border-right-width": borderRightWidth,
      "--border-bottom-width": borderBottomWidth,
      "--border-left-width": borderLeftWidth,
      "--border-color": `var(--border-${borderColor})`,
      "--border-radius": `var(--radius-${borderRadius})`,
    },
    boxProps: rest,
  };
};
