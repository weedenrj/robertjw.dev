'use client'

import React from "react"
import clsx from "clsx"
import Title from "components/common/Title"
import Image from "next/image"
import Text from "components/common/Text"
import GetDirectionsButton from "components/common/GetDirectionsButton"
import GoogleMapView from "components/common/GoogleMapView"
import { HomeQuery } from "tina/__generated__/types"
import { TinaResponse } from "constants/types"
import { useTina, tinaField } from "tinacms/dist/react"

export type LocationProps = {
  context: TinaResponse<HomeQuery>
} & React.HTMLAttributes<HTMLDivElement>

export default function Location({
  context,

  className,
  ...rest
}: LocationProps) {
  const { data } = useTina({
    query: context.query,
    variables: context.variables,
    data: context.data,
  })

  const hours = data.home.hours || []

  return (
    <div
      className={clsx(
        className,
        "relative flex w-full flex-col justify-center md:flex-row bg-[#131111] lg:items-center",
      )}
      {...rest}
    >
      <div
        className={clsx(
          'flex  w-full flex-col text-white md:h-[572px]',
          'md:w-1/2 lg:w-[40%] md:justify-center',
          "gap-6 p-6 2xl:pl-[12%]",
          `bg-norepeat`,
        )}
      >

        <div className="relative flex flex-col items-center sm:items-start ">
          <Title className="text-4xl uppercase xs:text-5xl lg:text-6xl">
            Where To Find Us
          </Title>

          <Image
            src="/Embellishment.svg"
            className="mt-2 w-[156px]"
            alt=""
            width={24}
            height={24}
            loading="eager"
          />
        </div>

        {/* Location */}
        <div className="flex gap-2 sm:text-lg">
          <Image
            src="/icons/Location.svg"
            alt="calendar"
            className="text-white size-6 lg:size-8"
            width={24}
            height={24}
          />
          <Text className="lg:font-normal">
            <span className="font-semibold">
              New Location
              <br />
            </span>
            <span className="font-light text-white text-opacity-60" data-tina-field={tinaField(data.home, "location")}>
              {data.home.location}
            </span>
          </Text>
        </div>

        {/* Hours */}
        <div className="flex flex-col gap-2 lg:gap-0 sm:text-lg">
          <div className="flex gap-2">
            <Image
              src="/icons/Calendar.svg"
              alt="calendar"
              className="text-white size-6 lg:size-8"
              width={24}
              height={24}
            />
            <Text className="w-full font-semibold">
              Working Hours
            </Text>
          </div>

          <div className="flex gap-2 font-light text-white lg:gap-4 text-opacity-60">
            <div className="w-6 h-6 shrink-0" />
            <Text className="w-full whitespace-pre-wrap"
              data-tina-field={hours[0] && tinaField(hours[0], "text")}
            >
              {hours?.[0]?.text}
            </Text>
          </div>

          {hours?.slice(1)?.filter(Boolean).map(hour => (
            <div className="flex gap-2 font-light text-white lex lg:gap-4 text-opacity-60" key={hour?.text}>
              <div className="w-6 h-6 shrink-0" />
              <Text className="w-full whitespace-pre-wrap"
                data-tina-field={hour && tinaField(hour, "text")}
              >
                {hour?.text}
              </Text>
            </div>
          ))}
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2 lg:items-start sm:text-lg">
          <Image
            src="/icons/Phone.svg"
            alt="calendar"
            className="size-6 text-accent-light lg:size-8"
            width={24}
            height={24}
          />
          <Text className="lg:font-normal">
            <span className="font-semibold">
              Phone
              <br />
            </span>
            <span className="font-light text-white text-opacity-60" data-tina-field={tinaField(data.home, "phone")}>
              {data.home.phone}
            </span>
          </Text>
        </div>
        <GetDirectionsButton size="sm" className="mx-auto w-fit md:mx-0" />
      </div>

      <div className="md:flex-1">
        <GoogleMapView />
      </div>
    </div>
  )
}
