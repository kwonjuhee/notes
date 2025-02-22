"use client";

import { useState } from "react";
import { List } from "@/assets/icon";
import { Box } from "../Box";
import { Collapsible } from "../Collapsible";
import { TableOfContents } from "../TableOfContents";
import { Text } from "../Text";
import styles from "./TocHeader.module.css";

export const TocHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible.Root
      className={styles.TocHeader}
      open={isOpen}
      onOpenChange={() => setIsOpen((prev) => !prev)}
    >
      <Collapsible.Trigger className={styles.trigger}>
        <List className={styles.listIcon} width={20} height={20} />
        <Text variant="caption14" truncate>
          On this page
        </Text>
      </Collapsible.Trigger>
      <Collapsible.Content className={styles.content}>
        <Box maxHeight="300px" padding="16px" overflowY="auto">
          <TableOfContents />
        </Box>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
