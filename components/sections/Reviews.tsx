'use client'

import React, { useState } from "react"
import clsx from "clsx"
import Title from "components/common/Title"
import Image from "next/image"
import Text from "components/common/Text"
import ENV from "../../constants/env"
import useInterval from "hooks/UseInterval"
import ms from 'ms'
import { getCircularIndex } from "../../utils/collection"
import ReviewBubble from "components/ReviewBubble"
import { HomeQuery } from "tina/__generated__/types"
import { TinaResponse } from "constants/types"

const reviews = Object.values(ENV.reviews)

export type ReviewsProps = {
  context: TinaResponse<HomeQuery>
} & React.HTMLAttributes<HTMLDivElement>

export default function Reviews({
  context,

  className,
  ...rest
}: ReviewsProps) {
  const [selectedReviews, setSelectedReviews] = useState([0, 1, 2])

  useInterval(() => {
    const activeMiddle = reviews.findIndex(rev => reviews[selectedReviews[1]].name === rev.name)
    const newMiddle = getCircularIndex(reviews, activeMiddle, "right")
    const indexToRight = getCircularIndex(reviews, newMiddle, "right")
    const indexToLeft = getCircularIndex(reviews, newMiddle, "left")
    setSelectedReviews([indexToLeft, newMiddle, indexToRight])
  }, ms("4s"), [])

  return (
    <div
      className={clsx(
        className,
        "relative flex w-full flex-col items-center",
        "text-white md:h-[572px]",
        "gap-12 p-6",
      )}
      {...rest}
    >

      <div className="relative flex flex-col items-center sm:items-start ">
        <Title className="text-4xl text-center uppercase xs:text-5xl lg:text-6xl">
          A word from <br className="lg:hidden" /> our customers
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

      <div className="relative w-full h-[270px] flex">
        {reviews.map((review, i) => {
          const isLeft = selectedReviews.findIndex(num => num === i) === 0
          const isMiddle = selectedReviews.findIndex(num => num === i) === 1
          const isRight = selectedReviews.findIndex(num => num === i) === 2
          const nextUp = getCircularIndex(reviews, selectedReviews[2], "right")
          const isVisible = isLeft || isMiddle || isRight
          return (
            <div
              key={review.name}
              className={clsx("absolute flex flex-col justify-center items-center w-full",
                "transition-all duration-500",
                nextUp === i ? "opacity-0 translate-x-full"
                  : !isVisible ? "opacity-0 -translate-x-full"
                    : isRight ? "opacity-0 sm:opacity-100 translate-x-96"
                      : isMiddle ? "opacity-100 translate-x-0"
                        : isLeft ? "opacity-0 sm:opacity-100 -translate-x-96"
                          : "opacity-100 translate-x-0",
              )}
            >
              <ReviewBubble review={review} />
            </div>
          )
        })}
      </div>

      <div className="flex gap-2">
        {reviews.map((r, i) => {
          const isLeft = selectedReviews.findIndex(num => num === i) === 0
          const isMiddle = selectedReviews.findIndex(num => num === i) === 1
          const isRight = selectedReviews.findIndex(num => num === i) === 2
          const isVisible = isLeft || isMiddle || isRight
          return (
            <div key={r.name} className={clsx("size-2 rounded-full border-2",
              "transition-all duration-500 border-white border-opacity-50",
              isVisible ? "sm:bg-white border-opacity-50 border-white" : "bg-transparent border-white border-opacity-50",
              isMiddle && "bg-white"
            )} />
          )
        })}
      </div>
    </div>
  )
}
