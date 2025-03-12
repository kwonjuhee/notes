import type { Meta, StoryObj } from "@storybook/react";
import * as iconSVGs from "@/assets/icon";
import { Button } from "./Button";
import { IconButton } from "./IconButton";

const meta: Meta<typeof Button> = {
  component: Button,
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
  render: (args) => (
    <>
      <Button {...args} size="small">
        Button
      </Button>
      <Button {...args} size="medium">
        Button
      </Button>
      <Button {...args} size="large">
        Button
      </Button>
    </>
  ),
};

export const Variants: StoryObj<typeof Button> = {
  render: (args) => (
    <>
      <Button {...args} variant="solid">
        Button
      </Button>
      <Button {...args} variant="subtle">
        Button
      </Button>
      <Button {...args} variant="outline">
        Button
      </Button>
      <Button {...args} variant="ghost">
        Button
      </Button>
    </>
  ),
};

export const Colors: StoryObj<typeof Button> = {
  render: (args) => (
    <>
      <Button {...args} color="brand">
        Button
      </Button>
      <Button {...args} color="gray">
        Button
      </Button>
    </>
  ),
};

export const IconOnly: StoryObj<typeof IconButton> = {
  args: {
    icon: "MagnifyingGlass",
    size: "medium",
    variant: "ghost",
  },
  argTypes: {
    icon: {
      control: "select",
      options: Object.keys(iconSVGs),
    },
  },
  render: (args) => <IconButton {...args} />,
};
