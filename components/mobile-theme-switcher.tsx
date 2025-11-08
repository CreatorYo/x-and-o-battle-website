"use client";

import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function MobileThemeSwitcher() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  if (!mounted) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-5 w-5 text-foreground/60 hover:text-foreground hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
      >
        <span className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      title="Switch Theme"
      onClick={handleToggle}
      className="h-5 w-5 text-foreground/60 hover:text-foreground hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
    >
      {theme === "light" ? (
        <Sun className="h-5 w-5" />
      ) : theme === "dark" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Laptop className="h-5 w-5" />
      )}
    </Button>
  );
}