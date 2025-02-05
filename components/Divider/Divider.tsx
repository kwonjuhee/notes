import clsx from "clsx";
import styles from "./Divider.module.css";

export interface DividerProps extends React.ComponentPropsWithoutRef<"div"> {
  orientation?: "horizontal" | "vertical";
}

export const Divider = ({ orientation = "horizontal", className, ...props }: DividerProps) => {
  return <div className={clsx(styles.Divider, styles[orientation], className)} {...props} />;
};
