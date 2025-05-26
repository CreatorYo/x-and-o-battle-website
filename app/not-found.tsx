"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

const isNonComputerDevice = () =>
  typeof navigator !== "undefined" &&
  (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 1024)

export default function NotFound() {
  const [spotlight, setSpotlight] = useState<{ x: number; y: number } | null>(null)
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [fade, setFade] = useState(false)
  const [disableSpotlight, setDisableSpotlight] = useState(false)
  const [radius, setRadius] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const radiusRef = useRef(0)
  const animRef = useRef<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const transitioning = useRef(false)
  const escHeld = useRef(false)

  useEffect(() => {
    document.title = "X&O Battle: Page not found"
  }, [])

  useEffect(() => {
    setDisableSpotlight(isNonComputerDevice())
    const onResize = () => {
      setDisableSpotlight(isNonComputerDevice())
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (animRef.current) cancelAnimationFrame(animRef.current)
      setOverlayVisible(false)
      setFade(false)
      setSpotlight(null)
      setRadius(0)
      radiusRef.current = 0
      transitioning.current = false
      escHeld.current = false
    }
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  useEffect(() => {
    const checkDarkMode = () => {
      if (typeof document !== "undefined") {
        return document.documentElement.classList.contains("dark")
      }
      return false
    }

    setIsDarkMode(checkDarkMode())

    const observer = new MutationObserver(() => {
      setIsDarkMode(checkDarkMode())
    })

    if (typeof document !== "undefined") {
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !escHeld.current) {
        escHeld.current = true
        if (overlayVisible && !transitioning.current) {
          setFade(false)
          timeoutRef.current = setTimeout(() => {
            animateRadius(0, 300, () => {
              setOverlayVisible(false)
              setSpotlight(null)
            })
          }, 300)
        }
      }
    }
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Escape") escHeld.current = false
    }
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("keyup", onKeyUp)
    }
  }, [overlayVisible])

  const animateRadius = (target: number, duration = 300, cb?: () => void) => {
    if (animRef.current) cancelAnimationFrame(animRef.current)
    transitioning.current = true
    const start = radiusRef.current
    const diff = target - start
    const startTime = performance.now()

    const step = (time: number) => {
      const elapsed = time - startTime
      if (elapsed >= duration) {
        setRadius(target)
        radiusRef.current = target
        transitioning.current = false
        if (cb) cb()
        return
      }
      const val = start + diff * (elapsed / duration)
      setRadius(val)
      radiusRef.current = val
      animRef.current = requestAnimationFrame(step)
    }
    animRef.current = requestAnimationFrame(step)
  }

  const edgeThreshold = 100
  const debounceDelay = 100
  const lastHide = useRef(0)
  const lastShow = useRef(0)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disableSpotlight || escHeld.current || !isDarkMode) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const now = performance.now()

    const nearEdge =
      x < edgeThreshold ||
      y < edgeThreshold ||
      x > rect.width - edgeThreshold ||
      y > rect.height - edgeThreshold

    if (nearEdge) {
      if (overlayVisible && now - lastHide.current > debounceDelay && !transitioning.current) {
        lastHide.current = now
        setFade(false)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        animateRadius(0, 300, () => {
          setOverlayVisible(false)
          setSpotlight(null)
        })
      }
    } else {
      if (!overlayVisible && now - lastShow.current > debounceDelay && !transitioning.current) {
        lastShow.current = now
        setOverlayVisible(true)
        setTimeout(() => {
          setFade(true)
          animateRadius(200)
        }, 20)
      }
      setSpotlight({ x, y })
    }
  }

  const onMouseLeave = () => {
    if (disableSpotlight || escHeld.current || !overlayVisible || transitioning.current || !isDarkMode) return
    setFade(false)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      animateRadius(0, 300, () => {
        setOverlayVisible(false)
        setSpotlight(null)
      })
    }, 300)
  }

  return (
    <>
      <Navbar />
      <main
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative grid min-h-screen place-items-center bg-background px-6 py-16 overflow-hidden"
      >
        <div className="relative z-10 text-center max-w-md px-4">
          <p className="text-blue-400 text-base font-semibold mb-4 select-none">404</p>
            <h1
            style={{ lineHeight: "1.2" }}
            className="text-5xl font-bold tracking-tight text-foreground mb-4 overflow-hiddens"
            >
            Page Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The page you are looking for does not exist.
            </p>

          <div className="flex justify-center">
            <Link
              href="/"
              className="bg-[#0073ff] hover:bg-[#005fd1] text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 select-none"
            >
              Go Back Home
            </Link>
          </div>
        </div>

        {isDarkMode && overlayVisible && spotlight && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              backgroundColor: "rgba(0,0,0,0.85)",
              opacity: fade ? 1 : 0,
              maskImage: `radial-gradient(circle ${radius}px at ${spotlight.x}px ${spotlight.y}px, transparent 0%, black 100%)`,
              WebkitMaskImage: `radial-gradient(circle ${radius}px at ${spotlight.x}px ${spotlight.y}px, transparent 0%, black 100%)`,
              transition: "opacity 0.3s ease-in-out",
            }}
          />
        )}
      </main>
      <Footer />
    </>
  )
}