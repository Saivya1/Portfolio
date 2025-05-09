"use client"

import { useState, useRef, useCallback } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Code, Database, Globe, Cpu } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Parallax } from "react-scroll-parallax"
import StaggeredChildren from "@/components/animations/staggered-children"
import TextReveal from "@/components/animations/text-reveal"
import AnimateOnScroll from "@/components/animations/animate-on-scroll"
import { ParallaxElement } from "@/components/parallax-scroll-effects"
import { useMobile } from "@/hooks/use-mobile"

export default function ProjectsSection() {
  const [filter, setFilter] = useState("All")
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const headerY = useTransform(scrollYProgress, [0, 0.5], ["20%", "0%"])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1])
  const isMobile = useMobile()

  const categories = [
    { name: "All", icon: <Code className="h-4 w-4" /> },
    { name: "Web", icon: <Globe className="h-4 w-4" /> },
    { name: "Embedded", icon: <Cpu className="h-4 w-4" /> },
    { name: "Database", icon: <Database className="h-4 w-4" /> },
  ]

  const projects = [
    { title: "Advanced Gallery Application", description: "Developed an advanced gallery app using BLIP for image captioning and Tesseract for OCR. Integrated a robust file management system with efficient search and retrieval.", category: "Web", technologies: ["JavaScript", "CSS", "Flask", "BLIP", "Tesseract OCR"], github: "https://github.com/Saivya1/Projects", demo: "#" },
    { title: "Sales Prediction System", description: "Developed a sales prediction system using CSV data and Upgini, achieving highly accurate forecasts while showcasing data analysis and predictive modelling skills.", category: "Web", technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Upgini"], github: "https://github.com/Saivya1/Projects", demo: "#" },
    { title: "eCommerce Management System", description: "Designed a full-stack eCommerce system with MySQL for back-end and HTML & CSS for front-end, showcasing skills in database management and web application development.", category: "Database", technologies: ["HTML", "CSS", "JavaScript", "MySQL", "PHP"], github: "https://github.com/Saivya1/Projects", demo: "#" },
    { title: "Clock with Alarm on LPC1768", description: "Built a clock with alarm functionality and buzzer integration on an LPC1768 microcontroller, demonstrating embedded systems and hardware programming expertise.", category: "Embedded", technologies: ["Embedded C", "LPC1768", "Hardware Programming"], github: "https://github.com/Saivya1/Projects", demo: "#" },
  ]

  const filteredProjects = filter === "All" ? projects : projects.filter((p) => p.category === filter)

  const renderProject = useCallback((project: typeof projects[0], index: number) => (
    <ParallaxElement key={index} direction={index % 2 === 0 ? "up" : "down"} speed={isMobile ? 0 : 5 + (index % 3)}>
      <div className="flex flex-col items-center text-center h-full w-full">
        {/* Fixed-height title container for consistent baseline */}
        <div className="relative w-full h-40 md:h-48 overflow-hidden flex items-center justify-center rounded-md">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 whitespace-nowrap"
          >
            {project.title}
          </motion.h2>
        </div>
  
        <div className="p-6 flex flex-col flex-grow items-center text-center">
          <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-none mb-4">
            {project.category}
          </Badge>
          <p className="text-white/60 mb-4 flex-grow">{project.description}</p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="px-2 py-1 text-xs rounded-full bg-white/[0.03] text-white/70">
                {tech}
              </span>
            ))}
          </div>
  
          <div className="flex justify-center gap-3 mt-auto">
            <Button variant="outline" size="sm" className="border-white/10 text-white/80 hover:bg-white/5" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> Code
              </a>
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white" asChild>
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo in Progress
              </a>
            </Button>
          </div>
        </div>
      </div>
    </ParallaxElement>
  ), [isMobile])
  
  return (
    <section id="projects" ref={sectionRef} className="py-20 pb-28 bg-[#030303] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] via-transparent to-purple-500/[0.02]" />

      <div className="container mx-auto px-4 md:px-6 w-full">
        <motion.div className="text-center mb-12" style={{ y: isMobile ? 0 : headerY, opacity: isMobile ? 1 : headerOpacity }}>
          <Parallax speed={isMobile ? 0 : -5}>
            <TextReveal text="Featured Projects" element="h2" className="text-3xl md:text-4xl font-bold mb-4 text-white" delay={0.1} />
            <motion.p className="text-white/60 max-w-5xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              A showcase of my technical projects, demonstrating my skills and experience in various domains of computer science.
            </motion.p>
          </Parallax>
        </motion.div>

        <AnimateOnScroll animation="fadeUp" delay={0.3} className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat, idx) => (
            <Button key={idx} variant={filter === cat.name ? "default" : "outline"} className={filter === cat.name ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-none" : "border-white/10 text-white/70 hover:text-white hover:bg-white/5"} onClick={() => setFilter(cat.name)}>
              {cat.icon}<span className="ml-2">{cat.name}</span>
            </Button>
          ))}
        </AnimateOnScroll>

        <StaggeredChildren className="flex flex-wrap justify-center gap-6 w-full" childrenClassName="bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 h-full flex flex-col w-full" staggerDelay={0.15} animation="fadeUp">
  {filteredProjects.map((proj, i) => renderProject(proj, i))}
</StaggeredChildren>

      </div>
    </section>
  )
}
