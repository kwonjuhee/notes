import { createContext, useContext, useMemo } from "react";

export type DropdownContextValue = {
  isDropdownOpen: boolean;
  openDropdown: () => void;
  closeDropdown: () => void;
  toggleDropdown: () => void;
};

const DropdownContext = createContext<DropdownContextValue | undefined>(undefined);

export const DropdownProvider = ({
  children,
  ...contextValue
}: React.PropsWithChildren<DropdownContextValue>) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => contextValue, Object.values(contextValue));

  return <DropdownContext.Provider value={value}>{children}</DropdownContext.Provider>;
};

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);

  if (!context) throw new Error("should be used within DropdownProvider");

  return context;
};
