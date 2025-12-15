import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getTheme, setTheme, type Theme } from "@/lib/theme";

/**
 * ThemeToggle Component
 * Toggles between dark and black themes
 * Saves preference to localStorage
 */
export const ThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark');

  useEffect(() => {
    setCurrentTheme(getTheme());
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = currentTheme === 'dark' ? 'black' : 'dark';
    setTheme(newTheme);
    setCurrentTheme(newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative group hover:bg-cyber-elevated transition-smooth"
      aria-label="Toggle theme"
    >
      {currentTheme === 'dark' ? (
        <Moon className="h-5 w-5 text-primary group-hover:text-glow-cyan" />
      ) : (
        <Sun className="h-5 w-5 text-secondary group-hover:text-glow-purple" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
