import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../Button";
import { Flex } from "../Flex";
import { Modal } from "./Modal";

const meta: Meta<typeof Modal> = {
  component: Modal,
};
export default meta;

export const Primary: StoryObj<typeof Modal> = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <Flex align="center" justify="center" width="500px" height="300px">
            Modal Contents
          </Flex>
        </Modal>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      </>
    );
  },
};
