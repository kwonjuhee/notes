"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { searchWikisByTitle } from "@/api/search";
import { Box } from "@/components/Box";
import { Flex } from "@/components/Flex";
import { Text } from "@/components/Text";
import { useRootStore } from "@/store/useRootStore";
import { Wiki } from "@/types/wiki";
import { SearchInput } from "./SearchInput";
import { SearchItem } from "./SearchItem";
import { SideNavBar } from "./SideNavBar";
import { SideNavBarProps } from "./SideNavBar/SideNavBar";

export interface SideBarProps {
  navItems: SideNavBarProps["navItems"];
}

export const SideBar = ({ navItems }: SideBarProps) => {
  const isSidebarOpen = useRootStore((state) => state.isSidebarOpen);
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
    isSidebarOpen && (
      <Box width="280px" height="100dvh" paddingX="12px" borderRightWidth="1px" borderColor="gray">
        <Flex align="center" justify="center" paddingTop="40px">
          <Text variant="heading24">🐭 wiki</Text>
        </Flex>
        <Box paddingY="34px">
          <SearchInput value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ("")} />
        </Box>
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
      </Box>
    )
  );
};
