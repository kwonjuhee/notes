import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "../Flex";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  component: Text,
};
export default meta;

const variants = [
  "heading20",
  "heading24",
  "heading30",
  "label14",
  "label16",
  "body14",
  "body16",
  "caption12",
  "caption14",
] as const;

export const Primary: StoryObj<typeof Text> = {
  render: (args) => (
    <Flex direction="column">
      {variants.map((variant) => (
        <Text key={variant} variant={variant} {...args}>
          {variant}
        </Text>
      ))}
    </Flex>
  ),
  argTypes: {
    size: { control: false },
    weight: { control: false },
  },
};

export const Playground: StoryObj<typeof Text> = {
  args: {
    children: "Text",
  },
};
