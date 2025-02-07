import { getResponsiveCustomProperties } from "@/utils/responsive";
import { Responsive } from "./responsive";

export type MarginProps = {
  margin?: Responsive<string>;
  marginX?: Responsive<string>;
  marginY?: Responsive<string>;
  marginTop?: Responsive<string>;
  marginRight?: Responsive<string>;
  marginBottom?: Responsive<string>;
  marginLeft?: Responsive<string>;
};

export type PaddingProps = {
  padding?: Responsive<string>;
  paddingX?: Responsive<string>;
  paddingY?: Responsive<string>;
  paddingTop?: Responsive<string>;
  paddingRight?: Responsive<string>;
  paddingBottom?: Responsive<string>;
  paddingLeft?: Responsive<string>;
};

export type Overflow = "visible" | "hidden" | "clip" | "scroll" | "auto";

export type WidthAndHeightProps = {
  width?: Responsive<string>;
  minWidth?: Responsive<string>;
  maxWidth?: Responsive<string>;
  height?: Responsive<string>;
  minHeight?: Responsive<string>;
  maxHeight?: Responsive<string>;
  overflow?: Responsive<Overflow>;
  overflowX?: Responsive<Overflow>;
  overflowY?: Responsive<Overflow>;
};

export type Position = "static" | "relative" | "absolute" | "fixed" | "sticky";

export type PositionProps = {
  position?: Responsive<Position>;
  top?: Responsive<string>;
  right?: Responsive<string>;
  bottom?: Responsive<string>;
  left?: Responsive<string>;
};

export type FlexItemProps = {
  flexBasis?:
    | "auto"
    | "max-content"
    | "min-content"
    | "fit-content"
    | "content"
    | Responsive<string>;
  flexGrow?: Responsive<number>;
  flexShrink?: Responsive<number>;
};

export type LayoutProps = MarginProps &
  PaddingProps &
  WidthAndHeightProps &
  PositionProps &
  FlexItemProps;

export const getLayoutCustomProperties = (props: LayoutProps) => {
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
    overflow,
    overflowX,
    overflowY,
    position,
    top,
    right,
    bottom,
    left,
    flexBasis,
    flexGrow,
    flexShrink,
    ...rest
  } = props;
  const responsiveCustomProperties = getResponsiveCustomProperties({
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
    "--overflow": overflow,
    "--overflow-x": overflowX,
    "--overflow-y": overflowY,
    "--position": position,
    "--top": top,
    "--right": right,
    "--bottom": bottom,
    "--left": left,
    "--flex-basis": flexBasis,
    "--flex-grow": flexGrow,
    "--flex-shrink": flexShrink,
  });

  return {
    layoutCustomProperties: responsiveCustomProperties,
    restProps: rest,
  };
};
