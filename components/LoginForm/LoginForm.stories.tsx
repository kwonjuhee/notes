import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "./LoginForm";

const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
};
export default meta;

export const Primary: StoryObj<typeof LoginForm> = {};
