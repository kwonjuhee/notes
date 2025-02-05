import { create } from "zustand";
import { createSidebarSlice, SidebarSlice } from "./sidebar";

type RootStore = SidebarSlice;

export const useRootStore = create<RootStore>()((...a) => ({
  ...createSidebarSlice(...a),
}));
