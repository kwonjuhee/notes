import type { Meta, StoryObj } from "@storybook/react";
import { fgColor, fontSize, fontWeight } from "@/types/token";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  component: Text,
  argTypes: {
    as: {
      control: false,
    },
    size: {
      control: "select",
      options: fontSize,
    },
    weight: {
      control: "select",
      options: fontWeight,
    },
    color: {
      control: "select",
      options: fgColor,
    },
  },
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
  render: () => (
    <>
      {variants.map((variant) => (
        <Text key={variant} as="div" variant={variant}>
          {variant}
        </Text>
      ))}
    </>
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
