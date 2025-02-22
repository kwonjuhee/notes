import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Collapsible } from "./Collapsible";
import styles from "./Collapsible.module.css";

const meta: Meta<typeof Collapsible> = {
  title: "components/Collapsible",
};
export default meta;

export const Primary: StoryObj<typeof Collapsible> = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Collapsible.Root open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
        <Collapsible.Trigger>Toggle Collapsible</Collapsible.Trigger>
        <Collapsible.Content className={styles.content}>
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
