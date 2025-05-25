"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Apple, Menu, X, Mail } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const threshold = 10;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (Math.abs(currentScrollY - lastScrollY) > threshold && !isMobileMenuOpen) {
        setIsScrolled(currentScrollY > lastScrollY && currentScrollY > 50);
        lastScrollY = currentScrollY;
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("keydown", handleEsc);

    // Control body scroll
    if (isMobileMenuOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", handleEsc);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsScrolled(false);
  };

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "Screenshots", href: "#screenshots" },
  ];

  return (
    <>
      <header
        className={cn(
          "navbar fixed top-0 left-0 right-0 z-[40] transition-transform duration-300 bg-background/90 backdrop-blur-md border-b border-border/50",
          isScrolled && !isMobileMenuOpen ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 select-none">
              <div className="relative w-8 h-8 overflow-hidden rounded-full">
                <Image
                  src="https://i.imgur.com/OhocUfk.png"
                  alt="X&O Battle Logo"
                  fill
                  draggable="false"
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-xl">X&O Battle</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center flex-1 space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="nav-link select-none"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <Link 
              href="https://apps.apple.com/us/app/x-o-battle/id6745736399"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block select-none"
            >
              <Button className="rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90">
                <Apple className="mr-2 h-4 w-4" /> Download
              </Button>
            </Link>

            {/* Mobile Navigation Toggle */}
            <button
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors select-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 z-[30] bg-background transition-transform duration-300 md:hidden pt-20",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="container mx-auto px-4 py-8 flex flex-col h-full">
          <div className="flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="mobile-nav-link text-xl hover:text-primary transition-colors select-none block mb-8"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="https://apps.apple.com/us/app/x-o-battle/id6745736399"
              target="_blank"
              rel="noopener noreferrer"
              className="select-none"
            >
              <Button className="w-full rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90">
                <Apple className="mr-2 h-4 w-4" /> Download
              </Button>
            </Link>
          </div>
          
          {/* Bottom Actions */}
          <div className="flex items-center justify-end gap-4 pt-8 border-t border-border/2 dark:border-border/[0.6]">
            <ThemeSwitcher />
            <a 
              href="mailto:help@creatoryogames.com"
              className="select-none text-foreground/60 hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}