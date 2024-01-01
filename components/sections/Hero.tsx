import React from "react";
import clsx from "clsx";
import Button from "../common/Button";
import { navLinks } from "../common/Navbar";
import Link from "next/link";
import Title from "@components/common/Title";
import Image from "next/image";
import Text from "@components/common/Text";
import Hours from "./Hours";
import UseDirections from "@hooks/UseDirections";

export type HeroProps = {
} & React.HTMLAttributes<HTMLDivElement>

export default function Hero({

  className,
  ...rest
}: HeroProps) {
  const { getLocation } = UseDirections()

  return (
    <div className={clsx(className,
      "relative flex flex-col h-full w-full justify-center items-center text-white",
      "gap-4 p-2 md:px-12",
      "bg-hero bg-center bg-cover"
    )}
      {...rest}
    >

      <div className='flex flex-col gap-2'>
        <Title className='text-title text-3xl xs:text-4xl text-center font-bold leading-snug'>&quot;A must stop<br /> when in Madison&quot;!</Title>
        <div className='flex justify-center items-center gap-4'>
          <Image
            alt="The Red Shed Logo"
            src="/pngs/profile-pic-1.png"
            className="cursor-pointer "
            width={40}
            height={40}
          />
          <Text className='text-lg font-medium'>David Haldane</Text>
        </div>
      </div>

      <Button size='lg' className="hidden sm:flex" onClick={() => getLocation(true)}>
        <Image src="/icons/Location.svg" alt="calendar" className="text-white" width={24} height={24} />
        Get directions
      </Button>

      <Hours className="absolute bottom-0" />
    </div>
  )
}
