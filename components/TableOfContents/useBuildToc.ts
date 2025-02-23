import { useEffect, useState } from "react";
import { MARKDOWN_ID } from "@/constants/markdown";
import { TocItem, TocNode } from "./TableOfContets.types";

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

export const useBuildToc = () => {
  const [tocNodes, setTocNodes] = useState<TocNode[]>([]);
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    const markdown = document.getElementById(MARKDOWN_ID);
    if (!markdown) return;

    const elements = markdown.querySelectorAll("h1,h2,h3");
    setTocNodes(
      buildTocNodes(
        Array.from(elements).map(({ id, tagName, textContent }) => ({
          id,
          level: Number(tagName.charAt(1)),
          text: textContent ?? "",
        }))
      )
    );

    if (elements.length > 0) {
      setCurrentId(elements[0].id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentId(entry.target.id);
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

  return { tocNodes, currentId };
};
