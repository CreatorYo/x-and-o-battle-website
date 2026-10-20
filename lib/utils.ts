import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fieldSurface =
  "w-full scroll-mt-32 rounded-xl border border-border bg-background px-4 text-[15px] inset-shadow-[0_2px_4px_rgb(0_0_0/0.08)] transition-colors placeholder:text-muted-foreground focus-visible:border-ring/60 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/4 dark:inset-shadow-[0_2px_6px_rgb(0_0_0/0.75)]";
