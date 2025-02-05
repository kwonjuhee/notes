"use client";

import { SidebarSimple } from "@/assets/icon";
import { Box } from "@/components/Box";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BreadcrumbProps } from "@/components/Breadcrumb/Breadcrumb";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Flex } from "@/components/Flex";
import { useRootStore } from "@/store/useRootStore";
import styles from "./WikiBreadcrumb.module.css";

export interface WikiBreadcrumbProps {
  items: BreadcrumbProps["items"];
}

export const WikiBreadcrumb = ({ items }: WikiBreadcrumbProps) => {
  const toggleSidebar = useRootStore((state) => state.toggleSidebar);

  return (
    <Flex direction="row" align="center" gap={4} className={styles.WikiBreadcrumb}>
      <Button variant="ghost" color="gray" size="large" onClick={() => toggleSidebar()}>
        <SidebarSimple />
      </Button>
      <Box height="20px" paddingRight="12px">
        <Divider orientation="vertical" />
      </Box>
      <Breadcrumb items={items} />
    </Flex>
  );
};
