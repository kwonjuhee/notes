"use client";

import clsx from "clsx";
import styles from "./TableOfContents.module.css";
import { TocItem, TocNode } from "./TableOfContets.types";
import { useBuildToc } from "./useBuildToc";

export const TableOfContents = () => {
  const { tocNodes, currentItem } = useBuildToc();

  return (
    <nav className={styles.TableOfContents}>
      <TOCList tocNodes={tocNodes} currentItem={currentItem} />
    </nav>
  );
};

export const TOCList = ({
  tocNodes,
  currentItem,
}: {
  tocNodes: TocNode[];
  currentItem?: TocItem;
}) => {
  return tocNodes.map(({ childNodes, ...itemProps }, i) => (
    <li key={i}>
      <TOCItem {...itemProps} current={itemProps.id === currentItem?.id} />
      {childNodes.length > 0 && (
        <ol key={i}>
          {childNodes.length > 0 && <TOCList tocNodes={childNodes} currentItem={currentItem} />}
        </ol>
      )}
    </li>
  ));
};

const TOCItem = ({ id, level, text, current }: TocItem) => {
  return (
    <a
      href={`#${id}`}
      className={clsx(styles.tocitem, styles[`heading${level}`], current && styles.active)}
    >
      {text}
    </a>
  );
};
