import React from "react"
import clsx from "clsx"
import Button from "../common/Button"
import Link from "next/link"
import Title from "@components/common/Title"
import Image from "next/image"
import Text from "@components/common/Text"

// TODO: Build carousel and add more specialties
const specialities = [
  {
    title: "Long Island Iced Tea",
    text: "”The real thing”, a massive 32 oz. mix of heaven, served in the iconic Ball mason jar and topped with a lemon slice, all for the cheap price of $9.",
    smallImg: "/LIT_Stock.png",
    bigImg: "/LIT_Stock_Big.png",
  },
]

// TODO: Build carousel and add more specialties
export type SpecialtiesProps =
  {} & React.HTMLAttributes<HTMLDivElement>

export default function Specialties({
  className,
  ...rest
}: SpecialtiesProps) {
  return (
    <div
      className={clsx(
        className,
        `relative flex w-full flex-col justify-center sm:justify-start
          h-[570px] sm:h-[400px] lg:h-[656px] xl:h-[700px] 2xl:h-[800px]`,
        "gap-12",
        "bg-black text-white",
      )}
      {...rest}
    >
      <div className="flex flex-col gap-3">
        <Title className="text-center text-4xl uppercase xs:text-5xl lg:text-6xl">
          Our Specialties
        </Title>
        <Image
          src="/Embellishment.svg"
          className="mx-auto w-[156px] xs:w-[200px]"
          alt=""
          width={24}
          height={24}
          loading="eager"
        />
      </div>

      {specialities.map(({ title, text, smallImg, bigImg }, i) => (
        <div
          key={i}
          className="bg-norepeat flex flex-col bg-cover bg-center sm:flex-row"
        >
          <div className="absolute sm:flex h-full w-full justify-center hidden">
            <div className="z-10 flex-1 2xl:bg-fade-left" />
            <Image
              src={bigImg}
              className="absolute z-0 w-full max-w-[2000px] object-cover object-center"
              alt=""
              width={2000}
              height={2000}
            />
            <div className="z-10 flex-1 2xl:bg-fade-right" />
          </div>

          <div className="w-1/2" />

          <div
            className="z-10 flex max-w-[430px] flex-col gap-6 sm:w-1/2 sm:justify-center
              xl:pt-16 2xl:max-w-[630px]"
          >
            <div className="flex flex-col gap-6 px-6">
              <Title className="text-xl capitalize xs:text-2xl">
                {title}
              </Title>

              <Text className="text-base font-thin text-white text-opacity-70 sm:text-lg">
                {text}
              </Text>
            </div>

            <Image
              src={smallImg}
              className="mx-auto w-full sm:hidden"
              alt=""
              width={375}
              height={268}
            />

            <Link
              href="/menu"
              className="self-center px-6 sm:self-start"
            >
              <Button size="lg" color="black">
                Check our menu
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
