import clsx from "clsx";
import * as iconSVGs from "@/assets/icon";
import { Button, ButtonProps } from "./Button";
import styles from "./IconButton.module.css";

export interface IconButtonProps extends ButtonProps {
  icon: keyof typeof iconSVGs;
  iconSize?: number;
}

export const IconButton = ({ icon, iconSize, ...buttonProps }: IconButtonProps) => {
  const Icon = iconSVGs[icon];
  const buttonSize = buttonProps.size ?? "medium";

  const getIconSize = (buttonSize: IconButtonProps["size"]) => {
    if (iconSize) return { width: iconSize, height: iconSize };

    switch (buttonSize) {
      case "small":
        return { width: 14, height: 14 };
      case "medium":
        return { width: 18, height: 18 };
      case "large":
        return { width: 20, height: 20 };
      default:
        return { width: 20, height: 20 };
    }
  };

  return (
    <Button {...buttonProps} className={clsx(styles.IconButton, styles[`size-${buttonSize}`])}>
      <Icon {...getIconSize(buttonSize)} />
    </Button>
  );
};
