import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@/components/Box";
import { ColorSwitcher } from "./ColorSwitcher";

const meta: Meta<typeof ColorSwitcher> = {
  title: "notes/ColorSwitcher",
  component: ColorSwitcher,
};
export default meta;

export const Primary: StoryObj<typeof ColorSwitcher> = {
  render: () => (
    <Box marginX="120px" marginY="80px">
      <ColorSwitcher />
    </Box>
  ),
};
