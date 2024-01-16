import React from "react"
import clsx from "clsx"
import Title from "@components/common/Title"
import Image from "next/image"
import Text from "@components/common/Text"

export type AboutProps = {} & React.HTMLAttributes<HTMLDivElement>

export default function About({ className, ...rest }: AboutProps) {
  return (
    <div
      className={clsx(
        className,
        "relative flex w-full flex-col justify-center lg:flex-row-reverse",
      )}
      {...rest}
    >
      <div
        className={clsx(
          `flex h-[570px] w-full flex-col justify-center text-white lg:h-[656px]
            xl:h-[800px]`,
          "gap-6 px-6 lg:px-[5%] xl:px-[15%] 2xl:px-[20%]",
          `bg-norepeat bg-[#131111] bg-opacity-30 bg-about bg-cover bg-center
            bg-blend-color`,
        )}
      >
        <div className="flex flex-col gap-2">
          <Title className="text-lg font-semibold text-accent-light lg:text-xl">
            Over 50 years of memories
          </Title>
          <Title className="text-4xl uppercase xs:text-5xl lg:text-6xl">
            About the Shed
          </Title>
        </div>

        <Image
          src="/LIT_stamp.svg"
          className={clsx(
            "hidden size-36 xs:block lg:size-52 2xl:size-[360px]",
            `absolute -right-4 top-6 opacity-50 brightness-75 lg:-right-12
              lg:top-10`,
          )}
          alt=""
          width={144}
          height={144}
        />

        <Image
          src="/Embellishment.svg"
          className="w-[156px]"
          alt=""
          width={24}
          height={24}
          loading="eager"
        />

        <Text className="text-sm xs:text-base lg:text-lg">
          Five generations, thousands of beers served and countless
          good moments. Open since 1969, the Red Shed is one of the
          oldest and best bars in Madison, faithfully serving as the
          go-to establishment for Badger fans, students 21 and older,
          and the greater Madison area.
          <br />
          <br />
          Known for the amazing service, the always ice cold beers and
          the best Long Island Iced Tea ever, the Red Shed is a must
          stop when in Madison!
        </Text>
      </div>

      <Image
        src="/building.webp"
        className="w-full object-cover lg:max-w-[600px] xl:max-w-[800px]"
        alt=""
        width={800}
        height={800}
      />
    </div>
  )
}
