import Navbar from "@components/common/Navbar"
import Page from "@components/common/Page"
import React from "react"
import Hero from "@components/sections/Hero"
import About from "@components/sections/About"
import Specialties from "@components/sections/Specialties"
import Atmosphere from "@components/sections/Atmosphere"
import { type Viewport } from "next"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#a80505" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function Home() {
  return (
    <Page>
      <Navbar />
      <Hero />
      <div className="flex flex-col gap-24 xs:gap-40 sm:gap-[200px]">
        <About />
        <Specialties />
        <Atmosphere />
      </div>
    </Page>
  )
}
