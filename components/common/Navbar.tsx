import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";

export type NavLinks = typeof navLinks
export const navLinks = [
  { title: "Home", url: "/building", blank: false },
  { title: "Menu", url: "/menu", blank: false },
  { title: "Promos", url: "/promos", blank: false },
  { title: "Find Us", url: "/findus", blank: false },
];

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const { pathname } = useRouter()


  return (
    <header
      id="page-header"
      className={clsx("mx-auto",
        "absolute top-0 flex w-full items-center justify-between h-18",
        "px-6 py-4 md:px-[5%] xl:px-[15%] 2xl:px-[20%] text-white",
        "transition duration-300",
        "bg-black bg-opacity-50 z-20"
      )}
    >

      <Link href="#hero">
        <Image
          alt="The Red Shed Logo"
          src="/pngs/RedShedLogoFacelift.png"
          className={clsx("cursor-pointer max-w-[182px] sm:max-w-[247px] relative z-20")}
          width={247}
          height={32}
        />
      </Link>

      <div className="hidden gap-4 md:flex lg:gap-16">
        {navLinks.map((item, i) => (
          <Link key={i}
            className="group font-title font-bold transition duration-300 text-xl"
            href={item.url}
          >
            {item.title}
            <span className={clsx("block h-1.5 w-0 mx-auto opacity-0 bg-accent pt-1",
              "transition-opacity duration-200 group-hover:opacity-100 group-hover:w-1.5 rounded-full",
              pathname === item.url && "w-1.5 opacity-100"
              )}
            />
          </Link>
        ))}
      </div>

      <div className={clsx("md:hidden p-1")}>
        <div className="relative z-20 flex flex-col gap-1 w-6 transform" onClick={() => setOpen(!open)}>
          <span aria-hidden="true" className={clsx("flex rounded-[1px] h-1 w-full bg-current transform transition duration-500 ease-in-out",
            open ? "rotate-45 translate-y-2 text-white" : "")} />
          <span aria-hidden="true" className={clsx("flex rounded-[1px] h-1 w-full bg-current transform transition duration-200 ease-in-out",
            open && "opacity-0 text-white")} />
          <span aria-hidden="true" className={clsx("flex rounded-[1px] h-1 w-full bg-current transform transition duration-500 ease-in-out",
            open ? "-rotate-45 -translate-y-2 text-white" : "")} />
        </div>


        {open && (
          <div className={clsx('md:hidden absolute z-10 top-0 left-0 h-screen w-full bg-accent-darker px-2 py-4 lg:px-8 lg:py-8 text-white',
            "flex flex-col items-center pt-24 gap-8")}>
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
