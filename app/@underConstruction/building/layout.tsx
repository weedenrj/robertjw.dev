import Navbar from "components/common/Navbar"
import Page from "components/common/Page"
import React from "react"
import { type Viewport } from "next"
import Footer from "components/sections/Footer"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#a80505" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Page>
      <Navbar />
      {children}
      <Footer />
    </Page>
  )
}
