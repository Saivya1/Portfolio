"use client"

import type React from "react"

import { useCallback } from "react"

interface SmoothScrollOptions {
  offset?: number
  duration?: number
  behavior?: ScrollBehavior
}

export function useSmoothScroll(options: SmoothScrollOptions = {}) {
  const { offset = 0, duration = 1000, behavior = "smooth" } = options

  const scrollToElement = useCallback(
    (elementId: string) => {
      const element = document.getElementById(elementId)
      if (!element) return false

      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - offset

      // If browser supports ScrollToOptions with behavior
      if ("scrollBehavior" in document.documentElement.style) {
        window.scrollTo({
          top: offsetPosition,
          behavior,
        })
        return true
      }

      // Fallback for browsers that don't support smooth scrolling
      const startPosition = window.scrollY
      const distance = offsetPosition - startPosition
      let startTime: number | null = null

      function step(currentTime: number) {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        const easeInOutCubic =
          progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2

        window.scrollTo(0, startPosition + distance * easeInOutCubic)

        if (timeElapsed < duration) {
          requestAnimationFrame(step)
        }
      }

      requestAnimationFrame(step)
      return true
    },
    [offset, duration, behavior],
  )

  const scrollToHash = useCallback(
    (hash: string) => {
      if (!hash) return false

      // Remove the # character if it exists
      const elementId = hash.startsWith("#") ? hash.substring(1) : hash
      return scrollToElement(elementId)
    },
    [scrollToElement],
  )

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const href = e.currentTarget.getAttribute("href")
      if (!href || !href.startsWith("#")) return

      e.preventDefault()
      scrollToHash(href)
    },
    [scrollToHash],
  )

  return {
    scrollToElement,
    scrollToHash,
    handleLinkClick,
  }
}
