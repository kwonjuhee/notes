import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
  component: Chip,
};
export default meta;

export const Primary: StoryObj<typeof Chip> = {
  args: {
    label: "Chip",
    variant: "subtle",
    color: "brand",
  },
};
