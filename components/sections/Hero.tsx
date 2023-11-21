import React from "react";
import clsx from "clsx";
import Button from "../common/Button";
import { navLinks } from "../common/Navbar";
import Link from "next/link";

export type HeroProps = {
} & React.HTMLAttributes<HTMLDivElement>

export default function Hero({

  className,
  ...rest
}: HeroProps) {
  return (
    <div className={clsx(className, "flex flex-col items-center lg:justify-center",
      "w-full h-full min-h-screen md:min-h-none lg:max-h-[75%]",
      "gap-12 pt-[33%] lg:pt-0 px-8",
    )}
      {...rest}
    >
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-white text-center font-title text-6xl lg:text-7xl text-shadow-black-border-bottom">
          Airplane Restoration Done Right.
        </h1>
        <h2 className="text-white text-center font-lato text-xl lg:text-2xl">
          Antique restoration, fabric recovering & maintenance
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
        {navLinks.map((link, i) => (
          <Link key={i} href={link.url} target={link.blank ? "_blank" : undefined}>
            <Button>
              {link.title}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}
