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

export const Primary: StoryObj<typeof CategorySelector> = {
  render: () => (
    <Box paddingY="200px">
      <CategorySelector options={["option1", "option2", "option3", "option4"]} />
    </Box>
  ),
};
