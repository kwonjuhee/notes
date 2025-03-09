"use client";

import { useState } from "react";
import { CaretRight, List } from "@/assets/icon";
import { Box } from "../Box";
import { Collapsible } from "../Collapsible";
import { TableOfContents } from "../TableOfContents";
import { useBuildToc } from "../TableOfContents/useBuildToc";
import { Text } from "../Text";
import styles from "./TocHeader.module.css";

export const TocHeader = () => {
  const { currentItem } = useBuildToc();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box className={styles.TocHeader} display={{ base: "block", lg: "none" }}>
      <Collapsible.Root open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
        <Collapsible.Trigger className={styles.trigger}>
          <List className={styles.listIcon} width={20} height={20} />
          <Text variant="caption14">On this page</Text>
          <CaretRight width={13} height={13} />
          <Text variant="caption14" truncate>
            {currentItem?.text}
          </Text>
        </Collapsible.Trigger>
        <Collapsible.Content className={styles.content}>
          <Box maxHeight="300px" padding="16px" overflowY="auto">
            <TableOfContents />
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
};
