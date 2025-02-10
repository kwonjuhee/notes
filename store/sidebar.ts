import { StateCreator } from "zustand";

export interface SidebarSlice {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  isMobileSidebarOpen: boolean;
  openMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  toggleMobileSidebar: () => void;
}

export const createSidebarSlice: StateCreator<SidebarSlice> = (set) => ({
  isSidebarOpen: true,
  openSidebar: () => set(() => ({ isSidebarOpen: true })),
  closeSidebar: () => set(() => ({ isSidebarOpen: false })),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  isMobileSidebarOpen: false,
  openMobileSidebar: () => set(() => ({ isMobileSidebarOpen: true })),
  closeMobileSidebar: () => set(() => ({ isMobileSidebarOpen: false })),
  toggleMobileSidebar: () => set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),
});
