import React from "react";
import clsx from "clsx";
import Button from "../common/Button";
import { navLinks } from "../common/Navbar";
import Link from "next/link";
import Title from "@components/common/Title";
import Image from "next/image";
import Text from "@components/common/Text";
import UseDirections from "@hooks/UseDirections";


export type HoursProps = {
} & React.HTMLAttributes<HTMLDivElement>

export default function Hours({

  className,
  ...rest
}: HoursProps) {
  const { getLocation } = UseDirections()
  
  return (
    <div className={clsx(className,
      "overflow-visible flex w-full justify-center items-center text-white",
      "gap-4 xs:gap-6 py-6 px-4 xs:p-6",
      "bg-accent-darker text-xs sm:text-base font-semibold text-balance"

    )}
      {...rest}
    >

      <Button className="absolute -top-8 sm:hidden" size='sm' onClick={() => getLocation(true)}>
        <Image src="/icons/Location.svg" alt="calendar" className="text-white" width={24} height={24} />
        Get directions
      </Button>

      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Image src="/icons/Calendar.svg" alt="calendar" className="text-white" width={24} height={24} />
          <Text >Thursday 5pm - 10pm</Text>
        </div>
        <div className="flex gap-2">
          <div className="w-6 h-6 shrink-0" />
          <Text >Friday, Saturday 5pm - 2am</Text>
        </div>
      </div>

      <div className="w-px self-stretch bg-white bg-opacity-25 " />

      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Image src="/icons/Location.svg" alt="calendar" className="text-white" width={24} height={24} />
          <Text >508 State St, Madison WI 53703</Text>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/icons/Phone.svg" alt="calendar" className="text-white" width={24} height={24} />
          <Text>+1 999 (999) 9999</Text>
        </div>
      </div>

    </div>
  )
}
