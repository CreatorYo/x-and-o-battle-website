"use client"

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function ClientTitleUpdater() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === "/") {
      document.title = "X&O Battle"
    } else {
      document.title = "X&O Battle: Page not found"
    }
  }, [pathname])

  return null
}