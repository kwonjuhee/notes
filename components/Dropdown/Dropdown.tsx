import clsx from "clsx";
import { useCallback, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useResizeObserver } from "@/hooks/useResizeObserver";
import { Button, ButtonProps } from "../Button";
import { DropdownProvider, useDropdownContext } from "./Dropdown.context";
import styles from "./Dropdown.module.css";

export interface DropdownProps extends React.ComponentPropsWithoutRef<"div"> {
  defaultOpen?: boolean;
}

export const DropdownRoot = ({
  defaultOpen = false,
  children,
  className,
  ...props
}: React.PropsWithChildren<DropdownProps>) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(defaultOpen);

  return (
    <DropdownProvider
      isDropdownOpen={isDropdownOpen}
      openDropdown={useCallback(() => {
        setIsDropdownOpen(true);
      }, [])}
      closeDropdown={useCallback(() => {
        setIsDropdownOpen(false);
      }, [])}
      toggleDropdown={useCallback(() => {
        setIsDropdownOpen((prev) => !prev);
      }, [])}
    >
      <div className={clsx(styles.root, className)} {...props}>
        {children}
      </div>
    </DropdownProvider>
  );
};

export interface DropdownTriggerProps extends ButtonProps {}

export const DropdownTrigger = ({
  onClick,
  className,
  children,
  ...props
}: React.PropsWithChildren<DropdownTriggerProps>) => {
  const { isDropdownOpen, openDropdown } = useDropdownContext();

  return (
    <Button
      variant="ghost"
      color="gray"
      className={clsx(styles.trigger, className)}
      onClick={(e) => {
        if (!isDropdownOpen) {
          e.stopPropagation();
          openDropdown();
        }
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export interface DropdownContentProps extends React.ComponentPropsWithoutRef<"div"> {
  side: "top" | "bottom";
  align: "start" | "center" | "end";
  offset?: number;
}

export const DropdownContent = ({
  side,
  align,
  offset = 6,
  className,
  style,
  children,
}: React.PropsWithChildren<DropdownContentProps>) => {
  const { isDropdownOpen, closeDropdown } = useDropdownContext();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { height } = useResizeObserver({ ref: dropdownRef });

  useClickOutside(
    dropdownRef,
    useCallback(() => {
      if (isDropdownOpen) {
        closeDropdown();
      }
    }, [closeDropdown, isDropdownOpen])
  );

  const transformStyle = (side: string, align: string) => {
    const slideOffset = side === "top" ? "-4px" : "4px";
    const translateX = align === "center" ? "-50%" : "0";

    return `translate(${translateX}, ${slideOffset})`;
  };

  return (
    <div
      ref={dropdownRef}
      data-state={isDropdownOpen ? "open" : "close"}
      className={clsx(styles.content, styles[`side-${side}`], styles[`align-${align}`], className)}
      style={
        {
          "--content-height": `${height}px`,
          "--offset": `${offset}px`,
          transform: isDropdownOpen ? transformStyle(side, align) : null,
          ...style,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};

export const Dropdown = {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Content: DropdownContent,
};
