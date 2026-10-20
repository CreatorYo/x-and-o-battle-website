"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Laptop },
] as const;

const STEP = 28;

const subscribe = () => () => {};

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const activeIndex = mounted ? OPTIONS.findIndex((option) => option.value === theme) : -1;
  const pillRef = useRef<HTMLSpanElement>(null);
  const previousIndex = useRef(activeIndex);

  useEffect(() => {
    const from = previousIndex.current;
    previousIndex.current = activeIndex;
    if (from < 0 || activeIndex < 0 || from === activeIndex) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    pillRef.current?.animate(
      [{ translate: `${from * STEP}px 0` }, { translate: `${activeIndex * STEP}px 0` }],
      { duration: 280, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
    );
  }, [activeIndex]);

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={cn("relative inline-flex rounded-full border border-border p-[3px]", className)}
    >
      {activeIndex >= 0 && (
        <span
          ref={pillRef}
          aria-hidden="true"
          className="absolute left-[3px] top-[3px] size-7 rounded-full bg-secondary"
          style={{ translate: `${activeIndex * STEP}px 0` }}
        />
      )}
      {OPTIONS.map(({ value, label, Icon }, i) => {
        const active = i === activeIndex;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={cn(
              "relative grid size-7 place-items-center rounded-full transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="size-[15px]" />
          </button>
        );
      })}
    </div>
  );
}
