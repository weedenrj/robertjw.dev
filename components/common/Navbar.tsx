import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export type NavLinks = typeof navLinks
export const navLinks = [
  { title: "Services", url: "/#services" },
  // { title: "Location", url: "/#location" },
  // { title: "Gallery", url: "/#gallery" },
  // { title: "Contact us", url: "/#contact" },
  { title: "Weather", url: "https://www.eaa431.org/weather/", blank: true },

];

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  const handleScroll = () => {
    const scrolldistance = document.getElementById("body")?.scrollTop
    if (scrolldistance)
      scrolldistance >= 200 ? setHasScrolled(true) : setHasScrolled(false)
  }

  useEffect(() => {
    const body = document.getElementById("body")
    body?.addEventListener("scroll", handleScroll)
    return () => body?.removeEventListener("scroll", handleScroll)
  })

  return (
    <header
      id="page-header"
      className={clsx("mx-auto",
        "sticky top-0 flex w-full items-center justify-between",
        "px-2 py-4 sm:px-[10%] xl:px-[15%] 2xl:px-[20%] text-white",
        "transition duration-300",
        hasScrolled ? "bg-black border-b-2 border-yellow" : "bg-black"
      )}
    >

      <Link href="#hero">
        <Image
          alt="Brodhead Aviation Logo"
          src="/logo.webp"
          className="cursor-pointer max-w-[80px] sm:max-w-[100px] lg:max-w-[124px]"
          width={150}
          height={150}
        />
      </Link>

      <div className="hidden gap-4 md:flex lg:gap-16">
        {navLinks.map((item, i) => (
          <Link key={i}
            className="group font-lato font-bold transition duration-300 text-xl"
            href={item.url}
          >
            {item.title}
            <span className="block h-0.5 max-w-0 bg-white transition-all duration-500 group-hover:max-w-full" />
          </Link>
        ))}
      </div>

      <div className="md:hidden">
        <div className={clsx("md:hidden")}>
          <div className="relative z-20 block w-6 transform -translate-x-1/2 -translate-y-1/2" onClick={() => setOpen(!open)}>
            <span aria-hidden="true" className={clsx("block absolute h-0.5 w-7 bg-current transform transition duration-500 ease-in-out",
              open ? "rotate-45 text-black" : "-translate-y-1.5")} />
            <span aria-hidden="true" className={clsx("block absolute h-0.5 w-7 bg-current transform transition duration-200 ease-in-out",
              open && "opacity-0 text-black")} />
            <span aria-hidden="true" className={clsx("block absolute h-0.5 w-7 bg-current transform transition duration-500 ease-in-out",
              open ? "-rotate-45 text-black" : "translate-y-1.5")} />
          </div>

          {open && (
            <div className={clsx('absolute z-10 top-0 left-0 h-screen w-full bg-stone-300 px-2 py-4 lg:px-8 lg:py-8 text-black',
              "flex flex-col items-center pt-24 gap-8")}>

              <Link href="#hero">
                <Image
                  alt="Brodhead Aviation Logo"
                  src="/logo.webp"
                  className="absolute top-4 left-2 sm:top-[10%] max-w-[80px] sm:max-w-[100px]"
                  width={150}
                  height={150}
                />
              </Link>

              {navLinks.map((item, i) => (
                <Link key={i}
                  className="group font-lato font-bold font-title transition duration-300 text-5xl"
                  onClick={() => setOpen(false)}
                  href={item.url}
                >
                  {item.title}
                  <span className="block h-0.5 max-w-0 bg-white transition-all duration-500 group-hover:max-w-full" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
