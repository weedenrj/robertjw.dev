import React from "react"
import clsx from "clsx"
import type { Item } from "../../constants/types"
import Text from "./Text"
import Title from "./Title"
import Image from "next/image"
import { tinaField } from "tinacms/dist/react"

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
            data-tina-field={tinaField(item, "image")}
          />
          <div className={clsx("z-0 absolute bg-accent-darker top-2 left-2",
            item.emphasized ? "size-16 xs:size-36 sm:size-[152px]" : "size-[120px]",
            "rounded-sm",
          )} />
        </div>
      )}

      <div className="flex flex-col">
        <Title className="text-2xl text-accent text-pretty" data-tina-field={tinaField(item, "name")}>
          {item.name}
        </Title>
        <Text className="text-base font-light text-white font-lato" data-tina-field={tinaField(item, "description")}>
          {item.description}
        </Text>

        {item.discountPrice && item.originalPrice && (
          <div className="flex items-end flex-1 gap-6">
            <Text className="text-2xl font-bold line-through text-accent-darker font-lato" data-tina-field={tinaField(item, "originalPrice")}>
              ${item.originalPrice}
            </Text>
            <Text className="text-4xl text-white" data-tina-field={tinaField(item, "discountPrice")}>
              ${item.discountPrice}
            </Text>
          </div>
        )}
      </div>
    </div>
  )
}
