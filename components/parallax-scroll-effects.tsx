"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

interface ParallaxElementProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  speed?: number
  className?: string
  offset?: [number, number]
}

export function ParallaxElement({
  children,
  direction = "up",
  speed = 10,
  className = "",
  offset = ["start end", "end start"],
}: ParallaxElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset,
  })

  // Ensure we're using valid numbers for the transform
  const safeSpeed = isNaN(speed) ? 0 : speed

  // Calculate transform based on direction with safety checks
  let transform
  const translateYUp = useTransform(
    scrollYProgress,
    [0, 1],
    [`translateY(${safeSpeed}%)`, `translateY(-${safeSpeed}%)`],
  )
  const translateYDown = useTransform(
    scrollYProgress,
    [0, 1],
    [`translateY(-${safeSpeed}%)`, `translateY(${safeSpeed}%)`],
  )
  const translateXLeft = useTransform(
    scrollYProgress,
    [0, 1],
    [`translateX(${safeSpeed}%)`, `translateX(-${safeSpeed}%)`],
  )
  const translateXRight = useTransform(
    scrollYProgress,
    [0, 1],
    [`translateX(-${safeSpeed}%)`, `translateX(${safeSpeed}%)`],
  )
  const translateNone = useTransform(scrollYProgress, [0, 1], ["translateY(0%)", "translateY(0%)"])

  switch (direction) {
    case "up":
      transform = translateYUp
      break
    case "down":
      transform = translateYDown
      break
    case "left":
      transform = translateXLeft
      break
    case "right":
      transform = translateXRight
      break
    default:
      transform = translateNone
  }

  const springTransform = useSpring(transform, { stiffness: 100, damping: 30 })

  return (
    <motion.div ref={ref} style={{ transform: springTransform }} className={className}>
      {children}
    </motion.div>
  )
}

export function ParallaxImage({
  src,
  alt,
  className = "",
  direction = "up",
  speed = 10,
}: {
  src: string
  alt: string
  className?: string
  direction?: "up" | "down" | "left" | "right"
  speed?: number
}) {
  return (
    <ParallaxElement direction={direction} speed={speed} className={className}>
      <img src={src || "/placeholder.svg"} alt={alt} className="w-full h-full object-cover" />
    </ParallaxElement>
  )
}

export function ParallaxSection({
  children,
  className = "",
  overlayColor = "from-[#030303]/80 via-transparent to-[#030303]/80",
}: {
  children: React.ReactNode
  className?: string
  overlayColor?: string
}) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {children}
      <div className={`absolute inset-0 bg-gradient-to-t ${overlayColor} pointer-events-none z-10`} />
    </section>
  )
}

export function useParallaxScroll() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 300])
  const y2 = useTransform(scrollY, [0, 1000], [0, -300])
  const y3 = useTransform(scrollY, [0, 1000], [0, 150])
  const y4 = useTransform(scrollY, [0, 1000], [0, -150])
  const rotate1 = useTransform(scrollY, [0, 1000], [0, 10])
  const rotate2 = useTransform(scrollY, [0, 1000], [0, -10])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5])

  return { y1, y2, y3, y4, rotate1, rotate2, opacity }
}

export function ParallaxBackground() {
  const { scrollYProgress } = useScroll()

  // Use simple percentage values to avoid NaN issues
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-purple-500/[0.03] blur-3xl"
      />
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute top-0 right-0 w-full h-full bg-gradient-to-tl from-purple-500/[0.02] via-transparent to-cyan-500/[0.02] blur-3xl"
      />
      <motion.div
        style={{ y: y3, opacity }}
        className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-teal-500/[0.01] via-transparent to-violet-500/[0.01] blur-3xl"
      />
    </div>
  )
}
