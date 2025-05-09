"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"

export default function ParallaxBackground() {
  const [windowHeight, setWindowHeight] = useState(0)
  const { scrollY } = useScroll()
  const containerRef = useRef<HTMLDivElement>(null)

  // Create motion values for continuous animation
  const baseX = useMotionValue(0)
  const baseY = useMotionValue(0)

  // Add spring physics for smoother movement
  const springX = useSpring(baseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(baseY, { stiffness: 100, damping: 30 })

  useEffect(() => {
    setWindowHeight(window.innerHeight)
    const handleResize = () => setWindowHeight(window.innerHeight)
    window.addEventListener("resize", handleResize)

    // Continuous slow movement animation
    const intervalId = setInterval(() => {
      baseX.set(Math.sin(Date.now() / 10000) * 20)
      baseY.set(Math.cos(Date.now() / 12000) * 20)
    }, 50)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearInterval(intervalId)
    }
  }, [baseX, baseY])

  // Create parallax effects for different layers
  const layer1Y = useTransform(scrollY, [0, windowHeight * 4], [0, windowHeight * 0.5])
  const layer2Y = useTransform(scrollY, [0, windowHeight * 4], [0, windowHeight * -0.3])
  const layer3Y = useTransform(scrollY, [0, windowHeight * 4], [0, windowHeight * 0.2])
  const layer4Y = useTransform(scrollY, [0, windowHeight * 4], [0, windowHeight * -0.4])

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Layer 1 - Slow moving cyan gradient */}
      <motion.div
        style={{
          y: layer1Y,
          x: springX,
          translateY: springY,
        }}
        className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-cyan-500/[0.03] blur-3xl transition-transform duration-1000 ease-out"
      />

      {/* Layer 2 - Medium speed purple gradient */}
      <motion.div
        style={{
          y: layer2Y,
          x: useTransform(springX, (value) => value * -1.2),
          translateY: useTransform(springY, (value) => value * 1.5),
        }}
        className="absolute top-[60%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-purple-500/[0.03] blur-3xl transition-transform duration-1000 ease-out"
      />

      {/* Layer 3 - Fast moving teal gradient */}
      <motion.div
        style={{
          y: layer3Y,
          x: useTransform(springX, (value) => value * 0.8),
          translateY: useTransform(springY, (value) => value * -0.7),
        }}
        className="absolute top-[30%] right-[20%] w-[25vw] h-[25vw] rounded-full bg-teal-500/[0.02] blur-3xl transition-transform duration-1000 ease-out"
      />

      {/* Layer 4 - Very fast moving violet gradient */}
      <motion.div
        style={{
          y: layer4Y,
          x: useTransform(springX, (value) => value * -0.5),
          translateY: useTransform(springY, (value) => value * -1.2),
        }}
        className="absolute top-[80%] left-[15%] w-[30vw] h-[30vw] rounded-full bg-violet-500/[0.02] blur-3xl transition-transform duration-1000 ease-out"
      />
    </div>
  )
}
