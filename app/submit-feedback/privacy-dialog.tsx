import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Tone } from "./feedback-options";

const RECEIVED = [
  "The category, platform, title and description you enter, plus your device if you add one",
  "The time it was sent",
];

export function PrivacyDialog({ tone }: { tone: Tone }) {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "rounded-sm font-medium underline-offset-4 transition-colors hover:underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
          tone.accent
        )}
      >
        Learn more
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Privacy information</DialogTitle>
        <DialogDescription className="mt-3">When you send feedback, we receive:</DialogDescription>
        <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed">
          {RECEIVED.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true" className={cn("mt-[0.6em] size-1.5 shrink-0 rounded-full bg-current", tone.accent)} />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          We don&apos;t collect any other personal information. Your feedback goes straight to our team and is only used
          to improve X&amp;O Battle.
        </p>
        <p className="mt-6 rounded-2xl bg-secondary px-5 py-4 text-sm font-medium leading-relaxed">
          Please don&apos;t include personal or sensitive information, as our team can see everything you send.
        </p>
        <DialogClose asChild>
          <Button className={cn("mt-8 h-12 w-full rounded-full text-[15px] font-semibold", tone.button)}>Got it</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
