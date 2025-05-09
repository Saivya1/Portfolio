"use client"

import { motion } from "framer-motion"
import { Award, Calendar, MapPin } from "lucide-react"
import { Parallax } from "react-scroll-parallax"
import TextReveal from "@/components/animations/text-reveal"
import AnimateOnScroll from "@/components/animations/animate-on-scroll"
import StaggeredChildren from "@/components/animations/staggered-children"

export default function EducationSection() {
  const education = [
    {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "Manipal Institute of Technology, Manipal",
      location: "Manipal, Karnataka",
      period: "2022 - 2026 (Expected)",
      description:
        "Currently pursuing a Bachelor's degree in Computer Science & Engineering, focusing on software development, algorithms, and computer systems.",
      achievements: ["Achieved a rank of 881 in the Manipal Entrance Test (MET)"],
    },
    {
      degree: "Higher Secondary Education (STD XII)",
      institution: "Birla High School",
      location: "Kolkata, West Bengal",
      period: "2020 - 2022",
      description: "Completed higher secondary education with a focus on science and mathematics.",
      achievements: ["Participated in various coding competitions and hackathons"],
    },
    {
      degree: "Secondary Education (STD X)",
      institution: "Birla High School",
      location: "Kolkata, West Bengal",
      period: "2020",
      description: "Completed secondary education with distinction in mathematics and science subjects.",
      achievements: ["Active member of the school's computer science club"],
    },
  ]

  return (
    <section id="education" className="py-20 bg-[#030303] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.02] via-transparent to-cyan-500/[0.02]" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <Parallax speed={-5}>
            <TextReveal
              text="Education"
              element="h2"
              className="text-3xl md:text-4xl font-bold mb-4 text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400"
              delay={0.1}
            />
            <motion.p
              className="text-white/60 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              My academic background and educational journey in the field of computer science.
            </motion.p>
          </Parallax>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-1/2 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-cyan-400 before:via-purple-400 before:to-cyan-400">
            {education.map((item, index) => (
              <div key={index} className="relative pl-10">
                <AnimateOnScroll animation="fadeRight" delay={0.2 * index}>
                  <Parallax speed={index % 2 === 0 ? 3 : -3}>
                    <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>

                    <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-xl p-6">
                      <h4 className="text-xl font-semibold text-white mb-1">{item.degree}</h4>
                      <p className="text-white/80 font-medium mb-2">{item.institution}</p>

                      <div className="flex flex-wrap gap-4 mb-4 text-white/60 text-sm">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {item.period}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4" />
                          {item.location}
                        </div>
                      </div>

                      <p className="text-white/70 mb-4">{item.description}</p>

                      {item.achievements.length > 0 && (
                        <div>
                          <h5 className="text-white/80 font-medium mb-2 flex items-center">
                            <Award className="mr-2 h-4 w-4 text-purple-400" />
                            Achievements
                          </h5>
                          <StaggeredChildren
                            className="list-disc list-inside text-white/60 space-y-1"
                            staggerDelay={0.1}
                            animation="fadeLeft"
                          >
                            {item.achievements.map((achievement, i) => (
                              <li key={i}>{achievement}</li>
                            ))}
                          </StaggeredChildren>
                        </div>
                      )}
                    </div>
                  </Parallax>
                </AnimateOnScroll>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
