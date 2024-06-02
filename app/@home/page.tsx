import Navbar from "components/common/Navbar"
import Page from "components/common/Page"
import React from "react"
import Hero from "components/sections/Hero"
import About from "components/sections/About"
import Specialties from "components/sections/Specialties"
import Atmosphere from "components/sections/Atmosphere"
import Location from "components/sections/Location"
import { type Viewport } from "next"
import Reviews from "components/sections/Reviews"
import FollowUs from "components/sections/FollowUs"
import Footer from "components/sections/Footer"
import { getHomepageContext } from "api"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#a80505" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default async function Home() {
  const response = await getHomepageContext()

  return (
    <Page>
      <Navbar />
      <Hero id="hero" context={response} />
      <div className="flex flex-col gap-24 xs:gap-40 sm:gap-[200px]">
        <About context={response} />
        <Specialties context={response} />
        <Atmosphere context={response} />
        <Location id="findus" context={response} />
        <Reviews context={response} />
        <FollowUs context={response} />
      </div>
      <Footer />
    </Page>
  )
}
