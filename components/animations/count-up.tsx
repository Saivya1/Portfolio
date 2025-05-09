"use client"

import { useRef, useState, useEffect } from "react"
import { useInView } from "framer-motion"

interface CountUpProps {
  end: number
  duration?: number
  start?: number
  prefix?: string
  suffix?: string
  className?: string
  threshold?: number
  once?: boolean
  decimals?: number
}

export default function CountUp({
  end,
  duration = 2,
  start = 0,
  prefix = "",
  suffix = "",
  className = "",
  threshold = 0.2,
  once = true,
  decimals = 0,
}: CountUpProps) {
  const [count, setCount] = useState(start)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: threshold, once })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)

      let startTime: number
      let animationFrame: number

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        const currentCount = progress * (end - start) + start

        setCount(currentCount)

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step)
        }
      }

      animationFrame = requestAnimationFrame(step)

      return () => cancelAnimationFrame(animationFrame)
    }
  }, [isInView, end, start, duration, hasAnimated])

  return (
    <div ref={ref} className={className}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </div>
  )
}
