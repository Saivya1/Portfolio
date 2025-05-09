"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Code, Database, Globe, Server, Cpu, Wrench, BookOpen, Terminal } from "lucide-react"
import { Parallax } from "react-scroll-parallax"
import StaggeredChildren from "@/components/animations/staggered-children"
import TextReveal from "@/components/animations/text-reveal"
import { ParallaxElement } from "@/components/parallax-scroll-effects"
import { useRef } from "react"

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const headerY = useTransform(scrollYProgress, [0, 0.5], ["20%", "0%"])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1])

  const skills = [
    {
      category: "Programming Languages",
      icon: <Code className="h-6 w-6" />,
      items: ["C/C++", "Java", "Python", "JavaScript", "SQL", "PLSQL", "Verilog", "Assembly", "Embedded C (LPC1768)"],
    },
    {
      category: "Web Development",
      icon: <Globe className="h-6 w-6" />,
      items: ["ReactJS", "NodeJS", "HTML/CSS", "ElectronJS", "Flask"],
    },
    {
      category: "Developer Tools",
      icon: <Wrench className="h-6 w-6" />,
      items: ["Git", "GitHub", "VS Code", "Eclipse", "PyCharm"],
    },
    {
      category: "Libraries",
      icon: <BookOpen className="h-6 w-6" />,
      items: ["NumPy", "Pandas", "Matplotlib", "OpenMPI", "CUDA"],
    },
    {
      category: "Databases",
      icon: <Database className="h-6 w-6" />,
      items: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
    },
    {
      category: "Backend & APIs",
      icon: <Server className="h-6 w-6" />,
      items: ["RESTful APIs", "Express", "Flask", "Node.js"],
    },
    {
      category: "Embedded Systems",
      icon: <Cpu className="h-6 w-6" />,
      items: ["LPC1768", "Arduino", "Microcontroller Programming", "Hardware Interfacing"],
    },
    {
      category: "Command Line",
      icon: <Terminal className="h-6 w-6" />,
      items: ["Bash", "PowerShell", "Linux Commands", "Shell Scripting"],
    },
  ]

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-[#030303] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.02] via-transparent to-cyan-500/[0.02]" />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          style={{
            y: headerY,
            opacity: headerOpacity,
          }}
        >
          <Parallax speed={-5}>
            <TextReveal
              text="Technical Skills"
              element="h2"
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              delay={0.1}
            />
            <motion.p
              className="text-white/60 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A comprehensive overview of my technical expertise and proficiencies across various domains of computer
              science.
            </motion.p>
          </Parallax>
        </motion.div>

        <StaggeredChildren
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          childrenClassName="bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-xl p-6 hover:bg-white/[0.05] transition-colors"
          staggerDelay={0.1}
          animation="fadeUp"
        >
          {skills.map((skill, index) => (
            <ParallaxElement key={index} direction={index % 2 === 0 ? "up" : "down"} speed={3 + (index % 5)}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white">
                    {skill.icon}
                  </div>
                  <h3 className="text-white font-medium">{skill.category}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, itemIndex) => (
                    <span key={itemIndex} className="px-3 py-1 text-sm rounded-full bg-white/[0.03] text-white/70">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ParallaxElement>
          ))}
        </StaggeredChildren>
      </div>
    </section>
  )
}
