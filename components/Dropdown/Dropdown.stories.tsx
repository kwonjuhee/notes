import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "../Box";
import { Dropdown } from "./Dropdown";

const meta: Meta<typeof Dropdown.Content> = {
  title: "components/Dropdown",
  argTypes: {
    side: {
      options: ["top", "bottom"],
      control: "radio",
    },
    align: {
      options: ["start", "center", "end"],
      control: "radio",
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof Dropdown> = {
  render: (args) => (
    <Box marginX="120px" marginY="80px">
      <Dropdown.Root>
        <Dropdown.Trigger variant="solid">Trigger</Dropdown.Trigger>
        <Dropdown.Content side="bottom" align="center" {...args}>
          <Box width="120px" height="80px" />
        </Dropdown.Content>
      </Dropdown.Root>
    </Box>
  ),
};
