import React from "react"
import clsx from "clsx"
import Image from "next/image"
import Text from "@components/common/Text"
import GetDirectionsButton from "@components/common/GetDirectionsButton"

export type HoursProps = {} & React.HTMLAttributes<HTMLDivElement>

export default function Hours({ className, ...rest }: HoursProps) {
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

      <GetDirectionsButton size="sm" className="absolute -top-8 sm:hidden" />

      <div className="flex flex-col gap-4 lg:gap-0">
        <div className="flex gap-2">
          <Image
            src="/icons/Calendar.svg"
            alt="calendar"
            className="size-6 text-white lg:size-8"
            width={24}
            height={24}
          />
          <Text className="w-full">
            Thursday <span className="lg:ml-10">5pm - 10pm</span>
          </Text>
        </div>
        <div className="flex gap-2 lg:gap-4">
          <div className="h-6 w-6 shrink-0" />
          <Text>Friday, Saturday 5pm - 2am</Text>
        </div>
      </div>

      <div className="w-px self-stretch bg-white bg-opacity-25" />

      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
        <div className="flex gap-2">
          <Image
            src="/icons/Location.svg"
            alt="calendar"
            className="size-6 text-white lg:size-8"
            width={24}
            height={24}
          />
          <Text className="lg:font-normal">
            <span className="hidden font-semibold lg:block">
              New Location
              <br />
            </span>
            508 State St, Madison WI 53703
          </Text>
        </div>

        <div className="hidden h-14 w-px self-stretch bg-white bg-opacity-25 lg:flex" />

        <div className="flex items-center gap-2 lg:items-start">
          <Image
            src="/icons/Phone.svg"
            alt="calendar"
            className="size-6 text-white lg:size-8"
            width={24}
            height={24}
          />
          <Text className="lg:font-normal">
            <span className="hidden font-semibold lg:block">
              Phone
              <br />
            </span>
            608 (999) 9999
          </Text>
        </div>
      </div>
    </div>
  )
}
