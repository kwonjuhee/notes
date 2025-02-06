import type { Meta, StoryObj } from "@storybook/react";
import { color } from "@/types/token";
import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
  component: Chip,
  argTypes: {
    color: {
      control: "radio",
      options: color,
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof Chip> = {
  args: {
    label: "Chip",
    variant: "subtle",
    color: "brand",
  },
};
