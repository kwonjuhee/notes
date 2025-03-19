import { useEffect, useRef, useState } from "react";

type Size = {
  width: number | undefined;
  height: number | undefined;
};

type UseResizeObserverProps<T> = {
  ref: React.RefObject<T>;
  onResize?: (size: Size) => void;
};

export const useResizeObserver = <T extends Element>({
  ref,
  onResize: _onResize,
}: UseResizeObserverProps<T>) => {
  const [size, setSize] = useState<Size>({ width: undefined, height: undefined });
  const onResize = useRef<((size: Size) => void) | undefined>(_onResize);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.borderBoxSize[0].inlineSize;
      const height = entry.borderBoxSize[0].blockSize;
      setSize({ width, height });
      onResize.current?.({ width, height });
    });

    observer.observe(element, { box: "border-box" });

    return () => {
      observer.unobserve(element);
    };
  }, [ref]);

  return size;
};
