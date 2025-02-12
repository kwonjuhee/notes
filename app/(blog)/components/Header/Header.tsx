"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { MoonStars, Sun } from "@/assets/icon";
import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { Flex, FlexProps } from "@/components/Flex";
import { Text } from "@/components/Text";
import { useTheme } from "@/theme";
import styles from "./Header.module.css";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideHeader, setHideHeader] = useState(false);

  useEffect(() => {
    const scroll = () => {
      if (scrollY < lastScrollY) {
        setHideHeader(false);
      } else {
        setHideHeader(true);
      }
      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", scroll);

    return () => {
      window.removeEventListener("scroll", scroll);
    };
  });

  return (
    <>
      <Flex {...headerStyle} className={clsx(styles.Header, hideHeader && styles.hide)}>
        <Text variant="heading24">🐭 blog</Text>
        <Button variant="ghost" color="gray" size="large" onClick={toggleTheme}>
          {theme === "light" ? <Sun /> : <MoonStars />}
        </Button>
      </Flex>
      <Box height="var(--header-height)" />
    </>
  );
};

const headerStyle: FlexProps = {
  position: "fixed",
  top: "0px",
  left: "0px",
  right: "0px",
  justify: "space-between",
  align: "center",
  height: "var(--header-height)",
  paddingX: "12px",
};
