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
        "bg-black bg-opacity-50 z-20 overflow-hidden"
      )}
    >

      <Link href="#hero">
        <Image
          alt="The Red Shed Logo"
          src="/RedShedLogoFacelift.webp"
          className={clsx("cursor-pointer max-w-[182px] sm:max-w-[247px] relative")}
          width={247}
          height={32}
        />
      </Link>

      <div className="hidden gap-4 md:flex lg:gap-16">
        {navLinks.map((item, i) => (
          <Link key={i}
            className="group font-title font-bold transition duration-300 text-xl xl:text-2xl"
            href={item.url}
          >
            {item.title}
            <span className={clsx("block h-2 w-0 mx-auto opacity-0 bg-accent relative top-1",
              "transition-opacity duration-200 group-hover:opacity-100 group-hover:w-2 rounded-full",
              pathname === item.url && "w-2 opacity-100"
            )}
            />
          </Link>
        ))}
      </div>

      <div className={clsx("md:hidden p-1")}>
        <div className={clsx("relative flex flex-col gap-1 w-6 transform")} onClick={() => setOpen(!open)}>
          <span aria-hidden="true" className={clsx("flex rounded-[1px] h-1 w-full bg-current transform transition duration-500 ease-in-out",
            open ? "" : "")} />
          <span aria-hidden="true" className={clsx("flex rounded-[1px] h-1 w-full bg-current transform transition duration-200 ease-in-out",
            open && "")} />
          <span aria-hidden="true" className={clsx("flex rounded-[1px] h-1 w-full bg-current transform transition duration-500 ease-in-out",
            open ? "" : "")} />
        </div>

        <div className={clsx("w-full fixed left-0 top-0 h-svh bg-opacity-75 bg-black overflow-hidden",
          "transition-opacity duration-300",
          open ? "opacity-75" : "opacity-0 pointer-events-none ")}
          onClick={() => setOpen(false)}
        />

        <div className={clsx("transition-all ease-in-out duration-300", !open && "translate-x-[100%]",
          'md:hidden fixed z-10 top-0 right-0 h-svh w-3/4 bg-accent-darker px-2 py-4 lg:px-8 lg:py-8 text-white',
          "flex flex-col items-center pt-44 sm:pt-64 gap-10 overflow-hidden"
        )}
        >

          <Image src="/Canopy.svg" alt="" className="w-full absolute top-0" width={24} height={24} />

          <div className={clsx("absolute top-32 sm:top-48 sm:right-12 right-8 z-20 flex flex-col gap-1 w-6 transform",)} onClick={() => setOpen(!open)}>
            <span aria-hidden="true" className={clsx("flex rounded-[1px] h-1 w-full bg-current transform transition duration-500 ease-in-out",
              "rotate-45 translate-y-2 text-white")} />
            <span aria-hidden="true" className={clsx("flex rounded-[1px] h-1 w-full bg-current transform transition duration-200 ease-in-out",
              "opacity-0 text-white")} />
            <span aria-hidden="true" className={clsx("flex rounded-[1px] h-1 w-full bg-current transform transition duration-500 ease-in-out",
              "-rotate-45 -translate-y-2 text-white")} />
          </div>

          {navLinks.map((item, i) => (
            <Link key={i}
              className="group font-lato font-bold font-title transition duration-300 text-5xl"
              onClick={() => setOpen(false)}
              href={item.url}
            >
              {item.title}
              <span className={clsx("block h-2 w-0 mx-auto opacity-0 bg-accent top-2 relative",
                "transition-opacity duration-200 group-hover:opacity-100 group-hover:w-2 rounded-full",
                pathname === item.url && "w-2 opacity-100"
              )}
              />
            </Link>
          ))}
        </div>

      </div>
    </header>
  );
}
