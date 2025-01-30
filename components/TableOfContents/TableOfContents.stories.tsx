/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { buildTOC, NestedTOCItem, TableOfContents, TOCItems } from "./TableOfContents";
import styles from "./TableOfContents.module.css";

const meta: Meta<typeof TableOfContents> = {
  component: TableOfContents,
};
export default meta;

export const Primary: StoryObj<typeof TableOfContents> = {
  render: () => {
    const [tocItems, setTOCItems] = useState<NestedTOCItem[]>([]);

    useEffect(() => {
      setTOCItems(
        buildTOC([
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
        <TOCItems tocItems={tocItems} />
      </nav>
    );
  },
};
