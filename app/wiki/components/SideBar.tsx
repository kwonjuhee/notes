"use client";

import { Box } from "@/components/Box";
import { Flex } from "@/components/Flex";
import { Text } from "@/components/Text";
import { useRootStore } from "@/store/useRootStore";
import { SideNavBar } from "./SideNavBar";
import { SideNavBarProps } from "./SideNavBar/SideNavBar";

export interface SideBarProps {
  navItems: SideNavBarProps["navItems"];
}

export const SideBar = ({ navItems }: SideBarProps) => {
  const isSidebarOpen = useRootStore((state) => state.isSidebarOpen);

  return (
    isSidebarOpen && (
      <Box width="280px" height="100dvh" paddingX="12px" borderRightWidth="1px" borderColor="gray">
        <Flex align="center" justify="center" paddingTop="40px" paddingBottom="34px">
          <Text variant="heading24">🐭 wiki</Text>
        </Flex>
        <SideNavBar navItems={navItems} />
      </Box>
    )
  );
};
