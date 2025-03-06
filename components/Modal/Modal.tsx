import { useRef } from "react";
import { IconButton } from "../Button";
import { Flex } from "../Flex";
import styles from "./Modal.module.css";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ isOpen, onClose, children }: React.PropsWithChildren<ModalProps>) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    isOpen && (
      <>
        <div className={styles.backdrop} onClick={onClose} />
        <div ref={ref} className={styles.modal} role="dialog">
          <Flex align="center" justify="end">
            <IconButton icon="X" variant="ghost" color="gray" size="medium" onClick={onClose} />
          </Flex>
          {children}
        </div>
      </>
    )
  );
};
