"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useScroll } from "framer-motion"

type DirectionType = "up" | "down" | "left" | "right"

interface ParallaxElementProps {
  children: React.ReactNode
  direction?: DirectionType
  speed?: number
  className?: string
  offset?: string[]
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

  let y = 0
  let x = 0

  if (direction === "up") {
    y = speed
  } else if (direction === "down") {
    y = -speed
  } else if (direction === "left") {
    x = speed
  } else if (direction === "right") {
    x = -speed
  }

  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      <motion.div
        style={{
          y: y ? scrollYProgress * y + "px" : 0,
          x: x ? scrollYProgress * x + "px" : 0,
        }}
        className={`parallax-element ${className}`}
      >
        {children}
      </motion.div>
    </div>
  )
}
