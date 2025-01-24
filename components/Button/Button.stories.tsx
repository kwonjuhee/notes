import type { Meta, StoryObj } from "@storybook/react";
import { color, radius } from "@/types/token";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    color: {
      control: "radio",
      options: color,
    },
    radius: {
      control: "select",
      options: radius,
    },
  },
};
export default meta;

export const Playground: StoryObj<typeof Button> = {
  args: {
    variant: "solid",
    color: "brand",
    radius: "medium",
    disabled: false,
    fullWidth: false,
    children: "Button",
  },
};

export const Sizes: StoryObj<typeof Button> = {
  render: () => (
    <>
      <Button size="small">Button</Button>
      <Button size="medium">Button</Button>
      <Button size="large">Button</Button>
    </>
  ),
};

export const Variants: StoryObj<typeof Button> = {
  render: () => (
    <>
      <Button variant="solid">Button</Button>
      <Button variant="subtle">Button</Button>
      <Button variant="outline">Button</Button>
      <Button variant="ghost">Button</Button>
    </>
  ),
};

export const Colors: StoryObj<typeof Button> = {
  render: () => (
    <>
      <Button color="brand">Button</Button>
      <Button color="gray">Button</Button>
    </>
  ),
};
