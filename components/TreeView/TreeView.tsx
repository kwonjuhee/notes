import React, { useState } from "react";
import { CaretDown, CaretRight } from "@/assets/icon";
import { Button } from "../Button";
import styles from "./TreeView.module.css";

export const TreeView = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul className={styles.TreeView} role="tree">
      {children}
    </ul>
  );
};

export interface TreeItemProps {
  defaultExpanded?: boolean;
  current?: boolean;
  depth?: number;
  children: React.ReactNode;
  onClick?: () => void;
}

export const TreeItem = ({
  defaultExpanded,
  current,
  depth = 0,
  children,
  onClick,
}: TreeItemProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const TreeItemChild = React.Children.toArray(children).filter(
    (child) => !(React.isValidElement(child) && child.type === SubTree)
  );

  const SubTreeChild = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === SubTree
  );

  const hasSubTree = Boolean(SubTreeChild);

  const toggle = () => {
    if (hasSubTree) {
      setIsExpanded((prev) => !prev);
    }
    onClick?.();
  };

  return (
    <li
      role="treeitem"
      aria-expanded={hasSubTree ? isExpanded : undefined}
      aria-selected={current}
      className={styles.TreeItem}
    >
      <Button //
        variant="ghost"
        color="gray"
        fullWidth
        className={styles.button}
        onClick={toggle}
      >
        <span className={styles.indent} style={{ "--depth": depth } as React.CSSProperties} />
        <span className={styles.icon}>
          {hasSubTree && (isExpanded ? <CaretDown /> : <CaretRight />)}
        </span>
        {TreeItemChild}
      </Button>
      {isExpanded &&
        React.isValidElement(SubTreeChild) &&
        React.cloneElement(SubTreeChild, { ...SubTreeChild.props.children, depth: depth + 1 })}
    </li>
  );
};

interface SubTree {
  depth?: number;
  children: React.ReactNode;
}

export const SubTree = ({ depth, children }: SubTree) => {
  return (
    <ul role="group">
      {React.Children.map(children, (child) =>
        React.isValidElement(child) && child.type === TreeItem
          ? React.cloneElement(child, { ...child.props, depth })
          : child
      )}
    </ul>
  );
};
