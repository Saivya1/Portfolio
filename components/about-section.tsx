"use client"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { Parallax } from "react-scroll-parallax"
import AnimateOnScroll from "@/components/animations/animate-on-scroll"
import TextReveal from "@/components/animations/text-reveal"
import { ParallaxElement } from "@/components/parallax-scroll-effects"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], ["10%", "0%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1])

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-[#030303] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] via-transparent to-purple-500/[0.02]" />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="w-full"
          style={{
            y: contentY,
            opacity: contentOpacity,
          }}
        >
          <ParallaxElement direction="up" speed={5}>
            <TextReveal
              text="About Me"
              element="h2"
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
              delay={0.1}
            />

            <div className="space-y-4 text-white/70 mb-8">
              <AnimateOnScroll animation="fadeUp" delay={0.2}>
                <p>
                  Hello! I'm Saivya Singh, a passionate Computer Science student at Manipal Institute of Technology
                  with a focus on full-stack development and software engineering.
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fadeUp" delay={0.3}>
                <p>
                  My journey in programming began during my school years at Birla High School, Kolkata, where I
                  developed a strong foundation in computer science fundamentals. Since then, I've expanded my skills
                  across various programming languages and frameworks, with a particular interest in web development
                  and embedded systems.
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fadeUp" delay={0.4}>
                <p>
                  I've had the opportunity to work as a full-stack developer at TheBoochieStore.com, where I
                  independently developed and deployed an eCommerce platform that increased sales by 20%. I'm
                  constantly seeking new challenges and opportunities to grow as a developer.
                </p>
              </AnimateOnScroll>
            </div>

            <AnimateOnScroll animation="fadeUp" delay={0.5}>
              <div className="flex flex-wrap gap-6 mb-8">
                <div>
                  <h3 className="text-white/40 text-sm mb-1">Education</h3>
                  <p className="text-white font-medium">B.Tech in Computer Science</p>
                </div>
                <div>
                  <h3 className="text-white/40 text-sm mb-1">Location</h3>
                  <p className="text-white font-medium">Manipal, India</p>
                </div>
                <div>
                  <h3 className="text-white/40 text-sm mb-1">Email</h3>
                  <p className="text-white font-medium">saivya1@gmail.com</p>
                </div>
                <div>
                  <h3 className="text-white/40 text-sm mb-1">Phone</h3>
                  <p className="text-white font-medium">+91 85840 70725</p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeUp" delay={0.6}>
              <Button
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
                asChild
              >
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">

                  <FileText className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </AnimateOnScroll>
          </ParallaxElement>
        </motion.div>
      </div>
    </section>
  )
}
