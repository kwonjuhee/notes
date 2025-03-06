import clsx from "clsx";
import { forwardRef } from "react";
import styles from "./Input.module.css";

export interface InputProps extends React.ComponentPropsWithRef<"input"> {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leftContent, rightContent, className, ...props }, ref) => {
    return (
      <div className={clsx(styles.Input, className)}>
        {leftContent}
        <input ref={ref} className={styles.input} {...props} />
        {rightContent}
      </div>
    );
  }
);

Input.displayName = "Input";
