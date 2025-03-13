"use client";

import clsx from "clsx";
import { MaginWand } from "@/assets/icon";
import { Dropdown } from "@/components/Dropdown";
import { colors } from "@/types/token";
import styles from "./ColorSwitcher.module.css";

export const ColorSwitcher = () => {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger variant="ghost" color="gray">
        <MaginWand width={18} height={18} />
      </Dropdown.Trigger>
      <Dropdown.Content side="top" align="center">
        <div className={styles.chips}>
          {colors
            .filter((colorName) => colorName !== "brand" && colorName !== "gray")
            .map((colorName) => (
              <button
                key={colorName}
                className={clsx(styles.chip, styles[`color-${colorName}`])}
                onClick={() => {
                  document.body.setAttribute("data-brand-color", colorName);
                }}
              />
            ))}
        </div>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
