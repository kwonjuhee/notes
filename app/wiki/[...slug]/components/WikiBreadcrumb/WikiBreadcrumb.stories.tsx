import type { Meta, StoryObj } from "@storybook/react";
import { WikiBreadcrumb } from "./WikiBreadcrumb";

const meta: Meta<typeof WikiBreadcrumb> = {
  title: "wiki/WikiBreadcrumb",
  component: WikiBreadcrumb,
};
export default meta;

const breadcrumbItems = [
  { label: "Home" },
  { label: "Directory1" },
  { label: "Directory2" },
  { label: "item" },
];

export const Primary: StoryObj<typeof WikiBreadcrumb> = {
  args: {
    items: breadcrumbItems,
  },
};
