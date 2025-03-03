"use client";

import { Box } from "@/components/Box";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BreadcrumbProps } from "@/components/Breadcrumb/Breadcrumb";
import { IconButton } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Flex } from "@/components/Flex";
import { SIDEBAR_BREAKPOINT } from "@/constants/breakpoint";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useRootStore } from "@/store/useRootStore";
import styles from "./NoteBreadcrumb.module.css";

export interface NoteBreadcrumbProps {
  items: BreadcrumbProps["items"];
}

export const NoteBreadcrumb = ({ items }: NoteBreadcrumbProps) => {
  const isMobile = !useMediaQuery(SIDEBAR_BREAKPOINT);
  const toggleMobileSidebar = useRootStore((state) => state.toggleMobileSidebar);
  const toggleSidebar = useRootStore((state) => state.toggleSidebar);

  return (
    <Flex direction="row" align="center" gap={4} className={styles.NoteBreadcrumb}>
      <IconButton
        icon="SidebarSimple"
        variant="ghost"
        color="gray"
        size="medium"
        onClick={() => {
          if (isMobile) {
            toggleMobileSidebar();
          } else {
            toggleSidebar();
          }
        }}
      />
      <Box height="20px" paddingRight="12px">
        <Divider orientation="vertical" />
      </Box>
      <Breadcrumb items={items} />
    </Flex>
  );
};
