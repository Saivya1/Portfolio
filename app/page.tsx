import dynamic from "next/dynamic"
import ParallaxProviderWrapper from "@/components/parallax-provider"
import ScrollIndicator from "@/components/scroll-indicator"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import Navbar from "@/components/navbar"
import { ParallaxBackground } from "@/components/parallax-scroll-effects"
import { Suspense } from "react"

// Dynamically import components that are below the fold
const SkillsSection = dynamic(() => import("@/components/skills-section"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-[#030303]">
      <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
})

const ExperienceSection = dynamic(() => import("@/components/experience-section"))
const ProjectsSection = dynamic(() => import("@/components/projects-section"))
const EducationSection = dynamic(() => import("@/components/education-section"))
const AchievementsSection = dynamic(() => import("@/components/achievements-section"))
const ContactSection = dynamic(() => import("@/components/contact-section"))
const Footer = dynamic(() => import("@/components/footer"))
const ScrollToTop = dynamic(() => import("@/components/scroll-to-top"))

export default function HomePage() {
  return (
    <ParallaxProviderWrapper>
      <main className="min-h-screen bg-[#030303] relative">
        <ScrollIndicator />
        <ParallaxBackground />
        <Navbar />
        <HeroSection />
        <AboutSection />

        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#030303]">
              <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }
        >
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <EducationSection />
          <AchievementsSection />
          <ContactSection />
          <Footer />
          <ScrollToTop />
        </Suspense>
      </main>
    </ParallaxProviderWrapper>
  )
}
