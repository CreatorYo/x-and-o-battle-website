"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Apple, Menu, X, Mail } from "lucide-react"
import { MobileThemeSwitcher } from "@/components/mobile-theme-switcher"

const BANNER_CONFIG = {
  enabled: false,
  storageKey: "v2-feedback-banner-dismissed",
  content: {
    message: "We're working on version 2 with new features! We'd love to hear your feedback on how we can improve.",
    link: "mailto:help@creatoryogames.com",
  },
  style: {
    backgroundColor: "#094085",
    textColor: "#ffffff",
  },
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isBannerVisible, setIsBannerVisible] = useState(false)
  const [isBannerAnimated, setIsBannerAnimated] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (BANNER_CONFIG.enabled) {
      const dismissed = localStorage.getItem(BANNER_CONFIG.storageKey)
      if (dismissed !== "true") {
        setIsBannerVisible(true)
        setTimeout(() => setIsBannerAnimated(true), 100)
      }
    }
  }, [])

  useEffect(() => {
    let lastScrollY = window.scrollY
    const threshold = 10

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (Math.abs(currentScrollY - lastScrollY) > threshold && !isMobileMenuOpen) {
        setIsScrolled(currentScrollY > lastScrollY && currentScrollY > 50)
        lastScrollY = currentScrollY
      }
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    document.addEventListener("keydown", handleEsc)

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    setIsScrolled(false)
  }

  const closeBanner = () => {
    setIsBannerAnimated(false)
    setTimeout(() => setIsBannerVisible(false), 300)
    if (isClient) {
      localStorage.setItem(BANNER_CONFIG.storageKey, "true")
    }
  }

  const handleBannerClick = () => {
    if (BANNER_CONFIG.content.link) {
      window.location.href = BANNER_CONFIG.content.link
    }
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "#features" },
    { name: "Screenshots", href: "#screenshots" },
  ]

  const showBanner = isClient && isBannerVisible && BANNER_CONFIG.enabled

  return (
    <>
      {showBanner && (
        <div
          className={cn(
            "fixed top-0 left-0 right-0 z-[50] shadow-sm transition-all duration-300",
            isBannerAnimated ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          )}
          style={{
            backgroundColor: BANNER_CONFIG.style.backgroundColor,
            color: BANNER_CONFIG.style.textColor,
          }}
        >
          <div className="container mx-auto px-3 sm:px-4">
            <div className="flex items-center justify-between py-3 md:py-2.5 min-h-[60px] md:min-h-[48px]">
              <div
                className={cn(
                  "flex-1 text-center px-1 sm:px-3 md:px-6",
                  BANNER_CONFIG.content.link && "cursor-pointer hover:opacity-90 transition-opacity",
                )}
                onClick={BANNER_CONFIG.content.link ? handleBannerClick : undefined}
              >
                <div className="block sm:hidden">
                  <div className="text-xs leading-tight opacity-95">
                    {BANNER_CONFIG.content.message}
                    {BANNER_CONFIG.content.link && <span className="ml-1">→</span>}
                  </div>
                </div>

                <div className="hidden sm:flex sm:items-center sm:justify-center sm:gap-2">
                  <span className="text-sm md:text-base leading-tight opacity-95">{BANNER_CONFIG.content.message}</span>
                  {BANNER_CONFIG.content.link && <span className="text-sm md:text-base">→</span>}
                </div>
              </div>

              <button
                onClick={closeBanner}
                className="flex-shrink-0 p-2 md:p-1.5 hover:bg-white/20 rounded-full transition-colors ml-2 group"
                title="Dismiss"
                aria-label="Dismiss"
                style={{ color: BANNER_CONFIG.style.textColor }}
              >
                <X className="h-4 w-4 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}

      <header
        className={cn(
          "fixed left-0 right-0 z-[40] transition-all duration-500 bg-background/70 navigation-bar-backdrop-filter",
          showBanner ? "top-[60px] md:top-[48px]" : "top-0",
          isScrolled ? "shadow-sm" : "",
        )}
      >
        <div className="container mx-auto px-4 pt-1">
          <div className="flex items-center justify-between h-12 md:h-14">
            <Link href="/" className="flex items-center space-x-2.5 select-none">
              <div className="relative w-8 h-8 overflow-hidden rounded-full">
                <Image
                  src="https://i.imgur.com/HXVpBdO.png"
                  alt="X&O Battle Logo"
                  fill
                  draggable="false"
                  className="object-cover pointer-events-none"
                />
              </div>
              <span className="font-semibold text-lg">X&O Battle</span>
            </Link>

            <nav className="hidden md:flex items-center justify-center flex-1 space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="select-none text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center">
              <Link
                href="https://apps.apple.com/us/app/x-o-battle/id6745736399"
                target="_blank"
                rel="noopener noreferrer"
                className="select-none"
              >
                <Button className="rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90">
                  <Apple className="mr-2 h-4 w-4" /> Download
                </Button>
              </Link>
            </div>

            <button
              className="md:hidden p-2 hover:bg-secondary rounded-full transition-colors select-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              title="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[30] bg-background/70 backdrop-blur-xl transition-transform duration-500 md:hidden",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full",
        )}
        style={{
          paddingTop: showBanner ? "60px" : "0px",
        }}
      >
        <div className="h-full pt-20 overflow-auto flex flex-col">
          <div className="container mx-auto px-4 flex-1">
            <div className="space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="mobile-nav-link text-2xl font-medium hover:text-primary transition-colors select-none block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="https://apps.apple.com/us/app/x-o-battle/id6745736399"
                target="_blank"
                rel="noopener noreferrer"
                className="select-none"
              >
                <Button className="w-full rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 h-12 text-base">
                  <Apple className="mr-2 h-5 w-5" /> Download
                </Button>
              </Link>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8 mt-auto border-t border-border/10">
            <div className="flex items-center justify-between">
              <div className="relative">
                <MobileThemeSwitcher />
              </div>
              <a
                title="Email Support"
                href="mailto:help@creatoryogames.com"
                className="select-none text-foreground/60 hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}