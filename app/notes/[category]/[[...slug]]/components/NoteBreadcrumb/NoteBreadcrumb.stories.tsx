import type { Meta, StoryObj } from "@storybook/react";
import { NoteBreadcrumb } from "./NoteBreadcrumb";

const meta: Meta<typeof NoteBreadcrumb> = {
  title: "notes/NoteBreadcrumb",
  component: NoteBreadcrumb,
};
export default meta;

const breadcrumbItems = [
  { label: "Home" },
  { label: "Directory1" },
  { label: "Directory2" },
  { label: "item" },
];

export const Primary: StoryObj<typeof NoteBreadcrumb> = {
  args: {
    items: breadcrumbItems,
  },
};
