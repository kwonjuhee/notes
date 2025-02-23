"use client";

import clsx from "clsx";
import styles from "./TableOfContents.module.css";
import { TocItem, TocNode } from "./TableOfContets.types";
import { useBuildToc } from "./useBuildToc";

export const TableOfContents = () => {
  const { tocNodes, currentId } = useBuildToc();

  return (
    <nav className={styles.TableOfContents}>
      <TOCList tocNodes={tocNodes} currentId={currentId} />
    </nav>
  );
};

export const TOCList = ({ tocNodes, currentId }: { tocNodes: TocNode[]; currentId: string }) => {
  return tocNodes.map(({ childNodes, ...itemProps }, i) =>
    childNodes.length > 0 ? (
      <ol key={i} className={styles.list}>
        <TOCItem {...itemProps} current={itemProps.id === currentId} />
        {childNodes.length > 0 && <TOCList tocNodes={childNodes} currentId={currentId} />}
      </ol>
    ) : (
      <TOCItem key={i} {...itemProps} current={itemProps.id === currentId} />
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
