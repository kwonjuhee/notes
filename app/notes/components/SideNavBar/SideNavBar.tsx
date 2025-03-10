"use client";

import { usePathname } from "next/navigation";
import { TreeView } from "@/components/TreeView";
import { SubTree, TreeItem } from "@/components/TreeView/TreeView";

export type TreeNode = { id: string; path: string; childNodes?: TreeNode[] };

export interface SideNavBarProps {
  navItems: TreeNode[];
}

export const SideNavBar = ({ navItems }: SideNavBarProps) => {
  const currentPath = usePathname();

  return <TreeView>{renderNavItems({ navItems, currentPath })}</TreeView>;
};

const renderNavItems = ({ navItems, currentPath }: SideNavBarProps & { currentPath: string }) => {
  return navItems.map(({ id, path, childNodes }) => (
    <TreeItem
      key={id}
      href={`/notes/${path}`}
      current={`/notes/${path}` === currentPath}
      defaultExpanded={currentPath.startsWith(`/notes/${path}`)}
    >
      {id}
      {childNodes && <SubTree>{renderNavItems({ navItems: childNodes, currentPath })}</SubTree>}
    </TreeItem>
  ));
};
