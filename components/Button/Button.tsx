import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { Color, Radius } from "@/types/token";
import styles from "./Button.module.css";

type Size = "small" | "medium" | "large";
type Variant = "solid" | "subtle" | "outline" | "ghost";

export interface CommonButtonProps {
  size?: Size;
  variant?: Variant;
  color?: Color;
  radius?: Radius;
  fullWidth?: boolean;
}

export interface ButtonProps
  extends CommonButtonProps,
    Omit<React.ComponentPropsWithoutRef<"button">, "color"> {}

export interface AnchorProps
  extends CommonButtonProps,
    LinkProps,
    Omit<React.ComponentPropsWithoutRef<"a">, "color" | keyof LinkProps> {}

export const Button = ({
  size = "medium",
  variant = "solid",
  color = "brand",
  radius = "medium",
  fullWidth = false,
  style,
  className,
  children,
  ...props
}: ButtonProps | AnchorProps) => {
  const buttonStyle = { "--radius": `var(--radius-${radius})`, ...style } as React.CSSProperties;
  const buttonClassName = clsx(
    styles.button,
    styles[`size-${size}`],
    styles[`variant-${variant}`],
    styles[`color-${color}`],
    fullWidth && styles.fullWidth,
    className
  );

  if ("href" in props) {
    return (
      <Link style={buttonStyle} className={buttonClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button style={buttonStyle} className={buttonClassName} {...props}>
      {children}
    </button>
  );
};
