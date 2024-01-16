import React from "react"
import clsx from "clsx"
import Image from "next/image"
import Text from "@components/common/Text"
import type { Review } from "../constants/types"

export type ReviewsProps = {
  review: Review
} & React.HTMLAttributes<HTMLDivElement>

export default function ReviewBubble({ review, className, ...rest }: ReviewsProps) {
  return (
    <div className={clsx("flex flex-col justify-center items-center w-full")} {...rest}>
      <div className={clsx("flex flex-col justify-center items-center w-full")}>
        <div className="relative flex justify-center items-center w-[260px] xs:w-[352px] h-[143px]">
          <Image
            src="/Baloon.svg"
            className="absolute top-0 z-0 w-full"
            alt=""
            width={24}
            height={24}
            loading="eager"
          />
          <Text className={clsx("text-black relative z-10",
            "pb-14 px-1 xs:pb-6 xs:px-4 text-base xs:text-lg text-center font-bold"
          )}>
            {review.text}
          </Text>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Image
            src={review.profilePic}
            className="size-[60px]"
            alt=""
            width={60}
            height={60}
            loading="eager"
          />
          <Text className="text-white text-lg font-bold">
            {review.name}
          </Text>
        </div>
      </div>
    </div>
  )
}
