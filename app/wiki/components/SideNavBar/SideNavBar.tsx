"use client";

import { TreeView } from "@/components/TreeView";
import { SubTree, TreeItem } from "@/components/TreeView/TreeView";

export type TreeNode = { id: string; path: string; childNodes?: TreeNode[] };

export interface SideNavBarProps {
  navItems: TreeNode[];
}

export const SideNavBar = ({ navItems }: SideNavBarProps) => {
  return <TreeView>{renderNavItems(navItems)}</TreeView>;
};

const renderNavItems = (navItems: SideNavBarProps["navItems"]) => {
  return navItems.map(({ id, path, childNodes }) => (
    <TreeItem key={id} href={`/wiki/${path}`}>
      {id}
      {childNodes && <SubTree>{renderNavItems(childNodes)}</SubTree>}
    </TreeItem>
  ));
};
