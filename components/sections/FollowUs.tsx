import React, { useState } from "react"
import clsx from "clsx"
import Title from "@components/common/Title"
import Image from "next/image"
import Text from "@components/common/Text"
import ENV from "../../constants/env"
import useInterval from "@hooks/UseInterval"
import ms from 'ms'
import { getCircularIndex } from "../../utils/collection"
import ReviewBubble from "@components/ReviewBubble"


export type FollowUsProps = {} & React.HTMLAttributes<HTMLDivElement>

export default function FollowUs({ className, ...rest }: FollowUsProps) {
  return (
    <div
      className={clsx(
        className,
        "relative flex w-full flex-col items-center",
        "text-white md:h-[572px]",
        "gap-12 p-6 2xl:pl-[12%]",
      )}
      {...rest}
    >

      <div className="relative flex flex-col items-center sm:items-start ">
        <Title className="text-4xl uppercase xs:text-5xl lg:text-6xl text-center">
          Follow us
        </Title>

        <Image
          src="/Embellishment.svg"
          className="mt-2 w-[156px] mx-auto"
          alt=""
          width={24}
          height={24}
          loading="eager"
        />
      </div>


    </div>
  )
}
