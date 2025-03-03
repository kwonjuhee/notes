import type { Meta, StoryObj } from "@storybook/react";
import { ChangeEvent, useState } from "react";
import { SearchInput } from "./SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "notes/SearchInput",
  component: SearchInput,
};
export default meta;

export const Primary: StoryObj<typeof SearchInput> = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("");

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    const onClear = () => {
      setValue("");
    };

    return (
      <SearchInput
        value={value}
        onChange={onChange}
        onClear={onClear}
        placeholder="search input..."
      />
    );
  },
};
