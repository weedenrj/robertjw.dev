import React from "react"
import clsx from "clsx"
import Title from "@components/common/Title"
import Image from "next/image"
import ENV from "../../constants/env"
import Link from "next/link"

export type FollowUsProps = {} & React.HTMLAttributes<HTMLDivElement>

const images = [
  "/AtNight.webp", "/TopGun.webp", "/Booths.webp", "/JeffAndFriend.webp",
  "/JoelAndFriend.webp", "/Long-island-2.webp", "/BrightLights.webp", "/LITBartop.webp"
]

export default function FollowUs({ className, ...rest }: FollowUsProps) {
  return (
    <div
      className={clsx(
        className,
        "relative flex w-full flex-col items-center",
        "text-white ",
        "gap-6 p-6 pb-40",
      )}
      {...rest}
    >

      <div className="relative flex flex-col items-center sm:items-start ">
        <Title className="text-4xl uppercase xs:text-5xl lg:text-6xl text-center">
          Follow us
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

      <div className="flex justify-center gap-12">
        {Object.entries(ENV.socials).map(([socialKey, socialLink], i) => (
          <Link href={socialLink} key={i} className=" transition-transform hover:scale-110 active:animate-pop">
            <Image
              src={`/icons/${socialKey}.svg`}
              alt={socialKey}
              width={32}
              height={32}
            />
          </Link>
        ))}
      </div>

      <div className={clsx("flex sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:grid-rows-2 gap-2",
        "overflow-auto sm:overflow-hidden"
      )}>
        {images.map((img, i) => (
          <Image
            key={i}
            src={img}
            className="size-64 sm:size-72  2xl:size-[400px] object-cover"
            alt=""
            width={400}
            height={400}
          />
        ))}
      </div>


    </div>
  )
}
