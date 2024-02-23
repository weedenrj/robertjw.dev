import React from "react"
import clsx from "clsx"
import Title from "components/common/Title"
import Image from "next/image"
import ENV from "../../constants/env"
import Link from "next/link"
import Text from "components/common/Text"

export type FooterProps = {} & React.HTMLAttributes<HTMLDivElement>


export default function Footer({ className, ...rest }: FooterProps) {
  return (
    <div
      className={clsx(
        className,
        "relative flex w-full flex-col items-center",
        "text-white",
        "gap-12 2xl:gap-8 bg-accent-darker pb-12 2xl:pb-8",
      )}
      {...rest}
    >
      <div className="flex overflow-hidden w-full -space-x-0.5">
        {Array.from(Array(14)).map((_, i) => (
          <Image
            key={i}
            src="/Canopy.svg"
            alt=""
            className={clsx("top-0 w-full brightness-[.8]",
              i % 2 === 1 && "-scale-x-100 ")}
            width={24}
            height={48}
          />
        ))}
      </div>

      <div className="flex flex-col w-full sm:flex-row items-center sm:justify-between gap-12 px-10 md:px-20">
        <Link href="#hero" className="transition-transform hover:scale-102 active:animate-pop">
          <Image
            alt="The Red Shed Logo"
            src="/RedShedLogoFacelift.webp"
            className={clsx(
              "relative cursor-pointer max-w-[247px]",
            )}
            width={247}
            height={32}
          />
        </Link>

        <Text className="text-xs">©2024 The Red Shed. All rights reserved.</Text>
      </div>

    </div>
  )
}
