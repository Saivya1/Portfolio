"use client"

import { motion } from "framer-motion"
import { Award, CheckCircle, ExternalLink, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Parallax } from "react-scroll-parallax"
import TextReveal from "@/components/animations/text-reveal"
import AnimateOnScroll from "@/components/animations/animate-on-scroll"
import StaggeredChildren from "@/components/animations/staggered-children"
import { useState } from "react"

export default function AchievementsSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const certifications = [
    {
      name: "AI Powered Software and System Design",
      issuer: "Coursera",
      link: "#",
      file: "AI_Powered_Software_and_System_Design.pdf",
      category: "AI & Machine Learning",
    },
    {
      name: "Big Data Integration and Processing",
      issuer: "Coursera",
      link: "#",
      file: "Big_Data_Integration_and_Processing.pdf",
      category: "Big Data",
    },
    {
      name: "Big Data Modeling and Management Systems",
      issuer: "Coursera",
      link: "#",
      file: "Big_Data_Modeling_and_Management_Systems.pdf",
      category: "Big Data",
    },
    {
      name: "Generative AI for Software Development",
      issuer: "Coursera",
      link: "#",
      file: "Generative_AI_for_Software_Development_Cumm.pdf",
      category: "AI & Machine Learning",
    },
    {
      name: "Introduction to Big Data",
      issuer: "Coursera",
      link: "#",
      file: "Introduction_to_Big_Data.pdf",
      category: "Big Data",
    },
    {
      name: "Introduction to Generative AI",
      issuer: "Coursera",
      link: "#",
      file: "Introduction_to_Generative_AI.pdf",
      category: "AI & Machine Learning",
    },
    {
      name: "Problem Solving (Intermediate)",
      issuer: "HackerRank",
      link: "#",
      file: "problem_solving_intermediate_certificate_hackerrank.pdf",
      category: "Programming",
    },
    {
      name: "Software Engineer Intern Certificate",
      issuer: "HackerRank",
      link: "#",
      file: "software_engineer_intern_certificate_hackerrank.pdf",
      category: "Programming",
    },
    {
      name: "Team Software Engineering with AI",
      issuer: "Coursera",
      link: "#",
      file: "Team_Software_Engineering_with_AI.pdf",
      category: "AI & Machine Learning",
    },
    {
      name: "Letter of Recommendation - TheBoochieStore",
      issuer: "TheBoochieStore",
      link: "#",
      file: "TheBoochieStore_LOR-1.pdf",
      category: "Professional",
    },
  ]

  const categories = Array.from(new Set(certifications.map((cert) => cert.category)))

  const filteredCertifications = activeCategory
    ? certifications.filter((cert) => cert.category === activeCategory)
    : certifications

  const achievements = [
    "Achieved a rank of 881 in the Manipal Entrance Test (MET)",
    "Led teams in prestigious hackathons, including Hacksplosion Think-a-thon and Creathon",
    "Successfully completed courses on Coursera offered by top companies like Google and DeepLearning.AI",
    "Earned certifications on HackerRank, validating proficiency in various technical and problem-solving skills",
  ]

  return (
    <section id="achievements" className="py-20 bg-[#030303] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] via-transparent to-purple-500/[0.02]" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <Parallax speed={-5}>
            <TextReveal
              text="Achievements & Certifications"
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
              Recognition of my skills, accomplishments, and professional certifications.
            </motion.p>
          </Parallax>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <AnimateOnScroll animation="fadeLeft" delay={0.3}>
            <Parallax speed={5}>
              <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Key Achievements</h3>
                </div>

                <StaggeredChildren className="space-y-4" staggerDelay={0.15} animation="fadeLeft">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <p className="text-white/70">{achievement}</p>
                    </div>
                  ))}
                </StaggeredChildren>
              </div>
            </Parallax>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fadeRight" delay={0.3}>
            <Parallax speed={-5}>
              <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Certifications</h3>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <Button
                    variant={activeCategory === null ? "default" : "outline"}
                    size="sm"
                    className={
                      activeCategory === null
                        ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                        : "border-white/10 text-white/70 hover:text-white hover:bg-white/5"
                    }
                    onClick={() => setActiveCategory(null)}
                  >
                    All
                  </Button>
                  {categories.map((category, index) => (
                    <Button
                      key={index}
                      variant={activeCategory === category ? "default" : "outline"}
                      size="sm"
                      className={
                        activeCategory === category
                          ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                          : "border-white/10 text-white/70 hover:text-white hover:bg-white/5"
                      }
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredCertifications.map((cert, index) => (
                      <div
                        key={index}
                        className="bg-white/[0.03] rounded-lg p-4 hover:bg-white/[0.05] transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-white font-medium mb-1">{cert.name}</h4>
                            <p className="text-white/60 text-sm mb-3">{cert.issuer}</p>
                          </div>
                          {cert.file && (
                            <div className="text-white/60 hover:text-white">
                              <FileText className="h-4 w-4" />
                            </div>
                          )}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-white/10 text-white/70 hover:text-white hover:bg-white/5"
                          asChild
                        >
                          <a href={`/certs/${cert.file}`} target="_blank" rel="noopener noreferrer">
                            <FileText className="mr-2 h-3 w-3" />
                            View Certificate
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <AnimateOnScroll animation="fadeUp" delay={0.8}>
                  <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
                    <p className="text-white/70 text-sm">
                      These certifications validate my expertise in various technical domains and demonstrate my
                      commitment to continuous learning and professional development.
                    </p>
                  </div>
                </AnimateOnScroll>
              </div>
            </Parallax>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
