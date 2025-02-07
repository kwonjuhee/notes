import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "./Box";

const meta: Meta<typeof Box> = {
  component: Box,
};
export default meta;

export const Primary: StoryObj<typeof Box> = {
  args: {
    width: "100px",
    height: "100px",
    backgroundColor: "gray",
    borderWidth: "1px",
    borderColor: "gray",
    borderRadius: "medium",
    margin: "50px",
  },
};

export const Responsive: StoryObj<typeof Box> = {
  args: {
    display: { base: "none", sm: "block" },
    width: { base: "100px", sm: "200px", md: "300px", lg: "400px" },
    height: "100px",
    backgroundColor: "gray",
    borderWidth: "1px",
    borderColor: "gray",
    borderRadius: "medium",
    margin: "50px",
  },
};
