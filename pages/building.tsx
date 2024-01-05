import Navbar from "@components/common/Navbar"
import Page from "@components/common/Page"
import React from "react"
import Hero from "@components/sections/Hero"
import About from "@components/sections/About"
import Specialties from "@components/sections/Specialties"
import Atmosphere from "@components/sections/Atmosphere"

export default function Building() {
  return (
    <Page
      SEO={{
        title: "The Red Shed | Madison, Wi.",
        url: "https://redshedmadison.com",
        image: "https://redshedmadison.com/RedShed_Stamp_Classic.png",
        desc:
          "The Red Shed is currently undergoing renovations for our new location at 508 State St, Madison. " +
          "Check back in a few weeks to see if we're open yet. Thank you for your continuing patience and faithful service. We're excited to serve you again!",
      }}
    >
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
