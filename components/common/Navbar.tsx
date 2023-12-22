import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export type NavLinks = typeof navLinks
export const navLinks = [
  { title: "Home", url: "/#home", blank: false },
  { title: "Menu", url: "/#menu", blank: false },
  { title: "Promos", url: "/#promos", blank: false },
  { title: "Find Us", url: "/#findus", blank: false },
];

export default function Navbar() {
  const [open, setOpen] = useState(false)


  return (
    <header
      id="page-header"
      className={clsx("mx-auto",
        "absolute top-0 flex w-full items-center justify-between h-18",
        "px-6 py-4 sm:px-[10%] xl:px-[15%] 2xl:px-[20%] text-white",
        "transition duration-300",
        "bg-black bg-opacity-50"
      )}
    >

      <Link href="#hero">
        <Image
          alt="The Red Shed Logo"
          src="/pngs/RedShedLogoFacelift.png"
          className="cursor-pointer max-w-[182px] sm:max-w-[247px]"
          width={247}
          height={32}
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

      <div className={clsx("md:hidden p-1")}>
        <div className="relative z-20 flex flex-col gap-1 w-6 transform" onClick={() => setOpen(!open)}>
          <span aria-hidden="true" className={clsx("flex rounded-[1px] h-1 w-full bg-current transform transition duration-500 ease-in-out",
            open ? "rotate-45 translate-y-2 text-black" : "")} />
          <span aria-hidden="true" className={clsx("flex rounded-[1px] h-1 w-full bg-current transform transition duration-200 ease-in-out",
            open && "opacity-0 text-black")} />
          <span aria-hidden="true" className={clsx("flex rounded-[1px] h-1 w-full bg-current transform transition duration-500 ease-in-out",
            open ? "-rotate-45 -translate-y-2 text-black" : "")} />
        </div>


        {open && (
          <div className={clsx('md:hidden absolute z-10 top-0 left-0 h-screen w-full bg-stone-300 px-2 py-4 lg:px-8 lg:py-8 text-black',
            "flex flex-col items-center pt-24 gap-8")}>

            <Link href="#hero">
              <Image
                alt="The Red Shed Logo"
                src="/Logo.webp"
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
    </header>
  );
}
