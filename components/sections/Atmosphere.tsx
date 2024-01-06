import React from "react"
import clsx from "clsx"
import Button from "../common/Button"
import Link from "next/link"
import Title from "@components/common/Title"
import Image from "next/image"
import Text from "@components/common/Text"

export type AtmosphereProps =
  {} & React.HTMLAttributes<HTMLDivElement>

export default function Atmosphere({
  className,
  ...rest
}: AtmosphereProps) {
  return (
    <div
      className={clsx(
        className,
        "relative flex w-full flex-col gap-24 xs:gap-40 sm:gap-24",
      )}
      {...rest}
    >
      <div
        className={clsx(
          `flex w-full flex-col lg:flex-row justify-center text-white`,
          `gap-6 lg:gap-[72px] px-6 lg:px-[5%] 2xl:px-[15%]`,
          "",
        )}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Title className="text-lg font-semibold text-accent-light lg:text-xl">
              The coziest bar in Madison
            </Title>
            <Title className="text-balance text-3xl capitalize xs:text-4xl lg:text-6xl">
              Great location,
              <br /> inviting atmosphere
            </Title>
          </div>
          <Image
            src="/Embellishment.svg"
            className="w-[156px]"
            alt=""
            width={24}
            height={24}
            loading="eager"
          />
        </div>

        <Text
          className="text-sm xs:text-base font-thin text-white text-opacity-70 sm:text-lg
            lg:max-w-[400px] xl:max-w-[540px]"
        >
          Located at 508 State Street, it&apos;s a short distance from
          the University Campus and within walking distance of Camp
          Randall Stadium, making it perfect for a celebration drink
          and a fun Friday night with your friends.
          <br />
          <br />
          The Shed&apos;s busiest hours are at the end of the week
          leading into the weekend when classes are over and the
          badgers are playing. Apart from the usual crowd, Red Shed
          continues to be a popular destination for sports fans during
          the state tournaments, due to its close proximity to the
          Kohl center.
        </Text>
      </div>

      <div className="flex flex-col sm:flex-row gap-0.5">
        <Image
          src="/pouring_stock.jpeg"
          className="sm:w-1/3"
          alt=""
          width={658}
          height={658}
        />
        <Image
          src="/shed_interior.png"
          className="sm:w-1/3"
          alt=""
          width={658}
          height={658}
        />
        <Image
          src="/people_talking.png"
          className="sm:w-1/3"
          alt=""
          width={658}
          height={658}
        />
      </div>
    </div>
  )
}
