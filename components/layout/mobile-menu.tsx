import Link from "next/link";
import { ChevronRight, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { AppStoreButton, WebAppLink } from "@/components/store-links";
import { NAV_LINKS, SUPPORT_EMAIL } from "@/lib/links";
import { cn } from "@/lib/utils";

const linkClass =
  "select-none border-b border-border/70 py-4 font-display text-[28px] font-semibold tracking-[-0.025em] transition-colors hover:text-primary active:text-primary";

export function MobileMenu({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-30 bg-background transition-[translate,visibility] duration-500 md:hidden",
        open ? "visible translate-y-0" : "invisible -translate-y-full"
      )}
    >
      <div className="flex h-full flex-col overflow-auto pt-16">
        <nav aria-label="Mobile" className="shell flex flex-col pt-4">
          {NAV_LINKS.map((link) => (
            <Link key={link.name} href={link.href} onClick={onNavigate} className={linkClass}>
              {link.name}
            </Link>
          ))}
          <Link href="/submit-feedback" onClick={onNavigate} className={linkClass}>
            Feedback
          </Link>
        </nav>

        <div className="shell mt-8 flex flex-col gap-3">
          <AppStoreButton className="w-full" />
          <WebAppLink className="inline-flex h-[54px] w-full items-center justify-center gap-0.5 rounded-full border border-border text-[15px] font-semibold">
            Play on the web
            <ChevronRight className="size-4" />
          </WebAppLink>
        </div>

        <div className="shell mt-auto flex items-center justify-between py-8">
          <ThemeToggle />
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            title="Email Support"
            aria-label="Email Support"
            className="select-none text-foreground/60 transition-colors hover:text-foreground"
          >
            <Mail className="size-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
