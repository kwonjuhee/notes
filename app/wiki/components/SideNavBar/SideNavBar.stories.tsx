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
        path: "",
        childNodes: [
          {
            id: "Item1-1",
            path: "",
            childNodes: [
              { id: "item1-1-1", path: "" },
              { id: "item1-1-2", path: "" },
              { id: "item1-1-3", path: "" },
            ],
          },
          {
            id: "Item1-2",
            path: "",
            childNodes: [
              { id: "item1-2-1", path: "" },
              { id: "item1-2-2", path: "" },
              { id: "item1-2-3", path: "" },
            ],
          },
        ],
      },
      {
        id: "Item2",
        path: "",
        childNodes: [
          {
            id: "Item2-1",
            path: "",
            childNodes: [
              { id: "item2-1-1", path: "" },
              { id: "item2-1-2", path: "" },
              { id: "item2-1-3", path: "" },
            ],
          },
        ],
      },
      { id: "item1", path: "" },
      { id: "item2", path: "" },
    ],
  },
};
