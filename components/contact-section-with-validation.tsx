"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle } from "lucide-react"
import { Parallax } from "react-scroll-parallax"
import TextReveal from "@/components/animations/text-reveal"
import AnimateOnScroll from "@/components/animations/animate-on-scroll"
import StaggeredChildren from "@/components/animations/staggered-children"
import { toast } from "@/hooks/use-toast"
import emailjs from "@emailjs/browser"

interface ValidationProps {
  value: string
  rules: {
    pattern?: RegExp
    minLength?: number
    maxLength?: number
    required?: boolean
  }
  messages?: {
    pattern?: string
    minLength?: string
    maxLength?: string
    required?: string
  }
  showValid?: boolean
}

function FormValidation({ value, rules, messages, showValid = true }: ValidationProps) {
  const [error, setError] = useState<string | null>(null)
  const [valid, setValid] = useState(false)
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    if (!touched && value) {
      setTouched(true)
    }

    if (!touched) return

    if (rules.required && !value) {
      setError(messages?.required || "This field is required")
      setValid(false)
      return
    }

    if (rules.minLength && value.length < rules.minLength) {
      setError(messages?.minLength || `Minimum length is ${rules.minLength} characters`)
      setValid(false)
      return
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      setError(messages?.maxLength || `Maximum length is ${rules.maxLength} characters`)
      setValid(false)
      return
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      setError(messages?.pattern || "Invalid format")
      setValid(false)
      return
    }

    setError(null)
    setValid(true)
  }, [value, rules, messages, touched])

  if (!touched) return null

  if (error) {
    return (
      <div className="flex items-center gap-1 text-red-400 text-xs mt-1">
        <AlertCircle className="h-3 w-3" />
        <span>{error}</span>
      </div>
    )
  }

  if (valid && showValid && value) {
    return (
      <div className="flex items-center gap-1 text-green-400 text-xs mt-1">
        <CheckCircle className="h-3 w-3" />
        <span>Looks good!</span>
      </div>
    )
  }

  return null
}

export default function ContactSectionWithValidation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailJSInitialized, setEmailJSInitialized] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // Initialize EmailJS
  useEffect(() => {
    // Replace with your actual EmailJS public key
    emailjs.init("YOUR_PUBLIC_KEY")
    setEmailJSInitialized(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Map form field names to formData properties
    const fieldMap: Record<string, keyof typeof formData> = {
      user_name: "name",
      user_email: "email",
      subject: "subject",
      message: "message",
    }

    const formDataKey = fieldMap[name] || (name as keyof typeof formData)
    setFormData((prev) => ({ ...prev, [formDataKey]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!emailJSInitialized) {
      toast({
        title: "Error",
        description: "Email service not initialized yet. Please try again in a moment.",
        variant: "destructive",
      })
      return
    }

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill out all fields.",
        variant: "destructive",
      })
      return
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      if (!formRef.current) {
        throw new Error("Form reference not available")
      }

      // Replace with your actual EmailJS service ID and template ID
      const result = await emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formRef.current)

      if (result.status === 200) {
        toast({
          title: "Message Sent Successfully",
          description: "Thank you for your message! I'll get back to you soon.",
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        throw new Error("Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      value: "saivya1@gmail.com",
      link: "mailto:saivya1@gmail.com",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      value: "+91 85840 70725",
      link: "tel:+918584070725",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Location",
      value: "Manipal, Karnataka, India",
      link: "https://maps.google.com",
    },
  ]

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/Saivya1", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/in/saivyasingh", label: "LinkedIn" },
  ]

  return (
    <section id="contact" className="py-20 bg-[#030303] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] via-transparent to-purple-500/[0.02]" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <Parallax speed={-5}>
            <TextReveal
              text="Get In Touch"
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
              Have a project in mind or interested in working together? Feel free to reach out!
            </motion.p>
          </Parallax>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AnimateOnScroll animation="fadeLeft" delay={0.3}>
            <Parallax speed={5}>
              <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>

                <StaggeredChildren className="space-y-6 mb-8" staggerDelay={0.15} animation="fadeLeft">
                  {contactInfo.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      className="flex items-start gap-4 text-white/70 hover:text-white transition-colors"
                      target={item.title === "Location" ? "_blank" : undefined}
                      rel={item.title === "Location" ? "noopener noreferrer" : undefined}
                    >
                      <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-white">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-white/40 text-sm">{item.title}</h4>
                        <p className="text-white font-medium">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </StaggeredChildren>

                <h3 className="text-xl font-semibold text-white mb-4">Connect With Me</h3>

                <div className="flex gap-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-white/70 hover:text-white transition-colors"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </Parallax>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fadeRight" delay={0.3}>
            <Parallax speed={-5}>
              <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-white mb-6">Send Me a Message</h3>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="user_name" className="block text-white/60 text-sm mb-2">
                        Your Name
                      </label>
                      <Input
                        id="user_name"
                        name="user_name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/30"
                      />
                      <FormValidation
                        value={formData.name}
                        rules={{ required: true, minLength: 2 }}
                        messages={{ required: "Name is required", minLength: "Name is too short" }}
                      />
                    </div>
                    <div>
                      <label htmlFor="user_email" className="block text-white/60 text-sm mb-2">
                        Your Email
                      </label>
                      <Input
                        id="user_email"
                        name="user_email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/30"
                      />
                      <FormValidation
                        value={formData.email}
                        rules={{
                          required: true,
                          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        }}
                        messages={{
                          required: "Email is required",
                          pattern: "Please enter a valid email address",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-white/60 text-sm mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry"
                      required
                      className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/30"
                    />
                    <FormValidation
                      value={formData.subject}
                      rules={{ required: true, minLength: 3 }}
                      messages={{
                        required: "Subject is required",
                        minLength: "Subject is too short",
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white/60 text-sm mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hello, I'd like to discuss a project..."
                      required
                      className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/30 min-h-[150px]"
                    />
                    <FormValidation
                      value={formData.message}
                      rules={{ required: true, minLength: 10 }}
                      messages={{
                        required: "Message is required",
                        minLength: "Please provide a more detailed message",
                      }}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </Parallax>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
