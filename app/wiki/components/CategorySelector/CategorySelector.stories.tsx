import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@/components/Box";
import { CategorySelector } from "./CategorySelector";

const meta: Meta<typeof CategorySelector> = {
  title: "wiki/CategorySelector",
  component: CategorySelector,
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/",
        segments: [["category", "category1"]],
      },
    },
  },
};
export default meta;

const CATEGORY_OPTIONS = [
  { label: "option1", slug: "option1", isPrivate: false },
  { label: "option2", slug: "option2", isPrivate: false },
  { label: "option3", slug: "option3", isPrivate: true },
  { label: "option4", slug: "option4", isPrivate: true },
];

export const Primary: StoryObj<typeof CategorySelector> = {
  render: () => (
    <Box paddingY="200px">
      <CategorySelector options={CATEGORY_OPTIONS} />
    </Box>
  ),
};
