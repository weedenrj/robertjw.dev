'use client'

import Slider from "react-slick";
import { Clients, ClientsQuery } from "tina/__generated__/types";
import clsx from "clsx";
import Image from "next/image";
import { TinaResponse } from "constants/types";
import useInterval from "hooks/UseInterval";
import ms from "ms";
import { useState } from "react";
import { getCircularIndex } from "utils/collection";

export type MainCarouselProps = {
  clients: TinaResponse<ClientsQuery>["data"]["clients"]["clientImg"]
} & React.HTMLAttributes<HTMLDivElement>

export function MainCarousel({
  clients,

  className,
  ...rest
}: MainCarouselProps) {
  const [selectedReviews, setSelectedReviews] = useState([0, 1, 2])

  useInterval(() => {
    const activeMiddle = clients.findIndex(rev => clients[selectedReviews[1]] === rev)
    const newMiddle = getCircularIndex(clients, activeMiddle, "right")
    const indexToRight = getCircularIndex(clients, newMiddle, "right")
    const indexToLeft = getCircularIndex(clients, newMiddle, "left")
    setSelectedReviews([indexToLeft, newMiddle, indexToRight])
  }, ms("2s"), [])

  return (
    <div className={clsx(className, "flex items-center relative w-full h-[270px]")}{...rest}>
      {clients.map((img, i) => {
        const isLeft = selectedReviews.findIndex(num => num === i) === 0
        const isMiddle = selectedReviews.findIndex(num => num === i) === 1
        const isRight = selectedReviews.findIndex(num => num === i) === 2
        const nextUp = getCircularIndex(clients, selectedReviews[2], "right")
        const isVisible = isLeft || isMiddle || isRight
        return (
          <div
            key={img}
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
            <Image
              key={img}
              width={250}
              height={250}
              src={img}
              alt="brand icon"
            />
          </div>

        )
      })}

      <div
        className="absolute z-10 w-12 h-full pointer-events-none -left-2 md:w-24 bg-gradient-fade-black-left"
        onContextMenu={(e) => e.preventDefault()}
      />
      <div
        className="absolute z-10 w-12 h-full pointer-events-none -right-2 md:w-24 bg-gradient-fade-black-right"
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
};

export default MainCarousel;
