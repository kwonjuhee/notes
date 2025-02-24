"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { searchWikisByTitle } from "@/api/search";
import { Box } from "@/components/Box";
import { IconButton } from "@/components/Button";
import { Flex } from "@/components/Flex";
import { ScrollArea } from "@/components/ScrollArea";
import { Text } from "@/components/Text";
import { SIDEBAR_BREAKPOINT } from "@/constants/breakpoint";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useRootStore } from "@/store/useRootStore";
import { Wiki } from "@/types/wiki";
import { SearchInput } from "./SearchInput";
import { SearchItem } from "./SearchItem";
import styles from "./SideBar.module.css";
import { SideNavBar } from "./SideNavBar";
import { SideNavBarProps } from "./SideNavBar/SideNavBar";

export interface SideBarProps {
  navItems: SideNavBarProps["navItems"];
}

export const SideBar = ({ navItems }: SideBarProps) => {
  const [q, setQ] = useState("");
  const [searchedWikis, setSearchedWikis] = useState<Wiki[]>([]);

  useEffect(() => {
    if (!q) return;

    (async () => {
      const { data: wikis } = await searchWikisByTitle(q);
      setSearchedWikis(wikis);
    })();
  }, [q]);

  return (
    <SidebarContainer>
      <Flex direction="column" align="stretch" height="100%">
        <SidebarHeader />
        <Box paddingTop="32px" paddingX="12px">
          <SearchInput value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ("")} />
        </Box>
        <ScrollArea className={styles.scrollarea}>
          {!q ? (
            <SideNavBar navItems={navItems} />
          ) : (
            <Flex direction="column" gap={4}>
              {searchedWikis.map(({ path }) => {
                const slug = path.split("/").at(-1) as string;
                return (
                  <Link key={path} href={`/wiki/${path}`} prefetch={false}>
                    <SearchItem title={slug} category={path} highlightKeyword={q} />
                  </Link>
                );
              })}
            </Flex>
          )}
        </ScrollArea>
      </Flex>
    </SidebarContainer>
  );
};

const SidebarContainer = ({ children }: React.PropsWithChildren) => {
  const isMobile = !useMediaQuery(SIDEBAR_BREAKPOINT);
  const isMobileSidebarOpen = useRootStore((state) => state.isMobileSidebarOpen);
  const isSidebarOpen = useRootStore((state) => state.isSidebarOpen);

  if (isMobile) {
    return (
      isMobileSidebarOpen && (
        <Box
          display={{ base: "block", [SIDEBAR_BREAKPOINT]: "none" }}
          position="fixed"
          top="0px"
          left="0px"
          width="100%"
          height="100dvh"
          backgroundColor="surface-subtle"
          style={{ zIndex: "var(--fixed)" }}
        >
          {children}
        </Box>
      )
    );
  }

  return (
    isSidebarOpen && (
      <Box
        flexShrink={0}
        display={{ base: "none", [SIDEBAR_BREAKPOINT]: "block" }}
        position="sticky"
        top="0"
        width="280px"
        height="100dvh"
        backgroundColor="surface-subtle"
        borderRightWidth="1px"
        borderColor="gray"
      >
        {children}
      </Box>
    )
  );
};

const SidebarHeader = () => {
  const isMobile = !useMediaQuery(SIDEBAR_BREAKPOINT);
  const closeMobileSidebar = useRootStore((state) => state.closeMobileSidebar);

  if (isMobile) {
    return (
      <>
        <Flex align="center" justify="end">
          <IconButton
            icon="X"
            variant="ghost"
            color="gray"
            size="medium"
            onClick={closeMobileSidebar}
          />
        </Flex>
        <Flex align="center" justify="center">
          <Text variant="heading24">🐭 wiki</Text>
        </Flex>
      </>
    );
  }

  return (
    <Flex align="center" justify="center" paddingTop="40px">
      <Text variant="heading24">🐭 wiki</Text>
    </Flex>
  );
};
