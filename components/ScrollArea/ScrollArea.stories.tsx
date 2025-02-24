import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "../Box";
import { ScrollArea } from "./ScrollArea";

const meta: Meta<typeof ScrollArea> = {
  component: ScrollArea,
};
export default meta;

export const Primary: StoryObj<typeof ScrollArea> = {
  args: {
    width: 300,
    height: 200,
    children: (
      <>
        {Array.from({ length: 30 }).map((_, i) => (
          <Box key={i}>Item {i + 1}</Box>
        ))}
      </>
    ),
  },
};
