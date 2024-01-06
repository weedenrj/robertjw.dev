'use client'

import UseDirections from "@hooks/UseDirections"
import clsx from "clsx"
import Image from "next/image"
import React from "react"
import Button, { ButtonProps } from "./Button"

export type GetDirectionsButtonProps = {} & ButtonProps

export default function GetDirectionsButton({
  className,
  ...rest
}: GetDirectionsButtonProps) {
  const { getLocation } = UseDirections()

  return (
    <Button
      className={clsx(className)}
      onClick={() => getLocation(true)}
      {...rest}
    >
      <Image
        src="/icons/Location.svg"
        alt="calendar"
        className="size-6 text-white"
        width={24}
        height={24}
      />
      Get directions
    </Button>
  )
}
