import clsx from "clsx";
import { FgColor, FontSize, FontWeight } from "@/types/token";
import styles from "./Text.module.css";

type H1Props = { as?: "h1" } & React.ComponentPropsWithoutRef<"h1">;
type H2Props = { as?: "h2" } & React.ComponentPropsWithoutRef<"h2">;
type H3Props = { as?: "h3" } & React.ComponentPropsWithoutRef<"h3">;
type SpanProps = { as?: "span" } & React.ComponentPropsWithoutRef<"span">;
type DivProps = { as?: "div" } & React.ComponentPropsWithoutRef<"div">;
type ParagraphProps = { as?: "p" } & React.ComponentPropsWithoutRef<"p">;
type LabelProps = { as?: "label" } & React.ComponentPropsWithoutRef<"label">;

export type TextProps = {
  variant?:
    | "heading20"
    | "heading24"
    | "heading30"
    | "label14"
    | "label16"
    | "body14"
    | "body16"
    | "caption12"
    | "caption14";
  size?: FontSize;
  weight?: FontWeight;
  color?: FgColor;
  truncate?: boolean;
} & (H1Props | H2Props | H3Props | SpanProps | DivProps | ParagraphProps | LabelProps);

export const Text = ({
  variant,
  size,
  weight,
  color,
  truncate,
  children,
  className,
  style,
  ...props
}: TextProps) => {
  const commonProps = {
    className: clsx(
      variant && styles[`${variant}`],
      size && styles.size,
      weight && styles.weight,
      color && styles.color,
      truncate && styles.truncate,
      className
    ),
    style: {
      "--font-size": size && `var(--font-size-${size})`,
      "--font-weight": weight && `var(--font-weight-${weight})`,
      "--color": color && `var(--fg-${color})`,
      ...style,
    } as React.CSSProperties,
  };

  switch (props.as) {
    case "h1":
      return (
        <h1 {...commonProps} {...props}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 {...commonProps} {...props}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 {...commonProps} {...props}>
          {children}
        </h3>
      );
    case "div":
      return (
        <div {...commonProps} {...props}>
          {children}
        </div>
      );
    case "p":
      return (
        <p {...commonProps} {...props}>
          {children}
        </p>
      );
    case "label":
      return (
        <label {...commonProps} {...props}>
          {children}
        </label>
      );
    case "span":
    default:
      return (
        <span {...commonProps} {...props}>
          {children}
        </span>
      );
  }
};
