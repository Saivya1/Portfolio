"use client"

import type React from "react"

import { ParallaxProvider } from "react-scroll-parallax"

export default function ParallaxProviderWrapper({ children }: { children: React.ReactNode }) {
  return <ParallaxProvider>{children}</ParallaxProvider>
}
