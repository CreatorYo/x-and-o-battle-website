import { ChevronRight, Eye, Megaphone, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { BlurWords, revealIndex } from "@/components/blur-words";
import { PRIVACY_URL } from "@/lib/links";

function BlockedTile({ Icon, index }: { Icon: LucideIcon; index: number }) {
  return (
    <span className="reveal-item relative grid size-14 place-items-center sm:size-16" style={revealIndex(index)}>
      <Icon className="size-9 text-muted-foreground sm:size-10" strokeWidth={1.75} />
      <svg viewBox="0 0 48 48" fill="none" strokeLinecap="round" className="absolute inset-0 size-full">
        <line x1={10} y1={10} x2={38} y2={38} pathLength={1} strokeWidth={6} className="reveal-strike stroke-background" />
        <line x1={10} y1={10} x2={38} y2={38} pathLength={1} strokeWidth={2.5} className="reveal-strike stroke-mark-o" />
      </svg>
    </span>
  );
}

const RING_SIZES = [260, 400, 540, 680, 820, 960];

function Rings() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(closest-side,black_30%,transparent)]"
    >
      <svg
        viewBox="-480 -480 960 960"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="size-[960px] shrink-0 text-primary/15 dark:text-primary/25"
      >
        {RING_SIZES.map((size) => (
          <rect key={size} x={-size / 2} y={-size / 2} width={size} height={size} rx={size * 0.22} />
        ))}
      </svg>
    </div>
  );
}

export function PrivacySection() {
  return (
    <section id="privacy" className="relative scroll-mt-16 overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-40">
      <Rings />
      <Reveal className="shell relative flex flex-col items-center text-center">
        <div aria-hidden="true" className="mb-8 flex gap-6 sm:mb-10 sm:gap-8">
          <BlockedTile Icon={Megaphone} index={0} />
          <BlockedTile Icon={Eye} index={1} />
        </div>
        <h2 className="font-display text-[length:clamp(2.5rem,14vw,3.25rem)] font-semibold leading-[0.95] tracking-[-0.05em] sm:text-[88px] lg:text-[112px]">
          <BlurWords text="No ads." />{" "}
          <br />
          <BlurWords text="No tracking." offset={2} />
        </h2>
        <p
          className="reveal-item mt-8 max-w-[34rem] text-lg leading-relaxed text-muted-foreground sm:text-xl sm:leading-relaxed"
          style={revealIndex(2)}
        >
          X&O Battle has no adverts, and your data is never tracked or sold.
        </p>
        <a
          href={PRIVACY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal-item mt-6 inline-flex items-center gap-0.5 text-[17px] font-medium text-mark-x hover:underline hover:underline-offset-4"
          style={revealIndex(3)}
        >
          Read our privacy policy
          <ChevronRight className="size-4" />
        </a>
      </Reveal>
    </section>
  );
}
