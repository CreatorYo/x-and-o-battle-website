"use client";

import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          title="Switch Theme"
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
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white dark:bg-[#111] border-gray-200 dark:border-[#222]">
        <DropdownMenuItem onClick={() => setTheme("system")} className="hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-[#222] dark:focus:bg-[#222] flex items-center justify-between">
          <div className="flex items-center">
            <Laptop className="mr-2 h-4 w-4" />
            System
          </div>
          {theme === "system" && <div className="h-2 w-2 rounded-full bg-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("light")} className="hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-[#222] dark:focus:bg-[#222] flex items-center justify-between">
          <div className="flex items-center">
            <Sun className="mr-2 h-4 w-4" />
            Light
          </div>
          {theme === "light" && <div className="h-2 w-2 rounded-full bg-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-[#222] dark:focus:bg-[#222] flex items-center justify-between">
          <div className="flex items-center">
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </div>
          {theme === "dark" && <div className="h-2 w-2 rounded-full bg-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}