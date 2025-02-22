import { useLayoutEffect, useRef, useState } from "react";
import { CollapsibleProvider, useCollapsibleContext } from "./Collapsible.context";
import styles from "./Collapsible.module.css";

export interface CollapsibleProps extends React.ComponentPropsWithoutRef<"div"> {
  open: boolean;
  onOpenChange: () => void;
  unmountOnExit?: boolean;
  children: React.ReactNode;
}

export const CollapsibleRoot = ({
  open,
  onOpenChange,
  unmountOnExit = false,
  children,
  ...props
}: CollapsibleProps) => {
  return (
    <CollapsibleProvider open={open} onOpenChange={onOpenChange} unmountOnExit={unmountOnExit}>
      <div className={styles.Collapsible} {...props}>
        {children}
      </div>
    </CollapsibleProvider>
  );
};

export interface CollapsibleTriggerProps extends React.ComponentPropsWithoutRef<"button"> {}

export const CollapsibleTrigger = ({ children, onClick, ...props }: CollapsibleTriggerProps) => {
  const { onOpenChange } = useCollapsibleContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onOpenChange();
    onClick?.(e);
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
};

export interface CollapsibleContentProps extends React.ComponentPropsWithoutRef<"div"> {}

export const CollapsibleContent = ({ children, ...props }: CollapsibleContentProps) => {
  const context = useCollapsibleContext();
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(context.open);
  const isOpen = context.open || isVisible;

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (context.open) {
      setHeight(node.scrollHeight);
      setIsVisible(context.open);
    }
  }, [context.open]);

  const handleTransitionEnd = () => {
    if (!context.open) {
      setIsVisible(false);
    }
  };

  const getChildren = () => {
    if (context.unmountOnExit) {
      return isOpen && children;
    }

    return children;
  };

  return (
    <div
      ref={ref}
      data-state={context.open ? "open" : "closed"}
      className={styles.content}
      style={{ ["--collapsible-content-height"]: `${height}px` } as React.CSSProperties}
      onTransitionEnd={handleTransitionEnd}
      {...props}
    >
      {getChildren()}
    </div>
  );
};

export const Collapsible = {
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
};
