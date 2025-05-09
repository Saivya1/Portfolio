"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X, Github, Linkedin, Mail, FileText } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import { useMobile } from "@/hooks/use-mobile"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { handleLinkClick } = useSmoothScroll({ offset: 80 }) // Offset for the fixed header
  const isMobile = useMobile()

  // Track scroll position and update active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Get all sections and determine which one is in view
      const sections = document.querySelectorAll("section[id], div[id='home']")
      const scrollPosition = window.scrollY + 300 // Offset to trigger active state earlier

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
        const sectionId = section.getAttribute("id") || ""

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    // Initial call to set the active section on page load
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMobileMenuOpen])

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ]

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/Saivya1", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/in/saivyasingh", label: "LinkedIn" },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:saivya1@gmail.com", label: "Email" },
    { icon: <FileText className="h-5 w-5" />, href: "/resume.pdf", target: "_blank", label: "Resume" },
  ]

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-[#030303]/80 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5",
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <a href="#home" className="text-white font-bold text-xl" onClick={handleLinkClick}>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                Saivya.dev
              </span>
            </a>

            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1)
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-white/70 hover:text-white transition-colors text-sm font-medium relative py-1 px-2",
                      isActive && "text-white",
                    )}
                    onClick={handleLinkClick}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeSection"
                        className="absolute inset-0 rounded-md border-2 border-cyan-500/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </a>
                )
              })}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#030303] md:hidden"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-10">
                <a
                  href="#home"
                  className="text-white font-bold text-xl"
                  onClick={(e) => {
                    handleLinkClick(e)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                    Saivya.dev
                  </span>
                </a>
                <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>

              <nav className="flex flex-col space-y-6 mb-10">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1)
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "text-white/70 hover:text-white transition-colors text-lg font-medium relative py-2 px-3",
                        isActive && "text-white bg-white/[0.03] rounded-md border-l-4 border-cyan-500",
                      )}
                      onClick={(e) => {
                        handleLinkClick(e)
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      {link.name}
                    </a>
                  )
                })}
              </nav>

              <div className="flex items-center space-x-6 mt-auto mb-10">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
