import clsx from "clsx";
import { FontSize, FontWeight } from "@/types/token";
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
} & (H1Props | H2Props | H3Props | SpanProps | DivProps | ParagraphProps | LabelProps);

export const Text = ({ as = "span", variant, size, weight, children }: TextProps) => {
  const Tag = as || "span";
  const style = {
    "--font-size": size && `var(--font-size-${size})`,
    "--font-weight": weight && `var(--font-weight-${weight})`,
  } as React.CSSProperties;

  return (
    <Tag
      className={clsx(
        variant && styles[`${variant}`],
        size && styles.size,
        weight && styles.weight
      )}
      style={style}
    >
      {children}
    </Tag>
  );
};
