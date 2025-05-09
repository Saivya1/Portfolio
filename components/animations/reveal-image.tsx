"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

interface RevealImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  imageClassName?: string
  threshold?: number
  once?: boolean
  delay?: number
}

export default function RevealImage({
  src,
  alt,
  width,
  height,
  className = "",
  imageClassName = "",
  threshold = 0.2,
  once = true,
  delay = 0,
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: threshold, once })

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: isInView ? 1 : 0,
          scale: isInView ? 1 : 0.95,
          y: isInView ? 0 : 20,
        }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.4, 0.25, 1],
        }}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className={`transition-all duration-700 ${imageClassName}`}
        />
      </motion.div>
    </div>
  )
}
