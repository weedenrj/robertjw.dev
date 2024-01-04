import React from "react";
import clsx from "clsx";
import Button from "../common/Button";
import Link from "next/link";
import Title from "@components/common/Title";
import Image from "next/image";
import Text from "@components/common/Text";

// TODO: Build carousel and add more specialties
const specialities = [
  {
    title: "Long Island Iced Tea",
    text: '”The real thing”, a massive 32 oz. mix of heaven, served in the iconic Ball mason jar and topped with a lemon slice, all for the cheap price of $9.',
    smallImg: "/LIT_Stock.png",
    bigImg: "/LIT_Stock_Big.png"
  }
]

// TODO: Build carousel and add more specialties
export type SpecialtiesProps = {
} & React.HTMLAttributes<HTMLDivElement>

export default function Specialties({

  className,
  ...rest
}: SpecialtiesProps) {
  return (
    <div className={clsx(className,
      "relative flex flex-col lg:flex-row-reverse justify-center w-full h-full",
      "gap-12  lg:px-[5%] xl:px-[15%] 2xl:px-[20%]",
      "bg-black text-white"
    )}
      {...rest}
    >
      <div className="flex flex-col gap-3">
        <Title className="uppercase text-4xl xs:text-5xl lg:text-6xl text-center">Our Specialties</Title>
        <Image
          src="/Embellishment.svg"
          className="w-[156px] xs:w-[200px] mx-auto"
          alt=""
          width={24}
          height={24} />
      </div>

      {specialities.map(({ title, text, smallImg, bigImg }, i) => (
        <div
          key={i}
          className="flex flex-col bg-cover bg-center bg-norepeat"
          style={{ backgroundImage: `url('${bigImg}')` }}
        >
          <div className="" />

          <div className="flex flex-col gap-6 px-6">
            <Title className="capitalize text-xl xs:text-2xl ">
              {title}
            </Title>

            <Text className="text-base text-white text-opacity-70 font-thin">
              {text}
            </Text>
          </div>

          <Image
            src={smallImg}
            className="w-full mx-auto sm:hidden"
            alt=""
            width={375}
            height={268} />

          <Link href="/menu" className="self-center">
            <Button size='lg' color="black" >
              Check our menu
            </Button>
          </Link>
        </div>
      ))}
    </div>
  )
}
