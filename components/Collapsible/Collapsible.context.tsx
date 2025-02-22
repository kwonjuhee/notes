import { createContext, useContext, useMemo } from "react";

export type CollapsibleContextValue = {
  open: boolean;
  onOpenChange: () => void;
  unmountOnExit?: boolean;
};

export const CollapsibleContext = createContext<CollapsibleContextValue | undefined>(undefined);

export const CollapsibleProvider = ({
  children,
  ...context
}: CollapsibleContextValue & { children: React.ReactNode }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => context, Object.values(context));

  return <CollapsibleContext.Provider value={value}>{children}</CollapsibleContext.Provider>;
};

export const useCollapsibleContext = () => {
  const context = useContext(CollapsibleContext);

  if (!context) throw new Error("should be used in CollapsibleProvider");

  return context;
};
