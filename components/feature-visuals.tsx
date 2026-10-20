import type { ReactNode } from "react";
import { Check, Cpu, Medal, Star, Trophy, Users, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const APP_BLUE = "#0A84FF";
const APP_RED = "#FF453A";
const APP_GREEN = "#30D158";
const APP_YELLOW = "#FFD60A";

const CONFETTI = [
  { left: "-9%", top: "6%", color: APP_YELLOW, rotate: "20deg" },
  { left: "12%", top: "-9%", color: "#FFFFFF", rotate: "-30deg" },
  { left: "50%", top: "-10%", color: APP_RED, rotate: "45deg" },
  { left: "88%", top: "-8%", color: APP_GREEN, rotate: "-15deg" },
  { left: "104%", top: "26%", color: APP_BLUE, rotate: "60deg" },
  { left: "103%", top: "72%", color: APP_YELLOW, rotate: "-40deg" },
  { left: "-9%", top: "62%", color: APP_GREEN, rotate: "35deg" },
];

function AppPanel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "flex min-h-[208px] w-full max-w-[300px] flex-col justify-center rounded-[24px] bg-black p-5 shadow-[0_16px_32px_-16px_rgb(0_0_0/0.55)] ring-1 ring-white/10",
        className
      )}
    >
      {children}
    </div>
  );
}

function AppBoard({ marks, winning = [], className }: { marks: string; winning?: number[]; className?: string }) {
  return (
    <div className={cn("@container mx-auto grid w-[150px] grid-cols-3 gap-2", className)}>
      {[...marks].map((mark, i) => (
        <span
          key={i}
          className={cn(
            "grid aspect-square place-items-center rounded-[22%] bg-[#1C1C1E] font-semibold leading-none ring-1 ring-inset ring-white/5",
            winning.includes(i) && "bg-[#0A84FF]/20 ring-[#0A84FF]/40"
          )}
          style={{ fontSize: "17cqw", color: mark === "X" ? APP_BLUE : APP_RED }}
        >
          {mark === "." ? "" : mark}
        </span>
      ))}
    </div>
  );
}

function ModeRow({
  Icon,
  color,
  title,
  subtitle,
  selected,
}: {
  Icon: LucideIcon;
  color: string;
  title: string;
  subtitle: string;
  selected?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[14px] px-3.5 py-3" style={{ backgroundColor: `${color}1f` }}>
      <Icon className="size-5 shrink-0" style={{ color }} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-tight">{title}</p>
        <p className="mt-0.5 text-xs leading-tight text-white/55">{subtitle}</p>
      </div>
      {selected && <Check className="size-4 shrink-0" style={{ color }} strokeWidth={2.5} />}
    </div>
  );
}

export function TwoPlayerVisual() {
  return (
    <AppPanel className="text-center">
      <p className="text-balance text-[11px] font-semibold" style={{ color: APP_BLUE }}>
        Please proceed with your turn player X.
      </p>
      <AppBoard marks="XO.XOX..." className="mt-4 w-[136px]" />
    </AppPanel>
  );
}

export function AiModeVisual() {
  return (
    <AppPanel className="gap-2 px-3">
      <ModeRow Icon={Users} color={APP_BLUE} title="Two Player" subtitle="Play with a friend" />
      <ModeRow Icon={Cpu} color={APP_GREEN} title="AI Mode" subtitle="Play against computer" selected />
    </AppPanel>
  );
}

export function AchievementsVisual() {
  return (
    <AppPanel className="flex-row items-center gap-3">
      {[
        { Icon: Medal, active: false },
        { Icon: Trophy, active: true },
        { Icon: Star, active: false },
      ].map(({ Icon, active }, i) => (
        <span
          key={i}
          className={cn(
            "grid place-items-center rounded-full bg-[#1C1C1E] ring-1 ring-white/10",
            active ? "size-18" : "size-14"
          )}
        >
          <Icon className={active ? "size-8" : "size-6"} style={{ color: active ? APP_YELLOW : "rgb(255 255 255 / 0.4)" }} />
        </span>
      ))}
    </AppPanel>
  );
}

export function WinVisual() {
  return (
    <AppPanel>
      <div className="relative mx-auto w-[150px]">
        <AppBoard marks="XO.OX...X" winning={[0, 4, 8]} />
        {CONFETTI.map((piece, i) => (
          <span
            key={i}
            className="absolute h-2.5 w-1.5 rounded-[2px]"
            style={{ left: piece.left, top: piece.top, backgroundColor: piece.color, rotate: piece.rotate }}
          />
        ))}
      </div>
    </AppPanel>
  );
}

export function SavedVisual() {
  return (
    <AppPanel className="px-3">
      <ul className="divide-y divide-white/10 rounded-[14px] bg-[#1C1C1E] text-sm">
        {["Achievements", "Settings", "Custom presets"].map((item) => (
          <li key={item} className="flex items-center justify-between px-4 py-3">
            <span>{item}</span>
            <Check className="size-4" style={{ color: APP_GREEN }} strokeWidth={2.5} />
          </li>
        ))}
      </ul>
    </AppPanel>
  );
}
