import clsx from "clsx"
import "./globals.css"
import { Antonio, Lato } from "next/font/google"
import ENV from "../constants/env"
import { Metadata } from "next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const titleFont = Antonio({
  variable: "--title-font",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
})
const bodyFont = Lato({
  variable: "--body-font",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
})

export const metadata: Metadata = {
  title: ENV.siteMetadata.title,
  description: ENV.siteMetadata.description,
  metadataBase: new URL(ENV.siteMetadata.url),
  robots: "index, follow",
  icons: {
    icon: ENV.siteMetadata.iconSrc,
    apple: ENV.siteMetadata.iconSrc,
    shortcut: ENV.siteMetadata.iconSrc,
  },
  openGraph: {
    type: "website",
    url: ENV.siteMetadata.url,
    title: ENV.siteMetadata.title,
    description: ENV.siteMetadata.description,
    siteName: "The Red Shed",
    images: [
      {
        url: ENV.siteMetadata.iconSrc,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@TheRealRedShed",
    creator: "@TheRealRedShed",
    title: ENV.siteMetadata.title,
    description: ENV.siteMetadata.description,
    images: ENV.siteMetadata.iconSrc,
  },
}

export default function RootLayout({
  underConstruction,
  home,
}: {
  underConstruction: React.ReactNode
  home: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(titleFont.variable, bodyFont.variable)}
      style={{ backgroundColor: "#000000" }}
    >
      <body className={clsx(titleFont.variable, bodyFont.variable)}
        style={{ backgroundColor: "#000000" }}
      >
        {ENV.showUnderConstruction ? underConstruction : home}
        <SpeedInsights />
      </body>
    </html>
  )
}
