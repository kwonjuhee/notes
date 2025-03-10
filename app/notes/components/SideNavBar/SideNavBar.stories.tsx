import type { Meta, StoryObj } from "@storybook/react";
import { SideNavBar } from "./SideNavBar";

const meta: Meta<typeof SideNavBar> = {
  title: "notes/SideNavBar",
  component: SideNavBar,
};
export default meta;

export const Primary: StoryObj<typeof SideNavBar> = {
  args: {
    navItems: [
      {
        label: "Item1",
        path: "",
        childNodes: [
          {
            label: "Item1-1",
            path: "",
            childNodes: [
              { label: "item1-1-1", path: "" },
              { label: "item1-1-2", path: "" },
              { label: "item1-1-3", path: "" },
            ],
          },
          {
            label: "Item1-2",
            path: "",
            childNodes: [
              { label: "item1-2-1", path: "" },
              { label: "item1-2-2", path: "" },
              { label: "item1-2-3", path: "" },
            ],
          },
        ],
      },
      {
        label: "Item2",
        path: "",
        childNodes: [
          {
            label: "Item2-1",
            path: "",
            childNodes: [
              { label: "item2-1-1", path: "" },
              { label: "item2-1-2", path: "" },
              { label: "item2-1-3", path: "" },
            ],
          },
        ],
      },
      { label: "item1", path: "" },
      { label: "item2", path: "" },
    ],
  },
};
