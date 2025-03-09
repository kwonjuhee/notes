import clsx from "clsx";
import { getLayoutCustomProperties, LayoutProps } from "@/types/layout";
import { CustomProperty, Responsive, ResponsiveProps } from "@/types/responsive";
import { getStyleCustomProperties, StyleProps } from "@/types/styleProps";
import { Breakpoint, breakpoints } from "@/types/token";
import { getResponsiveCustomProperties } from "@/utils/responsive";
import styles from "./Box.module.css";

type Display = "none" | "inline" | "block";

export interface BoxProps
  extends React.ComponentPropsWithoutRef<"div">,
    LayoutProps,
    StyleProps,
    ResponsiveProps<BoxProps> {
  display?: Responsive<Display>;
}

export const Box = ({ style, className, children, ...props }: BoxProps) => {
  const { customProperties, boxProps } = getCustomProperties(props);

  return (
    <div
      style={{
        ...customProperties,
        ...style,
      }}
      className={clsx(styles.box, className)}
      {...boxProps}
    >
      {children}
    </div>
  );
};

const getCustomProperties = (props: BoxProps) => {
  const { base, sm, md, lg, ...rest } = props;
  const layout = getLayoutCustomProperties(rest);
  const style = getStyleCustomProperties(layout.restProps);
  const box = getBoxCustomProperties(style.restProps);
  const responsivePropsCustomProperties = getResponsivePropsCustomProperties({
    base,
    sm,
    md,
    lg,
  });

  return {
    customProperties: {
      ...layout.layoutCustomProperties,
      ...style.styleCustomProperties,
      ...box.boxCustomProperties,
      ...responsivePropsCustomProperties,
    },
    boxProps: box.boxProps,
  };
};

const getBoxCustomProperties = (props: BoxProps) => {
  const { display, ...rest } = props;
  const responsiveCustomProperties = getResponsiveCustomProperties({
    "--display": display,
  });

  return {
    boxCustomProperties: responsiveCustomProperties,
    boxProps: rest,
  };
};

const getResponsivePropsCustomProperties = (props: ResponsiveProps<Record<string, unknown>>) => {
  const responsivePropsCustomProperties: Record<CustomProperty, unknown> = {};

  (Object.keys(breakpoints) as Breakpoint[]).forEach((bp) => {
    if (!props[bp]) return;

    const { layoutCustomProperties, restProps } = getLayoutCustomProperties(props[bp]);
    const { styleCustomProperties, restProps: restProps_ } = getStyleCustomProperties(restProps);
    const { boxCustomProperties } = getBoxCustomProperties(restProps_);

    Object.entries({
      ...layoutCustomProperties,
      ...styleCustomProperties,
      ...boxCustomProperties,
    }).forEach(([key, value]) => {
      const bpPrefix = bp === "base" ? "--" : `--${bp}-`;
      const bpProperty = `${bpPrefix}${key.replace(/^--/, "")}` as CustomProperty;
      responsivePropsCustomProperties[bpProperty] = value;
    });
  });

  return responsivePropsCustomProperties;
};
