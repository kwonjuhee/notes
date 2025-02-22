import { useLayoutEffect, useRef, useState } from "react";
import { CollapsibleProvider, useCollapsibleContext } from "./Collapsible.context";

export interface CollapsibleProps extends React.ComponentPropsWithoutRef<"div"> {
  open: boolean;
  onOpenChange: () => void;
  children: React.ReactNode;
}

export const CollapsibleRoot = ({ open, onOpenChange, children, ...props }: CollapsibleProps) => {
  return (
    <CollapsibleProvider open={open} onOpenChange={onOpenChange}>
      <div {...props}>{children}</div>
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

  return (
    <div
      ref={ref}
      data-state={context.open ? "open" : "closed"}
      style={{ ["--collapsible-content-height"]: `${height}px` } as React.CSSProperties}
      onTransitionEnd={handleTransitionEnd}
      {...props}
    >
      {isOpen && children}
    </div>
  );
};

export const Collapsible = {
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
};
