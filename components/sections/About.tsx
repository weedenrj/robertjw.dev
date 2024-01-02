import React from "react";
import clsx from "clsx";
import Button from "../common/Button";
import Link from "next/link";
import Title from "@components/common/Title";
import Image from "next/image";
import Text from "@components/common/Text";

export type HeroProps = {
} & React.HTMLAttributes<HTMLDivElement>

export default function About({

  className,
  ...rest
}: HeroProps) {

  return (
    <div className={clsx(className,
      "relative flex flex-col md:flex-row-reverse justify-center w-full"
    )}
      {...rest}
    >
      <div className={clsx("relative flex flex-col justify-center h-124 w-full text-white",
        "gap-6 px-6 lg:px-[5%] xl:px-[15%] 2xl:px-[20%]",
        "bg-about bg-center bg-cover bg-norepeat bg-blend-color bg-[#131111] bg-opacity-30"
      )}>
        {/* <div className="w-full h-full bg-black absolute top-0 left-0 bg-opacity-15" /> */}
        <div className="flex flex-col gap-2">
          <Title className="text-accent-light text-lg font-semibold">Over 50 years of memories</Title>
          <Title className="uppercase text-4xl">About the Shed</Title>
        </div>

        <Image
          src="/LIT_stamp.svg"
          className="hidden xs:block w-36 absolute -right-4 top-6 opacity-50 brightness-75"
          alt=""
          width={144}
          height={144} />

        <Image
          src="/Embellishment.svg"
          className="w-[156px]"
          alt=""
          width={24}
          height={24} />

        <Text>
          Five generations, thousands of beers served and countless good moments. Open since 1969, the Red Shed is one of the oldest and best bars in Madison, faithfully serving as the go-to establishment for Badger fans, students 21 and older, and the greater Madison area.
          <br /><br />
          Known for the amazing service, the always ice cold beers and the best Long Island Iced Tea ever, the Red Shed is a must stop when in Madison!
        </Text>

      </div>

      <Image
        src="/building.webp"
        className="w-full"
        alt=""
        width={375}
        height={375} />
    </div>
  )
}
