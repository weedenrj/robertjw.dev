import React from "react"
import clsx from "clsx"
import Title from "components/common/Title"
import Image from "next/image"
import Text from "components/common/Text"
import Hours from "./Hours"
import GetDirectionsButton from "components/common/GetDirectionsButton"
import { HomeQuery } from "tina/__generated__/types"
import { TinaResponse } from "constants/types"

export type HeroProps = {
  context: TinaResponse<HomeQuery>
} & React.HTMLAttributes<HTMLDivElement>

export default function Hero({
  context,

  className,
  ...rest
}: HeroProps) {

  return (
    <div
      className={clsx(
        className,
        `relative flex h-full min-h-svh w-full flex-col items-center justify-center
          text-white`,
        "gap-4 p-2 lg:px-[5%] xl:gap-6 xl:px-[15%] 2xl:px-[20%]",
        "bg-heroMobile bg-cover bg-center lg:bg-heroDesktop",
      )}
      {...rest}
    >
      <div className="flex flex-col gap-2 xl:gap-6 xl:self-start">
        <Title
          className={clsx(
            `text-title text-center font-bold leading-snug md:leading-[64px]
              xl:text-left xl:leading-[80px]`,
            "text-3xl xs:text-4xl md:text-5xl xl:text-6xl xl:first-letter:-ml-5",
          )}
        >
          &quot;A must stop
          <br /> when in Madison&quot;!
        </Title>
        <div className="flex items-center justify-center gap-4 xl:justify-start">
          <Image
            alt="The Red Shed Logo"
            src="/profile-5.png"
            className="cursor-pointer"
            width={40}
            height={40}
          />
          <Text className="text-lg font-medium">Dan Hughes</Text>
        </div>
      </div>

      <GetDirectionsButton
        size="lg"
        className="hidden sm:flex xl:self-start"
      />

      <Hours className="absolute bottom-0" context={context} />
    </div>
  )
}
