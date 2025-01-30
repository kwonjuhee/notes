"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { MARKDOWN_ID } from "@/constants/markdown";
import { Text } from "../Text";
import styles from "./TableOfContents.module.css";

type TOCItem = {
  id: string;
  level: number;
  text: string;
};

export type NestedTOCItem = TOCItem & { childItems: NestedTOCItem[] };

export const buildTOC = (items: TOCItem[]) => {
  const root: NestedTOCItem[] = [];
  const stack: NestedTOCItem[] = [];

  items.forEach((item) => {
    const nestedItem = { ...item, childItems: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= nestedItem.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(nestedItem);
    } else {
      stack[stack.length - 1].childItems.push(nestedItem);
    }

    stack.push(nestedItem);
  });

  return root;
};

export const TableOfContents = () => {
  const [tocItems, setTOCItems] = useState<NestedTOCItem[]>([]);

  useEffect(() => {
    const markdown = document.getElementById(MARKDOWN_ID);
    if (!markdown) return;

    const elements = markdown.querySelectorAll("h1,h2,h3");
    setTOCItems(
      buildTOC(
        Array.from(elements).map(({ id, tagName, textContent }) => ({
          id,
          level: Number(tagName.charAt(1)),
          text: textContent ?? "",
        }))
      )
    );
  }, []);

  return (
    <nav className={styles.TableOfContents}>
      <TOCItems tocItems={tocItems} />
    </nav>
  );
};

export const TOCItems = ({ tocItems }: { tocItems: NestedTOCItem[] }) => {
  return tocItems.map(({ id, level, text, childItems }, i) =>
    childItems.length > 0 ? (
      <ol key={i} className={styles.list}>
        <TOCItem id={id} level={level} text={text} />
        {childItems.length > 0 && <TOCItems tocItems={childItems} />}
      </ol>
    ) : (
      <TOCItem key={i} id={id} level={level} text={text} />
    )
  );
};

const TOCItem = ({ id, level, text }: TOCItem) => (
  <li id={id} className={clsx(styles.item, styles[`heading${level}`])}>
    <a href={`#${id}`}>{<Text variant="body14">{text}</Text>}</a>
  </li>
);
