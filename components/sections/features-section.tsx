import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { BlurWords, revealIndex } from "@/components/blur-words";
import {
  AchievementsVisual,
  AiModeVisual,
  SavedVisual,
  TwoPlayerVisual,
  WinVisual,
} from "@/components/feature-visuals";
import { cn } from "@/lib/utils";

const BAND_SHAPE = `polygon(
  0 var(--notch), 18% var(--notch), calc(18% + var(--notch)) 0, calc(82% - var(--notch)) 0, 82% var(--notch), 100% var(--notch),
  100% calc(100% - var(--notch)), 82% calc(100% - var(--notch)), calc(82% - var(--notch)) 100%, calc(18% + var(--notch)) 100%, 18% calc(100% - var(--notch)), 0 calc(100% - var(--notch))
)`;

const features: { title: string; description: string; span: string; visual: ReactNode }[] = [
  {
    title: "Two Player",
    description: "Play a friend on the same board, taking turns as X and O.",
    span: "sm:col-span-2 lg:col-span-3",
    visual: <TwoPlayerVisual />,
  },
  {
    title: "AI Mode",
    description: "Take on the computer, with difficulty and response time you can adjust.",
    span: "lg:col-span-3",
    visual: <AiModeVisual />,
  },
  {
    title: "Achievements",
    description: "Track your progress and unlock new milestones as you play.",
    span: "lg:col-span-2",
    visual: <AchievementsVisual />,
  },
  {
    title: "Win animations",
    description: "Celebrate a win your way, from a subtle effect to a burst of confetti.",
    span: "lg:col-span-2",
    visual: <WinVisual />,
  },
  {
    title: "Saved automatically",
    description: "Achievements and settings save as you go, so your progress is never lost.",
    span: "lg:col-span-2",
    visual: <SavedVisual />,
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      data-nav-tone="brand"
      className="scroll-mt-16 bg-brand-band py-32 text-white [--notch:24px] sm:py-40 sm:[--notch:32px]"
      style={{ clipPath: BAND_SHAPE }}
    >
      <div className="shell">
        <Reveal>
          <h2 className="lede max-w-[46rem]">
            <BlurWords text="Play your way." />{" "}
            <span className="text-white/70">
              <BlurWords text="A friend or the AI, achievements to chase and wins worth celebrating." offset={3} />
            </span>
          </h2>
        </Reveal>

        <Reveal className="mt-14 grid gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-6">
          {features.map((feature, i) => (
            <article
              key={feature.title}
              className={cn(
                "reveal-item flex min-w-0 flex-col rounded-[28px] bg-white/8 p-6 ring-1 ring-inset ring-white/10 sm:p-7",
                feature.span
              )}
              style={revealIndex(i)}
            >
              <div aria-hidden="true" className="flex min-h-[208px] items-center justify-center">
                {feature.visual}
              </div>
              <h3 className="mt-7 font-display text-xl font-semibold tracking-[-0.015em]">{feature.title}</h3>
              <p className="mt-1.5 max-w-[22rem] text-[15px] leading-relaxed text-white/80">{feature.description}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
