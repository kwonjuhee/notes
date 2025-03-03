import type { Meta, StoryObj } from "@storybook/react";
import { SearchItem } from "./SearchItem";

const meta: Meta<typeof SearchItem> = {
  title: "notes/SearchItem",
  component: SearchItem,
};
export default meta;

export const Primary: StoryObj<typeof SearchItem> = {
  args: {
    title: "This is Title",
    category: "Category",
    highlightKeyword: "Title",
  },
};
