import React from "react"
import { type Viewport } from "next"
import { Antonio, Lato } from "next/font/google"
import clsx from "clsx"
import Header from "components/Header"
import Sidebar from "components/Sidebar"
import Navbar from "components/Navbar"
import { getMenu, getPersonalInfo } from "api/collections"

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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#a80505" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  // const personalInfo = await getPersonalInfo();
  const menuItems = await getMenu();
  const personalInfo = await getPersonalInfo();
  return (
    <html
      lang="en"
      className={clsx(titleFont.variable, bodyFont.variable)}
    >
      <body>
        <div className="w-full min-h-screen bg-zinc-200 dark:bg-neutral-900 md:pb-16">
          <div
            className="dark:hidden fixed bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_90%_at_50%_0%,#000_70%,transparent_110%)]"
          >
          </div>
          <div
            className="hidden dark:block fixed bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
          >
          </div>
          <div
            className="hidden dark:block fixed left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#171717)]"
          >
          </div>

          <div className="relative w-full h-full">
           
            <Header menuItems={menuItems} />
            <div
              className="container mr-auto ml-auto grid grid-cols-12 md:gap-10 justify-between lg:mt-[220px]"
            >

              <div
                className="sticky hidden h-screen col-span-12 lg:col-span-4 lg:block top-44"
              >
                <Sidebar personalInfo={personalInfo} />
              </div>
              <div className="col-span-12 lg:col-span-8">

                <Navbar menuItems={menuItems} />

                <div className="bg-white lg:rounded-2xl dark:bg-dark-primary">
                  <slot />
                </div>
              </div>
            </div>
          </div>

        </div>
      </body>
    </html>
  )
}
