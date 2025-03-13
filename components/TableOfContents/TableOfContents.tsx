"use client";

import clsx from "clsx";
import { useRef, useState } from "react";
import { useResizeObserver } from "@/hooks/useResizeObserver";
import styles from "./TableOfContents.module.css";
import { TocItem, TocNode } from "./TableOfContets.types";
import { useBuildToc } from "./useBuildToc";

export const TableOfContents = () => {
  const { tocNodes, currentItem } = useBuildToc();

  const topLevel = Math.max(...tocNodes.map(({ level }) => level));

  const [tocItemHeights, setTocItemHeights] = useState<number[]>([]);

  const handleChangeTocItemHeight = (index: number, height: number) => {
    setTocItemHeights((prev) => {
      const cloned = [...prev];
      cloned[index] = height;
      return cloned;
    });
  };

  return (
    <nav
      className={styles.TableOfContents}
      style={
        {
          "--indicator-height": `${tocItemHeights[currentItem?.index ?? 0]}px`,
          "--indicator-position": `${calculateIndicatorPosition(
            currentItem?.index ?? 0,
            tocItemHeights
          )}px`,
        } as React.CSSProperties
      }
    >
      <TOCList
        tocNodes={tocNodes}
        currentItem={currentItem}
        topLevel={topLevel}
        onChangeTocItemHeight={handleChangeTocItemHeight}
      />
    </nav>
  );
};

export interface TOCListProps {
  tocNodes: TocNode[];
  currentItem?: TocItem;
  topLevel: number;
  onChangeTocItemHeight: (index: number, height: number) => void;
}

export const TOCList = ({
  tocNodes,
  currentItem,
  topLevel,
  onChangeTocItemHeight,
}: TOCListProps) => {
  return tocNodes.map(({ childNodes, ...itemProps }, i) => (
    <li key={i}>
      <TOCItem
        {...itemProps}
        current={itemProps.id === currentItem?.id}
        topLevel={topLevel}
        onChangeTocItemHeight={onChangeTocItemHeight}
      />
      {childNodes.length > 0 && (
        <ol>
          <TOCList
            tocNodes={childNodes}
            currentItem={currentItem}
            topLevel={topLevel}
            onChangeTocItemHeight={onChangeTocItemHeight}
          />
        </ol>
      )}
    </li>
  ));
};

interface TOCItemProps extends TocItem {
  topLevel: number;
  onChangeTocItemHeight: (index: number, height: number) => void;
}

const TOCItem = ({
  id,
  level,
  text,
  current,
  topLevel,
  index,
  onChangeTocItemHeight,
}: TOCItemProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  useResizeObserver({
    ref,
    onResize: ({ height }) => {
      if (height) {
        onChangeTocItemHeight(index, height);
      }
    },
  });

  return (
    <a
      ref={ref}
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

const calculateIndicatorPosition = (index: number, heights: number[]) => {
  return heights.slice(0, index).reduce((acc, cur) => acc + cur, 0);
};
