"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { Pacifico } from "next/font/google"
import { useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react"
import { Parallax } from "react-scroll-parallax"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import { useMobile } from "@/hooks/use-mobile"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
  parallaxSpeed = 0,
  movementPattern = "default",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
  parallaxSpeed?: number
  movementPattern?: "default" | "circular" | "figure8" | "wave" | "zigzag"
}) {
  // Create motion values for continuous animation
  const baseX = useMotionValue(0)
  const baseY = useMotionValue(0)

  // Add spring physics for smoother movement
  const springX = useSpring(baseX, { stiffness: 50, damping: 30 })
  const springY = useSpring(baseY, { stiffness: 50, damping: 30 })

  const isMobile = useMobile()

  // Create different movement patterns
  useEffect(() => {
    // Skip complex animations on mobile for better performance
    if (isMobile) return

    let intervalId: NodeJS.Timeout

    // Different movement patterns
    switch (movementPattern) {
      case "circular":
        intervalId = setInterval(() => {
          const time = Date.now() / 8000
          baseX.set(Math.sin(time) * 20)
          baseY.set(Math.cos(time) * 20)
        }, 50)
        break

      case "figure8":
        intervalId = setInterval(() => {
          const time = Date.now() / 10000
          baseX.set(Math.sin(time) * 25)
          baseY.set(Math.sin(time * 2) * 15)
        }, 50)
        break

      case "wave":
        intervalId = setInterval(() => {
          const time = Date.now() / 9000
          baseX.set(Math.sin(time) * 15)
          baseY.set(Math.sin(time / 2) * 10)
        }, 50)
        break

      case "zigzag":
        intervalId = setInterval(() => {
          const time = Date.now() / 12000
          baseX.set(Math.sin(time) * 20)
          baseY.set(Math.sin(time * 3) * 10)
        }, 50)
        break

      default:
        // Simple floating movement
        intervalId = setInterval(() => {
          const time = Date.now() / 11000
          baseX.set(Math.sin(time) * 10)
          baseY.set(Math.cos(time * 1.3) * 15)
        }, 50)
    }

    return () => clearInterval(intervalId)
  }, [baseX, baseY, movementPattern, isMobile])

  // Scale down shapes on mobile
  const mobileScale = isMobile ? 0.7 : 1

  return (
    <Parallax speed={isMobile ? 0 : parallaxSpeed} className={cn("absolute", className)}>
      <motion.div
        initial={{
          opacity: 0,
          y: -150,
          rotate: rotate - 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
          rotate: rotate,
        }}
        transition={{
          duration: 2.4,
          delay,
          ease: [0.23, 0.86, 0.39, 0.96],
          opacity: { duration: 1.2 },
        }}
      >
        <motion.div
          style={{
            width: width * mobileScale,
            height: height * mobileScale,
            x: springX,
            y: springY,
          }}
          className="relative"
        >
          <div
            className={cn(
              "absolute inset-0 rounded-full",
              "bg-gradient-to-r to-transparent",
              gradient,
              "backdrop-blur-[2px] border-2 border-white/[0.15]",
              "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
              "after:absolute after:inset-0 after:rounded-full",
              "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
            )}
          />
        </motion.div>
      </motion.div>
    </Parallax>
  )
}

export default function HeroSection() {
  const { handleLinkClick, scrollToElement } = useSmoothScroll({ offset: 80 })
  const isMobile = useMobile()

  return (
    <div id="home" className="relative min-h-screen w-full flex flex-col justify-center items-center bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.05] via-transparent to-purple-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-cyan-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          parallaxSpeed={-10}
          movementPattern="wave"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-purple-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          parallaxSpeed={5}
          movementPattern="circular"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-teal-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
          parallaxSpeed={-8}
          movementPattern="figure8"
        />

        {/* Hide some shapes on mobile for better performance */}
        {!isMobile && (
          <>
            <ElegantShape
              delay={0.6}
              width={200}
              height={60}
              rotate={20}
              gradient="from-emerald-500/[0.15]"
              className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
              parallaxSpeed={15}
              movementPattern="zigzag"
            />

            <ElegantShape
              delay={0.7}
              width={150}
              height={40}
              rotate={-25}
              gradient="from-violet-500/[0.15]"
              className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
              parallaxSpeed={-5}
              movementPattern="default"
            />
          </>
        )}
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 md:px-6 py-8 flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white leading-tight">
            Saivya Singh
          </h1>
          <div
            className={cn(
              "text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white/90 to-purple-300 mt-2",
              pacifico.className,
            )}
          >
            Full-Stack Developer
          </div>
        </div>

        <div className="w-full text-center mb-12">
          <p className="text-base sm:text-lg md:text-xl text-white/60 leading-relaxed max-w-xl mx-auto">
            Computer Science student at Manipal Institute of Technology, passionate about creating innovative solutions
            through code.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <Button
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-6 py-2 rounded-md"
            asChild
          >
            <a href="#projects" onClick={handleLinkClick}>
              View Projects
            </a>
          </Button>
          <Button variant="outline" className="border-white/10 text-white/80 hover:bg-white/5" asChild>
            <a href="#contact" onClick={handleLinkClick}>
              Contact Me
            </a>
          </Button>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <a
            href="https://github.com/Saivya1"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5 text-white/80" />
          </a>
          <a
            href="https://linkedin.com/in/saivyasingh"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5 text-white/80" />
          </a>
          <a
            href="mailto:saivya1@gmail.com"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Email"
          >
            <Mail className="h-5 w-5 text-white/80" />
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors" aria-label="Resume">
            <FileText className="h-5 w-5 text-white/80" />
          </a>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white/40 hover:text-white/80 hover:bg-transparent animate-bounce"
            onClick={() => scrollToElement("about")}
          >
            <ArrowDown className="h-6 w-6" />
            <span className="sr-only">Scroll down</span>
          </Button>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  )
}
