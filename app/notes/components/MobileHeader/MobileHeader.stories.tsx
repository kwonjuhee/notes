import type { Meta, StoryObj } from "@storybook/react";
import { MobileHeader } from "./MobileHeader";

const meta: Meta<typeof MobileHeader> = {
  title: "notes/MobileHeader",
  component: MobileHeader,
};
export default meta;

export const Primary: StoryObj<typeof MobileHeader> = {};
