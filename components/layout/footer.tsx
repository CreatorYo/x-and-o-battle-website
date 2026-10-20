import Link from "next/link";
import { Mail } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { PRIVACY_URL, SUPPORT_EMAIL } from "@/lib/links";

const linkClass = "text-muted-foreground transition-colors hover:text-foreground";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="shell flex flex-col gap-6 py-10 text-[13px] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground">© {new Date().getFullYear()} X&O Battle. All rights reserved.</p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Privacy Policy
            </a>
            <Link href="/submit-feedback" className={linkClass}>
              Feedback
            </Link>
          </nav>
          <div className="flex items-center gap-4">
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
    </footer>
  );
}
