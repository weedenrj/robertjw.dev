import React from "react"
import clsx from "clsx"
import type { Item, Section } from "../../constants/types"
import Text from "./Text"
import Title from "./Title"
import Image from "next/image"

export type ItemProp = {
  item: Item
} & React.HTMLAttributes<HTMLDivElement>

export default function Item({
  item,

  className,
  ...rest
}: ItemProp) {
  return (
    <div className={clsx(className, "flex font-title gap-6")}
      {...rest}
    >
      {Boolean(item.imgSrc) && (
        <div className="relative">
          <Image
            className={clsx("relative z-10",
              item.emphasized ? "w-[152px] h-[152px]" : "w-[120px] h-[120px]",
              "rounded-sm",
            )}
            src={item.imgSrc}
            alt={""}
            width={152}
            height={152}
          />
          <div className={clsx("z-0 absolute bg-accent-darker -bottom-2 -right-2",
            item.emphasized ? "w-[152px] h-[152px]" : "w-[120px] h-[120px]",
            "rounded-sm",
          )} />
        </div>
      )}

      <div className="flex flex-col">
        <Title className="text-2xl text-accent text-pretty">
          {item.name}
        </Title>
        <Text className="text-white text-base font-lato font-light">
          {item.description}
        </Text>
      </div>


    </div>
  )
}
