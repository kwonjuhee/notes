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
  return tocNodes.map(({ childNodes, ...itemProps }, i) =>
    childNodes.length > 0 ? (
      <ol key={i} className={styles.list}>
        <TOCItem {...itemProps} current={itemProps.id === currentItem?.id} />
        {childNodes.length > 0 && <TOCList tocNodes={childNodes} currentItem={currentItem} />}
      </ol>
    ) : (
      <TOCItem key={i} {...itemProps} current={itemProps.id === currentItem?.id} />
    )
  );
};

const TOCItem = ({ id, level, text, current }: TocItem) => {
  return (
    <li id={id} className={clsx(styles.item, styles[`heading${level}`], current && styles.active)}>
      <a href={`#${id}`}>{text}</a>
    </li>
  );
};
