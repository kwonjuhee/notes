import { useIsMounted } from "@/hooks/useIsMounted";
import { useTheme } from "@/theme";
import { IconButton, IconButtonProps } from "../Button/IconButton";

export interface ThemeToggleProps {
  size?: IconButtonProps["size"];
}

export const ThemeToggle = ({ size = "large" }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const isMounted = useIsMounted();

  return (
    isMounted && (
      <IconButton
        icon={theme === "light" ? "Sun" : "MoonStars"}
        variant="ghost"
        color="gray"
        size={size}
        onClick={toggleTheme}
      ></IconButton>
    )
  );
};
