import type { Meta, StoryObj } from "@storybook/react";
import { SideNavBar } from "./SideNavBar";

const meta: Meta<typeof SideNavBar> = {
  title: "wiki/SideNavBar",
  component: SideNavBar,
};
export default meta;

export const Primary: StoryObj<typeof SideNavBar> = {
  args: {
    navItems: [
      {
        id: "Item1",
        childNodes: [
          {
            id: "Item1-1",
            childNodes: [{ id: "item1-1-1" }, { id: "item1-1-2" }, { id: "item1-1-3" }],
          },
          {
            id: "Item1-2",
            childNodes: [{ id: "item1-2-1" }, { id: "item1-2-2" }, { id: "item1-2-3" }],
          },
        ],
      },
      {
        id: "Item2",
        childNodes: [
          {
            id: "Item2-1",
            childNodes: [{ id: "item2-1-1" }, { id: "item2-1-2" }, { id: "item2-1-3" }],
          },
        ],
      },
      { id: "item1" },
      { id: "item2" },
    ],
  },
};
