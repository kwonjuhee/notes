"use client";

import clsx from "clsx";
import styles from "./TableOfContents.module.css";
import { TocItem, TocNode } from "./TableOfContets.types";
import { useBuildToc } from "./useBuildToc";

export const TableOfContents = () => {
  const { tocNodes, currentItem } = useBuildToc();

  const topLevel = Math.max(...tocNodes.map(({ level }) => level));

  return (
    <nav
      className={styles.TableOfContents}
      style={{ "--current-tocitem-index": currentItem?.index } as React.CSSProperties}
    >
      <TOCList tocNodes={tocNodes} currentItem={currentItem} topLevel={topLevel} />
    </nav>
  );
};

export interface TOCListProps {
  tocNodes: TocNode[];
  currentItem?: TocItem;
  topLevel: number;
}

export const TOCList = ({ tocNodes, currentItem, topLevel }: TOCListProps) => {
  return tocNodes.map(({ childNodes, ...itemProps }, i) => (
    <li key={i}>
      <TOCItem {...itemProps} current={itemProps.id === currentItem?.id} topLevel={topLevel} />
      {childNodes.length > 0 && (
        <ol>
          <TOCList tocNodes={childNodes} currentItem={currentItem} topLevel={topLevel} />
        </ol>
      )}
    </li>
  ));
};

interface TOCItemProps extends TocItem {
  topLevel: number;
}

const TOCItem = ({ id, level, text, current, topLevel }: TOCItemProps) => {
  return (
    <a
      href={`#${id}`}
      style={{ "--indent-count": getIndentCount({ level, topLevel }) } as React.CSSProperties}
      className={clsx(styles.tocitem, current && styles.active)}
    >
      {text}
    </a>
  );
};

const getIndentCount = ({ level, topLevel }: Pick<TOCItemProps, "level" | "topLevel">) => {
  return level - topLevel + 1;
};
