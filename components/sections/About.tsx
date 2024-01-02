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
      "relative flex flex-col lg:flex-row-reverse justify-center w-full"
    )}
      {...rest}
    >
      <div className={clsx("relative flex flex-col justify-center h-[570px] lg:h-[656px] xl:h-[800px] w-full text-white",
        "gap-6 px-6 lg:px-[5%] xl:px-[15%] 2xl:px-[20%]",
        "bg-about bg-center bg-cover bg-norepeat bg-blend-color bg-[#131111] bg-opacity-30"
      )}>
        <div className="flex flex-col gap-2">
          <Title className="text-accent-light text-lg lg:text-xl font-semibold">Over 50 years of memories</Title>
          <Title className="uppercase text-4xl xs:text-5xl lg:text-6xl">About the Shed</Title>
        </div>

        <Image
          src="/LIT_stamp.svg"
          className={clsx("hidden xs:block size-36 lg:size-52 2xl:size-[360px]",
            "absolute -right-4 lg:-right-12 top-6 lg:top-10 opacity-50 brightness-75")}
          alt=""
          width={144}
          height={144} />

        <Image
          src="/Embellishment.svg"
          className="w-[156px]"
          alt=""
          width={24}
          height={24} />

        <Text className="lg:text-lg">
          Five generations, thousands of beers served and countless good moments. Open since 1969, the Red Shed is one of the oldest and best bars in Madison, faithfully serving as the go-to establishment for Badger fans, students 21 and older, and the greater Madison area.
          <br /><br />
          Known for the amazing service, the always ice cold beers and the best Long Island Iced Tea ever, the Red Shed is a must stop when in Madison!
        </Text>

      </div>

      <Image
        src="/building.webp"
        className="w-full lg:max-w-[600px] xl:max-w-[800px] object-cover"
        alt=""
        width={800}
        height={800} />
    </div>
  )
}
