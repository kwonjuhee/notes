import { IconButton } from "@/components/Button";
import { useRootStore } from "@/store/useRootStore";
import styles from "./SidebarHandle.module.css";

export interface SidebarHandleProps {}

export const SidebarHandle = () => {
  const isSidebarClose = !useRootStore((state) => state.isSidebarOpen);
  const openSidebar = useRootStore((state) => state.openSidebar);

  return (
    isSidebarClose && (
      <div className={styles.handle}>
        <IconButton
          icon="CaretRight"
          color="gray"
          variant="subtle"
          className={styles.handle}
          onClick={openSidebar}
        />
      </div>
    )
  );
};
