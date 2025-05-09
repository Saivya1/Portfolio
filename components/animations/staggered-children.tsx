"use client"

import React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface StaggeredChildrenProps {
  children: React.ReactNode
  className?: string
  childrenClassName?: string
  staggerDelay?: number
  duration?: number
  threshold?: number
  animation?: "fadeUp" | "fadeIn" | "fadeLeft" | "fadeRight" | "scaleUp"
  once?: boolean
}

export default function StaggeredChildren({
  children,
  className = "",
  childrenClassName = "",
  staggerDelay = 0.1,
  duration = 0.5,
  threshold = 0.1,
  animation = "fadeUp",
  once = true,
}: StaggeredChildrenProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: threshold, once })

  // Animation variants
  const animations = {
    fadeUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    fadeLeft: {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 },
    },
    fadeRight: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  }

  const selectedAnimation = animations[animation]
  const itemVariants = {
    hidden: selectedAnimation.hidden,
    visible: {
      ...selectedAnimation.visible,
      transition: { duration },
    },
  }

  // Convert children to array to map over them
  const childrenArray = React.Children.toArray(children)

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {childrenArray.map((child, index) => (
        <motion.div key={index} className={childrenClassName} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
