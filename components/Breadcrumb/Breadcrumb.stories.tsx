import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  component: Breadcrumb,
};
export default meta;

const breadcrumbItems = [
  { label: "Home" },
  { label: "Directory1" },
  { label: "Directory2" },
  { label: "item" },
];

export const Primary: StoryObj<typeof Breadcrumb> = {
  args: {
    items: breadcrumbItems,
  },
};
