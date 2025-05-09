"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LazyImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export default function LazyImage({ src, alt, width, height, className, priority = false }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    // Skip if priority is true
    if (priority) {
      setIsInView(true)
      return
    }

    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: "200px" }, // Start loading when image is 200px from viewport
    )

    // Get current element to observe
    const element = document.getElementById(`lazy-image-${src.replace(/\W/g, "")}`)
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [src, priority])

  return (
    <div
      id={`lazy-image-${src.replace(/\W/g, "")}`}
      className={cn("relative overflow-hidden", className)}
      style={{ width, height }}
    >
      {(isInView || priority) && (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className={cn("transition-opacity duration-500", isLoaded ? "opacity-100" : "opacity-0")}
          onLoad={() => setIsLoaded(true)}
          priority={priority}
        />
      )}

      {!isLoaded && <div className="absolute inset-0 bg-white/5 animate-pulse" />}
    </div>
  )
}
