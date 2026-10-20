"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { AppleIcon } from "@/components/brand-icons";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { ScrollEdge, isNavTone, type NavTone } from "@/components/layout/scroll-edge";
import { APP_STORE_URL, LOGO_URL, NAV_LINKS } from "@/lib/links";

const NAV_CENTRE_Y = 28;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [surfaceTone, setSurfaceTone] = useState<NavTone>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const surfaces = [...document.querySelectorAll<HTMLElement>("[data-nav-tone]")];
    let frame = 0;

    const update = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 8);
      const surface = surfaces.find((el) => {
        const { top, bottom } = el.getBoundingClientRect();
        return top <= NAV_CENTRE_Y && bottom > NAV_CENTRE_Y;
      });
      const value = surface?.dataset.navTone;
      setSurfaceTone(isNavTone(value) ? value : undefined);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const { body } = document;
    const desktop = window.matchMedia("(min-width: 768px)");
    const close = () => setIsMobileMenuOpen(false);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) close();
    };

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    body.style.setProperty("--removed-body-scroll-bar-size", `${scrollbarWidth}px`);
    body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      body.style.removeProperty("--removed-body-scroll-bar-size");
      body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);
  const tone = isMobileMenuOpen ? undefined : surfaceTone;

  return (
    <>
      <header
        data-tone={tone}
        className="group/nav fixed left-0 right-[var(--removed-body-scroll-bar-size,0px)] top-0 z-40"
      >
        <ScrollEdge visible={isScrolled && !isMobileMenuOpen} tone={tone} />

        <div className="shell relative pt-1">
          <div className="flex h-12 items-center justify-between gap-6 md:grid md:h-14 md:grid-cols-[1fr_auto_1fr]">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex select-none items-center gap-2.5 justify-self-start rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="relative size-7 overflow-hidden rounded-[7px] transition-[filter] duration-300 group-data-[tone=brand]/nav:brightness-0">
                <Image
                  src={LOGO_URL}
                  alt=""
                  fill
                  loading="eager"
                  sizes="28px"
                  draggable="false"
                  className="pointer-events-none object-cover"
                />
              </span>
              <span className="font-display text-[17px] font-bold tracking-[-0.015em] transition-colors duration-300 group-data-[tone=brand]/nav:text-white">
                X&O Battle
              </span>
            </Link>

            <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="select-none text-[14px] font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground group-data-[tone=brand]/nav:text-white/75 group-data-[tone=brand]/nav:hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shine hidden h-9 select-none items-center gap-2 justify-self-end rounded-full bg-primary px-4 text-[14px] font-semibold text-primary-foreground transition-[filter,background-color,color] duration-300 hover:brightness-110 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:inline-flex group-data-[tone=brand]/nav:bg-white group-data-[tone=brand]/nav:text-brand-band"
            >
              <AppleIcon className="-mt-0.5 h-[15px] w-auto" />
              Download
            </a>

            <button
              type="button"
              className="rounded-full p-2 transition-colors duration-300 hover:bg-secondary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring md:hidden group-data-[tone=brand]/nav:text-white group-data-[tone=brand]/nav:hover:bg-white/15"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={isMobileMenuOpen} onNavigate={closeMenu} />
    </>
  );
}
