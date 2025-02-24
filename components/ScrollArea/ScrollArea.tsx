"use client";

import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { useResizeObserver } from "@/hooks/useResizeObserver";
import styles from "./ScrollArea.module.css";

type Sizes = {
  viewportHeight: number;
  contentHeight: number;
};

export interface ScrollAreaProps extends React.ComponentPropsWithoutRef<"div"> {
  width?: number;
  height?: number;
  children: React.ReactNode;
}

export const ScrollArea = ({ width, height, className, children, ...props }: ScrollAreaProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [sizes, setSizes] = useState<Sizes>({ viewportHeight: 0, contentHeight: 0 });
  const [thumbPosition, setThumbPosition] = useState(0);

  /**
   * Update thumb position when the viewport is scrolled
   */
  const updateThumbPosition = useCallback(
    (scrollTop: number) => {
      const { viewportHeight, contentHeight } = sizes;
      const scrollRatio = scrollTop / (contentHeight - viewportHeight);
      const thumbPosition = scrollRatio * (viewportHeight - getThumbHeight(sizes));

      setThumbPosition(Number.isNaN(thumbPosition) ? 0 : thumbPosition);
    },
    [sizes]
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (viewport) {
      const handleScroll = () => {
        updateThumbPosition(viewport.scrollTop);
      };

      viewport.addEventListener("scroll", handleScroll);
      return () => viewport.removeEventListener("scroll", handleScroll);
    }
  }, [updateThumbPosition]);

  /**
   * Update sizes and thumb position when the viewport or content is resized
   */
  const updateSizes = useCallback(() => {
    const viewport = viewportRef.current;
    if (viewport) {
      setSizes({
        contentHeight: viewport.scrollHeight,
        viewportHeight: viewport.clientHeight,
      });
    }
  }, []);

  useResizeObserver({
    ref: viewportRef,
    onResize: updateSizes,
  });

  useResizeObserver({
    ref: contentRef,
    onResize: updateSizes,
  });

  useEffect(() => {
    const viewport = viewportRef.current;
    if (viewport) {
      updateThumbPosition(viewport.scrollTop);
    }
  }, [sizes, updateThumbPosition]);

  const hasScrollbar = sizes.viewportHeight !== getThumbHeight(sizes);

  return (
    <div
      className={styles.wrapper}
      style={
        {
          "--scrollarea-width": width ? `${width}px` : undefined,
          "--scrollarea-height": height ? `${height}px` : undefined,
          "--thumb-height": `${getThumbHeight(sizes)}px` /** Calcaulate thumb height based on sizes */,
          "--thumb-position": thumbPosition ? `${thumbPosition}px` : 0,
        } as React.CSSProperties
      }
    >
      <div ref={viewportRef} className={clsx(styles.viewport, className)} {...props}>
        <div ref={contentRef}>{children}</div>
      </div>
      {hasScrollbar && <Scrollbar />}
    </div>
  );
};

const Scrollbar = () => {
  return (
    <div className={styles.scrollbar}>
      <div className={styles.thumb} />
    </div>
  );
};

const getThumbHeight = (sizes: Sizes) => {
  const { viewportHeight, contentHeight } = sizes;
  const thumbRatio = viewportHeight / contentHeight;
  return (Number.isNaN(thumbRatio) ? 0 : thumbRatio) * viewportHeight;
};
