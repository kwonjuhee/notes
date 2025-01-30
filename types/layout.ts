export type MarginProps = {
  margin?: string;
  marginX?: string;
  marginY?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
};

export type PaddingProps = {
  padding?: string;
  paddingX?: string;
  paddingY?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
};

export type Overflow = "visible" | "hidden" | "clip" | "scroll" | "auto";

export type WidthAndHeightProps = {
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

export type Position = "static" | "relative" | "absolute" | "fixed" | "sticky";

export type PositionProps = {
  position?: Position;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
};

export type FlexItemProps = {
  flexBasis?: "auto" | "max-content" | "min-content" | "fit-content" | "content" | string;
  flexGrow?: number;
  flexShrink?: number;
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
  return {
    layoutCustomProperties: {
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
    },
    restProps: rest,
  };
};
