import clsx from "clsx";
import { getLayoutCustomProperties, LayoutProps } from "@/types/layout";
import { Responsive } from "@/types/responsive";
import { getStyleCustomProperties, StyleProps } from "@/types/styleProps";
import { getResponsiveCustomProperties } from "@/utils/responsive";
import styles from "./Box.module.css";

type Display = "none" | "inline" | "block";

export interface BoxProps extends React.ComponentPropsWithoutRef<"div">, LayoutProps, StyleProps {
  display?: Responsive<Display>;
}

export const Box = ({ style, className, children, ...props }: BoxProps) => {
  const { layoutCustomProperties, restProps } = getLayoutCustomProperties(props);
  const { styleCustomProperties, restProps: restProps_ } = getStyleCustomProperties(restProps);
  const { boxCustomProperties, boxProps } = getBoxCustomProperties(restProps_);

  return (
    <div
      style={{
        ...layoutCustomProperties,
        ...styleCustomProperties,
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
  const { display, ...rest } = props;
  const responsiveCustomProperties = getResponsiveCustomProperties({
    "--display": display,
  });

  return {
    boxCustomProperties: responsiveCustomProperties,
    boxProps: rest,
  };
};
