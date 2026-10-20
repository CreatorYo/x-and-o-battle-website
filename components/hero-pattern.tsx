import { cn } from "@/lib/utils";

const ROWS = 6;
const COLS = 6;

const fadeBottom = "linear-gradient(to bottom, black 35%, transparent 92%)";

function PatternSide({ side }: { side: "left" | "right" }) {
  const fadeInward = `linear-gradient(to ${side === "left" ? "right" : "left"}, black 0%, transparent 80%)`;

  return (
    <div
      className={cn(
        "absolute top-0 flex h-[560px] w-1/2 animate-fade-in-slow overflow-hidden sm:h-[720px]",
        side === "left" ? "left-0 justify-start" : "right-0 justify-end"
      )}
      style={{
        maskImage: `${fadeInward}, ${fadeBottom}`,
        WebkitMaskImage: `${fadeInward}, ${fadeBottom}`,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    >
      <div className="grid shrink-0 grid-cols-[repeat(6,80px)] auto-rows-[80px] sm:grid-cols-[repeat(6,120px)] sm:auto-rows-[120px]">
        {Array.from({ length: ROWS * COLS }, (_, i) => {
          const row = Math.floor(i / COLS);
          const col = i % COLS;
          const isX = (row + col + (side === "right" ? 1 : 0)) % 2 === 0;
          return (
            <span
              key={i}
              className={cn(
                "grid place-items-center font-display text-[30px] leading-none text-foreground/7 sm:text-[44px] dark:text-foreground/16",
                isX ? "font-bold" : "font-light"
              )}
            >
              {isX ? "X" : "O"}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function HeroPattern() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 select-none">
      <PatternSide side="left" />
      <PatternSide side="right" />
    </div>
  );
}
