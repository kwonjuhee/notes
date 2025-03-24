"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { searchNotesByTitle } from "@/api/search";
import { Box } from "@/components/Box";
import { IconButton } from "@/components/Button";
import { Flex } from "@/components/Flex";
import { ScrollArea } from "@/components/ScrollArea";
import { Text } from "@/components/Text";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SIDEBAR_BREAKPOINT } from "@/constants/breakpoint";
import { useRootStore } from "@/store/useRootStore";
import { Category } from "@/types/category";
import { Note } from "@/types/note";
import { CategorySelector } from "./CategorySelector";
import { ColorSwitcher } from "./ColorSwitcher";
import { SearchInput } from "./SearchInput";
import { SearchItem } from "./SearchItem";
import styles from "./SideBar.module.css";
import { SidebarHandle } from "./SidebarHandle";
import { SideNavBar } from "./SideNavBar";
import { SideNavBarProps } from "./SideNavBar/SideNavBar";

export interface SideBarProps {
  navItems: SideNavBarProps["navItems"];
  categoryList: Category[];
}

export const SideBar = ({ navItems, categoryList }: SideBarProps) => {
  const isSidebarOpen = useRootStore((state) => state.isSidebarOpen);
  const isMobileSidebarOpen = useRootStore((state) => state.isMobileSidebarOpen);

  return (
    <>
      <Box
        flexShrink={0}
        base={{
          display: isMobileSidebarOpen ? "block" : "none",
          position: "fixed",
          top: "var(--header-height)",
          left: "0",
          width: "100%",
          height: "calc(100dvh - var(--header-height))",
          backgroundColor: "surface",
        }}
        {...{
          [SIDEBAR_BREAKPOINT]: {
            display: isSidebarOpen ? "block" : "none",
            position: "sticky",
            top: "0",
            width: "280px",
            height: "100dvh",
            backgroundColor: "surface",
            borderRightWidth: "1px",
            borderColor: "gray",
          },
        }}
        style={{ zIndex: "var(--fixed)" }}
      >
        <Flex direction="column" align="stretch" height="100%">
          <SidebarHeader />
          <SidebarContent navItems={navItems} />
          <SidebarFooter categoryList={categoryList} />
        </Flex>
      </Box>
      <Box display={{ base: "none", [SIDEBAR_BREAKPOINT]: "block" }}>
        <SidebarHandle />
      </Box>
    </>
  );
};

const SidebarHeader = () => {
  const closeSidebar = useRootStore((state) => state.closeSidebar);

  return (
    <Flex
      display={{ base: "none", [SIDEBAR_BREAKPOINT]: "flex" }}
      align="center"
      justify="space-between"
      paddingLeft="24px"
      paddingRight="12px"
      paddingY="16px"
    >
      <Text variant="heading20">🐭 notes</Text>
      <IconButton
        icon="CaretLeft"
        variant="ghost"
        color="gray"
        style={{ color: "var(--fg-neutral-subtlest)" }}
        onClick={closeSidebar}
      />
    </Flex>
  );
};

const SidebarFooter = ({ categoryList }: { categoryList: Category[] }) => {
  return (
    <Flex justify="end" paddingX="12px" paddingY="8px" borderTopWidth="1px" borderColor="gray">
      {categoryList.length > 0 && <CategorySelector options={categoryList} />}
      <ColorSwitcher />
      <ThemeToggle size="medium" />
    </Flex>
  );
};

const SidebarContent = ({ navItems }: Pick<SideBarProps, "navItems">) => {
  const [q, setQ] = useState("");
  const [searchedNotes, setSearchedNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (!q) return;

    (async () => {
      const { data: notes } = await searchNotesByTitle(q);
      setSearchedNotes(notes);
    })();
  }, [q]);

  return (
    <>
      <Box paddingTop="32px" paddingX="12px">
        <SearchInput value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ("")} />
      </Box>
      <ScrollArea className={styles.scrollarea}>
        {!q ? (
          <SideNavBar navItems={navItems} />
        ) : (
          <Flex direction="column" gap={4}>
            {searchedNotes.map(({ path }) => {
              const slug = path.split("/").at(-1) as string;
              return (
                <Link key={path} href={`/notes/${path}`} prefetch={false}>
                  <SearchItem title={slug} category={path} highlightKeyword={q} />
                </Link>
              );
            })}
          </Flex>
        )}
      </ScrollArea>
    </>
  );
};
