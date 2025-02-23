/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { TableOfContents, TOCList } from "./TableOfContents";
import styles from "./TableOfContents.module.css";
import { TocNode } from "./TableOfContets.types";
import { buildTocNodes } from "./useBuildToc";

const meta: Meta<typeof TableOfContents> = {
  component: TableOfContents,
};
export default meta;

export const Primary: StoryObj<typeof TableOfContents> = {
  render: () => {
    const [tocNodes, setTocNodes] = useState<TocNode[]>([]);

    useEffect(() => {
      setTocNodes(
        buildTocNodes([
          { id: "heading1", level: 1, text: "Heading1" },
          { id: "heading2", level: 2, text: "Heading2" },
          { id: "heading3", level: 3, text: "Heading3" },
          { id: "heading3-1", level: 3, text: "Heading3" },
          { id: "heading2-1", level: 2, text: "Heading2" },
          { id: "heading3-2", level: 3, text: "Heading3" },
          { id: "heading3-3", level: 3, text: "Heading3" },
        ])
      );
    }, []);

    return (
      <nav className={styles.TableOfContents}>
        <TOCList tocNodes={tocNodes} currentId="heading1" />
      </nav>
    );
  },
};
