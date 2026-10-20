import { cn } from "@/lib/utils";

export type NavTone = "band" | "brand";

export const isNavTone = (value?: string): value is NavTone => value === "band" || value === "brand";

const TINT: Record<NavTone, string> = {
  band: "bg-band",
  brand: "bg-brand-band",
};

const BLUR_LAYERS = [
  "backdrop-blur-[1px] backdrop-saturate-150 [mask-image:linear-gradient(to_top,transparent,black_30%)]",
  "backdrop-blur-[2px] [mask-image:linear-gradient(to_top,transparent_20%,black_50%)]",
  "backdrop-blur-[4px] [mask-image:linear-gradient(to_top,transparent_40%,black_70%)]",
  "backdrop-blur-[8px] [mask-image:linear-gradient(to_top,transparent_60%,black_90%)]",
];

export function ScrollEdge({ visible, tone }: { visible: boolean; tone?: NavTone }) {
  const fade = cn("absolute inset-0 transition-opacity duration-300", visible ? "opacity-100" : "opacity-0");

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 h-[calc(100%+2rem)] transition-[visibility] duration-300",
        visible ? "visible" : "invisible"
      )}
    >
      {BLUR_LAYERS.map((layer) => (
        <div key={layer} className={cn(fade, layer)} />
      ))}
      <div
        className={cn(
          fade,
          "scroll-edge-fade transition-[opacity,background-color]",
          tone ? TINT[tone] : "bg-background"
        )}
      />
    </div>
  );
}
