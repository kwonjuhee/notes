"use client";

import { TreeView } from "@/components/TreeView";
import { SubTree, TreeItem } from "@/components/TreeView/TreeView";

export type TreeNode = { id: string; childNodes?: TreeNode[] };

export interface SideNavBarProps {
  navItems: TreeNode[];
}

export const SideNavBar = ({ navItems }: SideNavBarProps) => {
  return <TreeView>{renderNavItems(navItems)}</TreeView>;
};

const renderNavItems = (navItems: SideNavBarProps["navItems"]) => {
  return navItems.map(({ id, childNodes }) => (
    <TreeItem key={id}>
      {id}
      {childNodes && <SubTree>{renderNavItems(childNodes)}</SubTree>}
    </TreeItem>
  ));
};
