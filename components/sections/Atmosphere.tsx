import React from "react";
import clsx from "clsx";
import Button from "../common/Button";
import Link from "next/link";
import Title from "@components/common/Title";
import Image from "next/image";
import Text from "@components/common/Text";

export type AtmosphereProps = {
} & React.HTMLAttributes<HTMLDivElement>

export default function Atmosphere({

  className,
  ...rest
}: AtmosphereProps) {

  return (
    <div className={clsx(className,
      "relative flex flex-col lg:flex-row-reverse w-full"
    )}
      {...rest}
    >
      <div className={clsx(
        "flex flex-col justify-center h-[570px] lg:h-[656px] xl:h-[800px] w-full text-white",
        "gap-6 px-6 lg:px-[5%] xl:px-[15%] 2xl:px-[20%]",
        ""
      )}>
        <div className="flex flex-col gap-2">
          <Title className="text-accent-light text-lg lg:text-xl font-semibold">The coziest bar in Madison</Title>
          <Title className="capitalize text-3xl xs:text-4xl lg:text-6xl text-balance">
            Great location,
            inviting atmosphere
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

        <Text className="text-sm xs:text-base">
          Located at 508 State Street, it&apos;s a short distance from the University Campus and within walking distance of Camp Randall Stadium, making it perfect for a celebration drink and a fun Friday night with your friends.
          <br /><br />
          The Shed&apos;s busiest hours are at the end of the week leading into the weekend when classes are over and the badgers are playing. Apart from the usual crowd, Red Shed continues to be a popular destination for sports fans during the state tournaments, due to its close proximity to the Kohl center.
        </Text>
      </div>

      <Image
        src="/building.webp"
        className="w-full lg:max-w-[600px] xl:max-w-[800px] object-cover"
        alt=""
        width={800}
        height={800} />
    </div>
  )
}
