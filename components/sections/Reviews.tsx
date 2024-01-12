'use client'

import React, { useState } from "react"
import clsx from "clsx"
import Title from "@components/common/Title"
import Image from "next/image"
import Text from "@components/common/Text"
import ENV from "../../constants/env"
import useInterval from "@hooks/UseInterval"
import ms from 'ms'
import { getCircularIndex } from "../../utils/collection"
import { Transition } from "@headlessui/react"


const reviews = Object.values(ENV.reviews)

export type ReviewsProps = {} & React.HTMLAttributes<HTMLDivElement>

export default function Reviews({ className, ...rest }: ReviewsProps) {
  const [selectedReviews, setSelectedReviews] = useState([0, 1, 2])

  useInterval(() => {
    const activeMiddle = reviews.findIndex(rev => reviews[selectedReviews[1]].name === rev.name)
    const newMiddle = getCircularIndex(reviews, activeMiddle, "right")
    const indexToRight = getCircularIndex(reviews, newMiddle, "right")
    const indexToLeft = getCircularIndex(reviews, newMiddle, "left")
    setSelectedReviews([indexToLeft, newMiddle, indexToRight])
  }, ms("5s"), [])


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
          A word from <br /> our customers
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

      <div className="relative hidden w-full h-[370px] lg:flex ">
        {reviews.map((review, i) => {
          const isLeft = selectedReviews.findIndex(num => num === i) === 0
          const isMiddle = selectedReviews.findIndex(num => num === i) === 1
          const isRight = selectedReviews.findIndex(num => num === i) === 2
          const nextUp = getCircularIndex(reviews, selectedReviews[2], "right")
          const isVisible = isLeft || isMiddle || isRight
          return (
            <div
              key={i}
              className={clsx("absolute flex flex-col justify-center items-center w-full",
                "transition-all duration-500",
                nextUp === i ? "opacity-0 translate-x-full"
                  : !isVisible ? "opacity-0 -translate-x-full"
                    : isRight ? "opacity-100 translate-x-96"
                      : isMiddle ? "opacity-100 translate-x-0"
                        : isLeft ? "opacity-100 -translate-x-96"
                          : "opacity-100 translate-x-0",
              )}
            >
              <div className={clsx("flex flex-col justify-center items-center w-full")}>
                <div className="relative flex justify-center items-center w-[352px] h-[143px]">
                  <Image
                    src="/Baloon.svg"
                    className="absolute top-0 z-0 w-full"
                    alt=""
                    width={24}
                    height={24}
                    loading="eager"
                  />
                  <Text className="text-black relative z-10 pb-6 px-4 text-lg text-center font-bold">
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
        })}
      </div>

      <div className="relative flex w-full h-[260px] lg:hidden">
        {reviews.map((review, i) => {
          const isMiddle = selectedReviews.findIndex(num => num === i) === 1
          const isVisible = isMiddle
          return (
            <Transition
              key={i}
              show={isVisible}
              appear
              className={clsx("absolute flex flex-col justify-center items-center w-full",
                "transition duration-500",
              )}
              enterFrom="opacity-0 translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leaveFrom="opacity-50 translate-x-0"
              leaveTo="opacity-0 -translate-x-full"
            >
              <div className={clsx("flex flex-col justify-center items-center w-full",
                // selectedReview.name === review.name ? "flex" : "hidden"
              )}>
                <div className="relative flex justify-center items-center w-[352px] h-[143px]">
                  <Image
                    src="/Baloon.svg"
                    className="absolute top-0 z-0 w-full"
                    alt=""
                    width={24}
                    height={24}
                    loading="eager"
                  />
                  <Text className="text-black relative z-10 pb-6 px-4 text-lg text-center font-bold">
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
            </Transition>
          )
        })}
      </div>

      <div className="flex gap-2">
        {reviews.map((review, i) => {
          const isLeft = selectedReviews.findIndex(num => num === i) === 0
          const isMiddle = selectedReviews.findIndex(num => num === i) === 1
          const isRight = selectedReviews.findIndex(num => num === i) === 2
          const isVisible = isLeft || isMiddle || isRight
          return (
            <div key={i} className={clsx("size-2 rounded-full",
              isVisible ? "bg-white" : "border-2 border-white border-opacity-50"
            )} />
          )
        })}
      </div>

    </div>
  )
}
