"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import ENV from "constants/env"

export const mkNavLink = (url: string) => {
  return ENV.showUnderConstruction ? `/building${url}` : url
}

export type NavLinks = typeof navLinks
export const navLinks = [
  { title: "Home", url: mkNavLink("/"), blank: false, enabled: true },
  { title: "Menu", url: mkNavLink("/menu"), blank: false, enabled: true },
  { title: "Promos", url: mkNavLink("/promos"), blank: false, enabled: true },
  { title: "Find Us", url: mkNavLink("/#findus"), blank: false, enabled: true },
  { title: "Building", url: mkNavLink("/building"), blank: false, enabled: !ENV.showUnderConstruction },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const pathname = usePathname()

  return (
    <header
      id="page-header"
      className={clsx(
        "mx-auto",
        "absolute top-0 flex h-18 w-full items-center justify-between",
        "px-6 py-4 text-white md:px-[5%] xl:px-[15%] 2xl:px-[20%]",
        "transition duration-300",
        "z-20 overflow-hidden bg-black bg-opacity-25",
      )}
    >
      <Link href={mkNavLink("/")} className="transition-transform hover:scale-102 active:animate-pop">
        <Image
          alt="The Red Shed Logo"
          src="/RedShedLogoFacelift.webp"
          className={clsx(
            "relative max-w-[182px] cursor-pointer sm:max-w-[247px]",
          )}
          width={247}
          height={32}
        />
      </Link>

      <div className="hidden gap-4 md:flex lg:gap-16">
        {navLinks.filter(link => link.enabled).map(item => (
          <Link
            key={item.title}
            className="group font-title text-xl font-bold duration-300 xl:text-2xl active:animate-pop"
            href={item.url}
          >
            {item.title}
            <span
              className={clsx(
                "relative top-1 mx-auto block h-2 w-0 bg-accent opacity-0",
                `rounded-full transition-opacity duration-200 group-hover:w-2
                  group-hover:opacity-100`,
                pathname === item.url && "w-2 opacity-100",
              )}
            />
          </Link>
        ))}
      </div>

      <div className={clsx("overflow-hidden p-1 md:hidden")}>
        <div
          className={clsx(
            "relative flex w-6 transform flex-col gap-1",
          )}
          onClick={() => setOpen(!open)}
        >
          <span
            aria-hidden="true"
            className={clsx(
              `flex h-1 w-full transform rounded-[1px] bg-current transition
                duration-500 ease-in-out`,
              open ? "" : "",
            )}
          />
          <span
            aria-hidden="true"
            className={clsx(
              `flex h-1 w-full transform rounded-[1px] bg-current transition
                duration-200 ease-in-out`,
              open && "",
            )}
          />
          <span
            aria-hidden="true"
            className={clsx(
              `flex h-1 w-full transform rounded-[1px] bg-current transition
                duration-500 ease-in-out`,
              open ? "" : "",
            )}
          />
        </div>

        <div
          className={clsx(
            "fixed left-0 top-0 h-full w-full bg-black bg-opacity-75",
            "transition-opacity duration-300",
            open ? "opacity-75" : `pointer-events-none opacity-0`,
          )}
          onClick={() => setOpen(false)}
        />

        <div
          className={clsx(
            "transition-all duration-300 ease-in-out",
            !open && "translate-x-[100%]",
            `fixed right-0 top-0 z-10 h-full w-3/4 bg-accent-darker px-2 py-4
              text-white md:hidden lg:px-8 lg:py-8`,
            "flex flex-col items-center gap-10 pt-44 sm:pt-64",
          )}
        >
          <Image
            src="/Canopy.svg"
            alt=""
            className="absolute top-0 w-full"
            width={24}
            height={24}
          />

          <div
            className={clsx(
              `absolute right-8 top-32 z-20 flex w-6 transform flex-col gap-1
                sm:right-12 sm:top-48`,
            )}
            onClick={() => setOpen(!open)}
          >
            <span
              aria-hidden="true"
              className={clsx(
                `flex h-1 w-full transform rounded-[1px] bg-current transition
                  duration-500 ease-in-out`,
                "translate-y-2 rotate-45 text-white",
              )}
            />
            <span
              aria-hidden="true"
              className={clsx(
                `flex h-1 w-full transform rounded-[1px] bg-current transition
                  duration-200 ease-in-out`,
                "text-white opacity-0",
              )}
            />
            <span
              aria-hidden="true"
              className={clsx(
                `flex h-1 w-full transform rounded-[1px] bg-current transition
                  duration-500 ease-in-out`,
                "-translate-y-2 -rotate-45 text-white",
              )}
            />
          </div>

          {navLinks.map((item, i) => (
            <Link
              key={item.title}
              className="group font-title text-5xl font-bold transition duration-300"
              onClick={() => setOpen(false)}
              href={item.url}
            >
              {item.title}
              <span
                className={clsx(
                  "relative top-2 mx-auto block h-2 w-0 bg-white opacity-0",
                  `rounded-full transition-opacity duration-200 group-hover:w-2
                    group-hover:opacity-100`,
                  pathname === item.url && "w-2 opacity-100",
                )}
              />
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
