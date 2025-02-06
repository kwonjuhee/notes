import clsx from "clsx";
import { Color } from "@/types/token";
import { Text } from "../Text";
import styles from "./Chip.module.css";

export interface ChipProps {
  label: string;
  variant?: "solid" | "subtle" | "outline";
  color?: Color;
}

export const Chip = ({ label, variant = "subtle", color = "brand" }: ChipProps) => {
  return (
    <div className={clsx(styles.Chip, styles[`variant-${variant}`], styles[`color-${color}`])}>
      <Text variant="caption14">{label}</Text>
    </div>
  );
};
