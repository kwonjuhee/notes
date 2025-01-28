import type { Meta, StoryObj } from "@storybook/react";
import { TableOfContents } from "./TableOfContents";

const meta: Meta<typeof TableOfContents> = {
  component: TableOfContents,
};
export default meta;

const TOCItems = [
  { id: "heading1", level: 1, text: "Heading1" },
  { id: "heading2", level: 2, text: "Heading2" },
  { id: "heading3", level: 3, text: "Heading3" },
  { id: "heading3-1", level: 3, text: "Heading3" },
  { id: "heading2-1", level: 2, text: "Heading2" },
  { id: "heading3-2", level: 3, text: "Heading3" },
  { id: "heading3-3", level: 3, text: "Heading3" },
];

export const Primary: StoryObj<typeof TableOfContents> = {
  args: {
    items: TOCItems,
  },
};
