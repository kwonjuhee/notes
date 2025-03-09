"use client";

import { IconButton } from "@/components/Button";
import { Flex } from "@/components/Flex";
import { Text } from "@/components/Text";
import { SIDEBAR_BREAKPOINT } from "@/constants/breakpoint";
import { useRootStore } from "@/store/useRootStore";

export const MobileHeader = () => {
  const isSidebarOpen = useRootStore((state) => state.isMobileSidebarOpen);
  const closeSidebar = useRootStore((state) => state.closeMobileSidebar);
  const openSidebar = useRootStore((state) => state.openMobileSidebar);

  return (
    <Flex
      position="sticky"
      top="0"
      display={{ base: "flex", [SIDEBAR_BREAKPOINT]: "none" }}
      align="center"
      justify="space-between"
      width="100%"
      height="var(--header-height)"
      paddingLeft="20px"
      paddingRight="8px"
      borderColor="gray"
      borderBottomWidth="1px"
      backgroundColor="surface"
    >
      <Text variant="heading20">🐭 notes</Text>
      {isSidebarOpen ? (
        <IconButton icon="X" variant="ghost" color="gray" onClick={closeSidebar} />
      ) : (
        <IconButton icon="List" variant="ghost" color="gray" onClick={openSidebar} />
      )}
    </Flex>
  );
};
