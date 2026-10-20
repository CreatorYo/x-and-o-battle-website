"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const MAX_TILT_DEG = 12;

const unit = (value: number) => Math.min(1, Math.max(0, value));

export function PointerTilt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) {
      return;
    }

    let frame = 0;

    const onEnter = () => {
      node.dataset.active = "";
    };

    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const visibleBottom = Math.min(rect.bottom, node.parentElement?.getBoundingClientRect().bottom ?? rect.bottom);
        const x = unit((event.clientX - rect.left) / rect.width);
        const y = unit((event.clientY - rect.top) / (visibleBottom - rect.top));
        node.style.setProperty("--tilt-x", `${(0.5 - y) * 2 * MAX_TILT_DEG}deg`);
        node.style.setProperty("--tilt-y", `${(x - 0.5) * 2 * MAX_TILT_DEG}deg`);
        node.style.setProperty("--glare-x", `${x * 100}%`);
        node.style.setProperty("--glare-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      delete node.dataset.active;
      node.style.removeProperty("--tilt-x");
      node.style.removeProperty("--tilt-y");
    };

    node.addEventListener("pointerenter", onEnter);
    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener("pointerenter", onEnter);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={cn("group/tilt", className)}>
      <div className="@container relative transition-[transform,scale] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform:perspective(1000px)_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))] group-data-active/tilt:scale-[1.03] group-data-active/tilt:duration-200">
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[16.6cqw] opacity-0 mix-blend-plus-lighter transition-opacity duration-500 group-data-active/tilt:opacity-100"
          style={{
            backgroundImage:
              "radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 30%), rgb(255 255 255 / 0.24), rgb(255 255 255 / 0.08) 28%, transparent 55%)",
          }}
        />
      </div>
    </div>
  );
}
