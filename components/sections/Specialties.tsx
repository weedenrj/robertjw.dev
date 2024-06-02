'use client'

import React, { useEffect, useState } from "react"
import clsx from "clsx"
import Button from "../common/Button"
import Link from "next/link"
import Title from "components/common/Title"
import Image from "next/image"
import Text from "components/common/Text"
import useWindowDimensions from "hooks/UseWindowDimensions"
import ENV from "../../constants/env"
import { getCircularIndex } from "../../utils/collection"
import { mkNavLink } from "components/common/Navbar"
import { HomeQuery } from "tina/__generated__/types"
import { TinaResponse } from "constants/types"

const SpecialtiesArray = Object.values(ENV.ourSpecialties)

// TODO: Build carousel and add more specialties
export type SpecialtiesProps = {
  context: TinaResponse<HomeQuery>
} & React.HTMLAttributes<HTMLDivElement>

export default function Specialties({
  context,

  className,
  ...rest
}: SpecialtiesProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState(SpecialtiesArray[0])
  const { width } = useWindowDimensions()

  const style = width >= 640
    ? { backgroundImage: `url(${selectedSpecialty.bigImg})` }
    : undefined

  return (
    <div
      className={clsx(
        className,
        `relative flex w-full flex-col justify-center sm:justify-start 2xl:mx-auto
          h-[570px] sm:h-[400px] lg:h-[656px] xl:h-[700px] 2xl:h-[800px] 2xl:max-w-[2000px]`,
        "gap-12",
        "bg-black text-white",
        "bg-cover bg-center bg-norepeat bg-none "
      )}
      style={style}
      {...rest}
    >
      <div className="flex flex-col gap-3">
        <Title className="text-4xl text-center uppercase xs:text-5xl lg:text-6xl">
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

      {/* Fades */}
      <div className="absolute top-0 left-0 z-10 w-1/2 h-full pointer-events-none 2xl:bg-fade-left" />
      <div className="absolute top-0 right-0 z-10 w-1/2 h-full pointer-events-none 2xl:bg-fade-right" />

      {SpecialtiesArray.map(({ id, title, text, smallImg, bigImg }, i) => (
        <div key={id} className={clsx("relative flex flex-col sm:flex-row",
          selectedSpecialty.id === id ? "flex" : "hidden",
        )} >

          {/* Caurousel Controls */}
          {SpecialtiesArray.length > 1 && (
            <>
              <Image
                src="/icons/Arrow.svg"
                alt="arrow"
                width={70}
                height={24}
                className="absolute z-20 xl:w-[70px] w-12 h-full left-[5%] top-0"
                onClick={() => {
                  const newIndex = getCircularIndex(SpecialtiesArray, i, "left")
                  setSelectedSpecialty(SpecialtiesArray[newIndex])
                }}
              />
              <Image
                src="/icons/Arrow.svg"
                alt="arrow"
                width={70}
                height={24}
                className="absolute z-20 xl:w-[70px] w-12 h-full right-[5%] top-0 rotate-180"
                onClick={() => {
                  const newIndex = getCircularIndex(SpecialtiesArray, i, "right")
                  setSelectedSpecialty(SpecialtiesArray[newIndex])
                }}
              />
            </>
          )}

          <div className="w-1/2" />
          <div
            className="z-10 flex  flex-col gap-6 sm:w-1/2 sm:justify-center
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
              className="w-full mx-auto sm:hidden"
              alt=""
              width={375}
              height={268}
            />

            <Link
              href={mkNavLink("/menu")}
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
