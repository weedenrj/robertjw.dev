import React from "react";
import clsx from "clsx";
import Title from "../common/Title";
import Image from "next/image";

import Link from "next/link";

export type LocationProps = {
} & React.HTMLAttributes<HTMLDivElement>

export default function Location({

  className,
  ...rest
}: LocationProps) {

  return (
    <div className={clsx(className, "flex flex-col items-center justify-start w-full",
      "gap-4 py-20 lg:py-24 pb-8 px-8",
      "bg-white border-y-2 border-yellow border-opacity-20"
    )}
      {...rest}
    >
      <Title className="text-6xl lg:text-7xl">
        Location
      </Title>
      <h2 className="text-center font-lato text-base lg:text-lg md:max-w-[500px]">
        Located in south central Wisconsin, Brodhead Airport (C37) is the friendly home
        of grassroots aviation. <br /><br /> Take a look at the current weather patterns courtesy of<br />
        <Link
          href="https://www.eaa431.org/weather/"
          target="_blank"
          className="font-title text-3xl text-blue-800 hover:underline"
        >
          EAA Chapter 431
        </Link>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-y-4 lg:gap-8 place-items-center ">
        <Image
          src="/c37.webp" alt="brodhead airport by air"
          className="rounded-xl w-full col-span-3"
          width={1280} height={960}
        />

        <Image
          src="/oldBrodhead.webp" alt="brodhead airport by air"
          className="rounded-xl w-full col-span-4"
          width={960} height={540}
        />
        {/* <iframe
          src="https://www.eaa431.org/weather/"
          loading="lazy"
          className="col-span-2 w-full h-full min-h-[500px] rounded-xl"
        /> */}
      </div>
    </div>
  )
}