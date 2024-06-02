'use client'

import React from "react"
import clsx from "clsx"
import Image from "next/image"
import Text from "components/common/Text"
import GetDirectionsButton from "components/common/GetDirectionsButton"
import { HomeQuery } from "tina/__generated__/types"
import { TinaResponse } from "constants/types"
import { tinaField, useTina } from "tinacms/dist/react"

export type HoursProps = {
  context: TinaResponse<HomeQuery>
} & React.HTMLAttributes<HTMLDivElement>

export default function Hours({
  context,

  className,
  ...rest
}: HoursProps) {
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
        "flex w-full items-center justify-center overflow-visible text-white",
        "gap-4 px-4 py-6 xs:gap-6 xs:p-6",
        `text-balance bg-accent-darker text-xxs font-semibold xs:text-xs
          sm:text-base`,
      )}
      {...rest}
    >
      <GetDirectionsButton
        size="sm"
        className="absolute -top-8 sm:hidden"
      />

      <div className="flex flex-col gap-4 lg:gap-0">
        <div className="flex gap-2">
          <Image
            src="/icons/Calendar.svg"
            alt="calendar"
            className="text-white size-6 lg:size-8"
            width={24}
            height={24}
          />
          <Text className="w-full whitespace-pre-wrap"
            data-tina-field={hours[0] && tinaField(hours[0], "text")}
          >
            {hours?.[0]?.text}
          </Text>
        </div>

        {hours?.slice(1)?.filter(Boolean).map(hour => (
          <div className="flex gap-2 lg:gap-4" key={hour?.text}>
            <div className="w-6 h-6 shrink-0" />
            <Text className="whitespace-pre-wrap"
              data-tina-field={hour && tinaField(hour, "text")}
            >
              {hour?.text}
            </Text>
          </div>
        ))}
      </div>

      <div className="self-stretch w-px bg-white bg-opacity-25" />

      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
        <div className="flex gap-2">
          <Image
            src="/icons/Location.svg"
            alt="calendar"
            className="text-white size-6 lg:size-8"
            width={24}
            height={24}
          />
          <Text className="lg:font-normal" data-tina-field={tinaField(data.home, "location")}>
            <span className="hidden font-semibold lg:block">
              New Location
              <br />
            </span>
            {data.home.location}
          </Text>
        </div>

        <div className="self-stretch hidden w-px bg-white bg-opacity-25 h-14 lg:flex" />

        <div className="flex items-center gap-2 lg:items-start">
          <Image
            src="/icons/Phone.svg"
            alt="calendar"
            className="text-white size-6 lg:size-8"
            width={24}
            height={24}
          />
          <Text className="lg:font-normal" data-tina-field={tinaField(data.home, "phone")}>
            <span className="hidden font-semibold lg:block">
              Phone
              <br />
            </span>
            {data.home.phone}
          </Text>
        </div>
      </div>
    </div>
  )
}
