import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "../Box";
import { Flex } from "./Flex";

const meta: Meta<typeof Flex> = {
  component: Flex,
};
export default meta;

export const Primary: StoryObj<typeof Flex> = {
  render: (args) => (
    <Flex {...args} style={{ width: "500px" }}>
      {Array.from({ length: 5 }, (_, i) => (
        <Box
          key={i}
          width="60px"
          height="60px"
          backgroundColor="gray"
          borderWidth="1px"
          borderColor="gray"
          borderRadius="medium"
        >
          {i + 1}
        </Box>
      ))}
    </Flex>
  ),
  args: {
    display: "flex",
    direction: "row",
    align: "start",
    justify: "start",
    gap: 8,
  },
};
