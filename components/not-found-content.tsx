"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const EDGE_THRESHOLD = 100;

export function NotFoundContent() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const desktop = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    let escapeHeld = false;

    const hide = () => {
      delete node.dataset.spotlight;
    };

    const onMove = (event: PointerEvent) => {
      if (escapeHeld || event.pointerType !== "mouse" || !desktop.matches) return;

      const rect = node.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const nearEdge =
        x < EDGE_THRESHOLD || y < EDGE_THRESHOLD || x > rect.width - EDGE_THRESHOLD || y > rect.height - EDGE_THRESHOLD;

      if (nearEdge) {
        hide();
        return;
      }

      node.style.setProperty("--spot-x", `${x}px`);
      node.style.setProperty("--spot-y", `${y}px`);
      node.dataset.spotlight = "";
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      escapeHeld = true;
      hide();
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Escape") escapeHeld = false;
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", hide);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", hide);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", hide);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("resize", hide);
    };
  }, []);

  return (
    <main
      ref={ref}
      className="group/spot relative grid min-h-screen place-items-center overflow-hidden bg-background px-6 py-16"
    >
      <div className="relative z-10 flex max-w-md flex-col items-center text-center">
        <div className="flex select-none gap-2.5" aria-hidden="true">
          {["4", "O", "4"].map((char, i) => (
            <span
              key={i}
              className={cn(
                "grid size-20 place-items-center rounded-[22%] bg-secondary font-display text-[40px] font-semibold leading-none sm:size-24 sm:text-5xl",
                char === "O" ? "text-mark-o" : "text-mark-x"
              )}
            >
              {char}
            </span>
          ))}
        </div>
        <h1 className="mt-10 font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
          This square is empty.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="shine mt-8 inline-flex h-11 select-none items-center gap-1.5 rounded-full bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition-[filter] hover:brightness-110"
        >
          Back to home <ChevronRight size={16} />
        </Link>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 hidden bg-black/85 opacity-0 transition-[opacity,--spot-radius] duration-300 ease-in-out [mask-image:radial-gradient(circle_var(--spot-radius)_at_var(--spot-x)_var(--spot-y),transparent,black)] group-data-spotlight/spot:opacity-100 group-data-spotlight/spot:[--spot-radius:200px] dark:block"
      />
    </main>
  );
}
