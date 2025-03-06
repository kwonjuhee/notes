import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  component: Input,
};
export default meta;

export const Primary: StoryObj<typeof Input> = {
  args: {
    placeholder: "placeholder",
  },
};

export const Controlled: StoryObj<typeof Input> = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return <Input value={value} onChange={onChange} {...args} />;
  },
};

export const Disabled: StoryObj<typeof Input> = {
  args: {
    disabled: true,
  },
};

export const Error: StoryObj<typeof Input> = {
  args: {
    hasError: true,
  },
};
