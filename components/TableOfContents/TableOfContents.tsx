"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { MARKDOWN_ID } from "@/constants/markdown";
import styles from "./TableOfContents.module.css";

type TOCItem = {
  id: string;
  level: number;
  text: string;
  current?: boolean;
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
  const [activeId, setActiveId] = useState("");

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

    if (elements.length > 0) {
      setActiveId(elements[0].id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -80% 0px",
      }
    );
    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <nav className={styles.TableOfContents}>
      <TOCItems tocItems={tocItems} activeId={activeId} />
    </nav>
  );
};

export const TOCItems = ({
  tocItems,
  activeId,
}: {
  tocItems: NestedTOCItem[];
  activeId: string;
}) => {
  return tocItems.map(({ id, level, text, childItems }, i) =>
    childItems.length > 0 ? (
      <ol key={i} className={styles.list}>
        <TOCItem id={id} level={level} text={text} current={id === activeId} />
        {childItems.length > 0 && <TOCItems tocItems={childItems} activeId={activeId} />}
      </ol>
    ) : (
      <TOCItem key={i} id={id} level={level} text={text} current={id === activeId} />
    )
  );
};

const TOCItem = ({ id, level, text, current }: TOCItem) => {
  return (
    <li id={id} className={clsx(styles.item, styles[`heading${level}`], current && styles.active)}>
      <a href={`#${id}`}>{text}</a>
    </li>
  );
};
