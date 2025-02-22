import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "../Box";
import { Flex } from "./Flex";

const meta: Meta<typeof Flex> = {
  component: Flex,
};
export default meta;

const BoxList = () =>
  Array.from({ length: 5 }, (_, i) => (
    <Box
      key={i}
      width="60px"
      height="60px"
      backgroundColor="gray-subtle"
      borderWidth="1px"
      borderColor="gray"
      borderRadius="medium"
    >
      {i + 1}
    </Box>
  ));

export const Primary: StoryObj<typeof Flex> = {
  render: (args) => (
    <Flex width="500px" {...args}>
      <BoxList />
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

export const Responsive: StoryObj<typeof Flex> = {
  render: (args) => (
    <Flex width="500px" {...args}>
      <BoxList />
    </Flex>
  ),
  args: {
    direction: { base: "column", sm: "row" },
    gap: 8,
  },
};
