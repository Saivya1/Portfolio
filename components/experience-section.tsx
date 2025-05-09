"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Parallax } from "react-scroll-parallax"
import TextReveal from "@/components/animations/text-reveal"
import AnimateOnScroll from "@/components/animations/animate-on-scroll"
import StaggeredChildren from "@/components/animations/staggered-children"

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-[#030303] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] via-transparent to-purple-500/[0.02]" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <Parallax speed={-5}>
            <TextReveal
              text="Work Experience"
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
              My professional journey and work experience in the tech industry.
            </motion.p>
          </Parallax>
        </div>

        <div className="max-w-4xl mx-auto">
          <Parallax speed={3}>
            <AnimateOnScroll animation="scaleUp" delay={0.3}>
              <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Full-Stack Developer</h3>
                    <div className="flex items-center text-white/60 text-sm mt-1">
                      <span>TheBoochieStore.com</span>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>2022 - 2023</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-white/70 space-y-4 mb-6">
                  <AnimateOnScroll animation="fadeUp" delay={0.4}>
                    <p>
                      At TheBoochieStore.com, an eCommerce platform offering a curated collection of unique,
                      high-quality t-shirts, I worked as a full-stack developer. In this role, I took full ownership of
                      the website's development, from initial design to final deployment.
                    </p>
                  </AnimateOnScroll>
                  <AnimateOnScroll animation="fadeUp" delay={0.5}>
                    <p>
                      I independently created a highly intuitive, aesthetically pleasing, and fully responsive website,
                      ensuring that the user experience was seamless across various devices. Through thoughtful design
                      and development, I enhanced site navigation, optimized page load times, and introduced key
                      features that provided a smooth and enjoyable shopping experience for customers.
                    </p>
                  </AnimateOnScroll>
                  <AnimateOnScroll animation="fadeUp" delay={0.6}>
                    <p>
                      These improvements played a significant role in increasing customer engagement, driving a 20%
                      boost in sales, and elevating overall customer satisfaction. My work directly contributed to the
                      store's growth and success, offering a compelling, user-centered online shopping experience.
                    </p>
                  </AnimateOnScroll>
                </div>

                <AnimateOnScroll animation="fadeUp" delay={0.7}>
                  <div className="space-y-3">
                    <h4 className="text-white/80 font-medium">Key Achievements:</h4>
                    <StaggeredChildren
                      className="list-disc list-inside text-white/60 space-y-2"
                      staggerDelay={0.1}
                      animation="fadeLeft"
                    >
                      <li>Developed a fully responsive eCommerce platform from scratch</li>
                      <li>Implemented secure payment processing and user authentication</li>
                      <li>Optimized site performance, reducing load times by 40%</li>
                      <li>Integrated inventory management and order tracking systems</li>
                      <li>Contributed to a 20% increase in overall sales</li>
                    </StaggeredChildren>
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fadeUp" delay={0.9}>
                  <div className="mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 text-white/80 hover:bg-white/5"
                      asChild
                    >
                      <a href="https://theboochiestore.com" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit Website
                      </a>
                    </Button>
                  </div>
                </AnimateOnScroll>
              </div>
            </AnimateOnScroll>
          </Parallax>
        </div>
      </div>
    </section>
  )
}
