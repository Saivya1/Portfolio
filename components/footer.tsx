"use client"
import { Github, Linkedin, Mail, FileText, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

export default function Footer() {
  const { scrollToElement, handleLinkClick } = useSmoothScroll({ offset: 0 })

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/Saivya1", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/in/saivyasingh", label: "LinkedIn" },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:saivya1@gmail.com", label: "Email" },
    { icon: <FileText className="h-5 w-5" />, href: "#", label: "Resume" },
  ]

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

  return (
    <footer className="bg-[#030303] relative pt-16 pb-8">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/[0.03] via-transparent to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 pb-12 border-b border-white/10">
          <div className="md:col-span-2">
            <a href="#home" className="text-white font-bold text-2xl mb-4 inline-block" onClick={handleLinkClick}>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                Saivya.dev
              </span>
            </a>
            <p className="text-white/60 mb-6 max-w-md">
              Computer Science student at Manipal Institute of Technology and full-stack developer passionate about
              creating innovative solutions through code.
            </p>
            <div className="flex space-x-4">
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

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.slice(0, 4).map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors"
                    onClick={handleLinkClick}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">More Links</h3>
            <ul className="space-y-3">
              {navLinks.slice(4).map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors"
                    onClick={handleLinkClick}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Saivya Singh. All rights reserved.
          </p>

          <Button
            variant="outline"
            size="icon"
            className="border-white/10 text-white/60 hover:text-white hover:bg-white/5"
            onClick={() => scrollToElement("home")}
          >
            <ArrowUp className="h-5 w-5" />
            <span className="sr-only">Back to top</span>
          </Button>
        </div>
      </div>
    </footer>
  )
}
