import type { Meta, StoryObj } from "@storybook/react";
import { PostItem } from "./PostItem";

const meta: Meta<typeof PostItem> = {
  title: "blog/PostItem",
  component: PostItem,
};
export default meta;

export const Primary: StoryObj<typeof PostItem> = {
  args: {
    title: "Title",
    description:
      "Do incididunt ut veniam ullamco magna nisi ipsum reprehenderit aliquip in velit aliquip est incididunt. Incididunt amet veniam cupidatat qui aliquip duis culpa aliqua tempor. Commodo occaecat non minim dolore cupidatat nisi magna deserunt commodo pariatur amet tempor. Ea nisi esse deserunt labore nisi incididunt velit.",
    created: "2025-01-01",
  },
};
