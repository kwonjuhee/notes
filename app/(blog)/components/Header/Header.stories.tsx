import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "blog/Header",
  component: Header,
};
export default meta;

export const Primary: StoryObj<typeof Header> = {};
