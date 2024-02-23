import Page from "components/common/Page"
import clsx from "clsx"
import { type Viewport } from "next"
import Image from "next/image"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#a80505" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function UnderConstruction() {
  return (
    <Page>
      <div
        className={clsx(
          "flex min-h-screen h-full w-full flex-col items-center justify-center",
          "gap-4 p-2 md:px-12",
          "bg-sketch bg-cover bg-center",
        )}
      >
        <div
          className={clsx(
            "relative flex flex-col items-center justify-center text-white",
            `rounded-xl bg-red-900 bg-opacity-90 p-4 backdrop-blur-sm md:p-8
              lg:p-12`,
            "border-2",
          )}
        >
          <Image
            src="/Logo.webp"
            alt="The Red Shed logo"
            className={clsx(
              "absolute rotate-12",
              "-top-20 md:-top-28 lg:-top-44",
              "-left-9 md:-left-24 lg:-left-28",
              "w-36 md:w-64 lg:w-80",
            )}
            width={600}
            height={600}
          />
          <p
            className="md:mp-12 pb-4 pt-7 text-center font-lato text-3xl md:relative md:z-10
              md:text-5xl"
          >
            Coming Back Soon!
          </p>
          <p
            className="text-center font-lato text-base md:relative md:z-10 md:text-xl
              lg:text-2xl"
          >
            The Red Shed is currently undergoing renovations for our
            new location at 508 State St, Madison.
            <br />
            <br />
            <u>
              Check back in a few weeks to see if we&apos;re open yet.
            </u>
            <br />
            <br />
            <em>
              Thank you for your continuing patience and faithful
              service. We&apos;re excited to serve you again!
            </em>
            <br />
            <em>~The Red Shed Staff</em>
          </p>
        </div>
      </div>
    </Page>
  )
}
