import { MoonStars, Sun } from "@/assets/icon";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useTheme } from "@/theme";
import { Button, ButtonProps } from "../Button";

export interface ThemeToggleProps {
  size?: ButtonProps["size"];
}

export const ThemeToggle = ({ size = "large" }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const isMounted = useIsMounted();

  return (
    isMounted && (
      <Button variant="ghost" color="gray" size={size} onClick={toggleTheme}>
        {theme === "light" ? <Sun /> : <MoonStars />}
      </Button>
    )
  );
};
