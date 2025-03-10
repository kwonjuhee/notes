"use client";

import { Button } from "@/components/Button";
import styles from "./ColorSwitcher.module.css";
import { Dropdown } from "@/components/Dropdown";
import { color } from "@/types/token";
import { MaginWand } from "@/assets/icon";
import clsx from "clsx";

export const ColorSwitcher = () => {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger variant="ghost" color="gray">
        <MaginWand width={18} height={18} />
      </Dropdown.Trigger>
      <Dropdown.Content side="top" align="center">
        <div className={styles.chips}>
          {color
            .filter((colorName) => colorName !== "brand" && colorName !== "gray")
            .map((colorName) => (
              <button
                className={clsx(styles.chip, styles[colorName])}
                onClick={() => {
                  document.body.setAttribute("data-accent", colorName);
                }}
              />
            ))}
        </div>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
