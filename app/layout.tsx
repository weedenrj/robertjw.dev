import clsx from "clsx"
import "./globals.css"
import { Antonio, Lato } from "next/font/google"
import ENV from "../constants/env"

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

export default function RootLayout({
  underConstruction,
  home,
}: {
  underConstruction: React.ReactNode
  home: React.ReactNode
}) {
  return (
    <html lang="en" className={clsx(titleFont.variable, bodyFont.variable)} >
      <body className={clsx(titleFont.variable, bodyFont.variable)}>
        {ENV.showUnderConstruction ? underConstruction : home}
      </body>
    </html>
  )
}