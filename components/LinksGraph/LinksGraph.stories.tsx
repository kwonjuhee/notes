import type { Meta, StoryObj } from "@storybook/react";
import { LinksGraph } from "./LinksGraph";

const meta: Meta<typeof LinksGraph> = {
  component: LinksGraph,
};
export default meta;

const nodes = new Array(10).fill(0).map((_, i) => ({ id: String.fromCharCode(65 + i) }));
const links = [
  { source: "A", target: "B" },
  { source: "A", target: "E" },
  { source: "A", target: "F" },
  { source: "B", target: "C" },
  { source: "B", target: "G" },
  { source: "C", target: "D" },
  { source: "H", target: "C" },
  { source: "D", target: "E" },
  { source: "D", target: "I" },
  { source: "E", target: "J" },
];

export const Primary: StoryObj<typeof LinksGraph> = {
  args: {
    width: 400,
    height: 300,
    data: { nodes, links },
  },
};
