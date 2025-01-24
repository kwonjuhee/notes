import type { Meta, StoryObj } from "@storybook/react";
import { SubTree, TreeItem, TreeView } from "./TreeView";

const meta: Meta<typeof TreeView> = {
  component: TreeView,
};
export default meta;

export const Primary: StoryObj<typeof TreeView> = {
  render: () => (
    <TreeView>
      <TreeItem>
        Item1
        <SubTree>
          <TreeItem>
            Item1-1
            <SubTree>
              <TreeItem>item1-1-1</TreeItem>
              <TreeItem>item1-1-2</TreeItem>
              <TreeItem>item1-1-3</TreeItem>
            </SubTree>
          </TreeItem>
          <TreeItem>
            Item1-2
            <SubTree>
              <TreeItem>item1-2-1</TreeItem>
              <TreeItem>item1-2-2</TreeItem>
              <TreeItem>item1-2-3</TreeItem>
            </SubTree>
          </TreeItem>
        </SubTree>
      </TreeItem>
      <TreeItem>
        Item2
        <SubTree>
          <TreeItem>item2-1</TreeItem>
          <TreeItem>item2-1</TreeItem>
          <TreeItem>item2-1</TreeItem>
        </SubTree>
      </TreeItem>
      <TreeItem>item1</TreeItem>
      <TreeItem>item2</TreeItem>
    </TreeView>
  ),
};
