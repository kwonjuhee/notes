import { useEffect, useState } from "react";
import { MARKDOWN_ID } from "@/constants/markdown";
import { TocItem, TocNode } from "./TableOfContets.types";

export const useBuildToc = () => {
  const [tocNodes, setTocNodes] = useState<TocNode[]>([]);
  const [currentItem, setCurrentItem] = useState<TocItem>();

  useEffect(() => {
    const markdown = document.getElementById(MARKDOWN_ID);
    if (!markdown) return;

    const elements = markdown.querySelectorAll(
      "h1:not(blockquote h1), h2:not(blockquote h2), h3:not(blockquote h3)"
    );
    const tocItems = Array.from(elements).map((el, index) => ({ ...elementToTocItem(el), index }));
    setTocNodes(buildTocNodes(tocItems));

    if (elements.length > 0) {
      setCurrentItem(tocItems[0]);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentItem(tocItems.find((item) => item.id === entry.target.id));
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

  return { tocNodes, currentItem };
};

export const buildTocNodes = (items: TocItem[]) => {
  const root: TocNode[] = [];
  const stack: TocNode[] = [];

  items.forEach((item) => {
    const nestedItem = { ...item, childNodes: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= nestedItem.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(nestedItem);
    } else {
      stack[stack.length - 1].childNodes.push(nestedItem);
    }

    stack.push(nestedItem);
  });

  return root;
};

const elementToTocItem = (element: Element) => {
  const { id, tagName, textContent } = element;

  return {
    id,
    level: Number(tagName.charAt(1)),
    text: textContent ?? "",
  };
};
