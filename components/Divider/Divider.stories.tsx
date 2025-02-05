import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "../Flex";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  component: Divider,
};
export default meta;

export const Primary: StoryObj<typeof Divider> = {
  render: (args) => (
    <Flex width="200px" height="200px" align="center" justify="center">
      <Divider {...args} />
    </Flex>
  ),
};
