import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Collapsible } from "./Collapsible";

const meta: Meta<typeof Collapsible.Root> = {
  title: "components/Collapsible",
  argTypes: {
    unmountOnExit: {
      control: "boolean",
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof Collapsible.Root> = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Collapsible.Root {...args} open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
        <Collapsible.Trigger>Toggle Collapsible</Collapsible.Trigger>
        <Collapsible.Content>
          Voluptate occaecat Lorem enim elit enim cupidatat. Ipsum eiusmod ut irure tempor
          reprehenderit nostrud enim aliqua Lorem aliquip ea labore. Non consectetur aliqua
          reprehenderit sit non consectetur mollit labore. Laborum consequat id ad qui sit in fugiat
          cupidatat nostrud reprehenderit occaecat. Deserunt ea nostrud quis exercitation culpa sunt
          amet velit laborum. Dolore amet ea dolore irure magna eiusmod.
        </Collapsible.Content>
      </Collapsible.Root>
    );
  },
};
