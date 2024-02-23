import React from "react"
import clsx from "clsx"
import type { Item } from "../../constants/types"
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
    <div className={clsx(className, "flex font-title gap-6 max-w-item xs:min-w-80 min-w-48")}
      {...rest}
    >
      {item.emphasized && item.image !== "" && item.image !== undefined && (
        <div className="relative shrink-0">
          <Image
            className={clsx("relative z-10",
              item.emphasized ? "size-16 xs:size-36 sm:size-[152px]" : "size-[120px]",
              "rounded-sm",
            )}
            src={item.image}
            alt={""}
            width={152}
            height={152}
          />
          <div className={clsx("z-0 absolute bg-accent-darker top-2 left-2",
            item.emphasized ? "size-16 xs:size-36 sm:size-[152px]" : "size-[120px]",
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

        {item.discountPrice && item.originalPrice && (
          <div className="flex-1 flex items-end gap-6">
            <Text className="text-accent-darker text-2xl font-bold line-through font-lato">
             ${item.originalPrice}
            </Text>
            <Text className="text-white text-4xl">
             ${item.discountPrice}
            </Text>
          </div>
        )}
      </div>
    </div>
  )
}
