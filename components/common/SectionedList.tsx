'use client'

import React from "react"
import clsx from "clsx"
import type { Section, TinaResponse } from "../../constants/types"
import Text from "./Text"
import Title from "./Title"
import Image from "next/image"
import Item from "./Item"
import { useTina, tinaField } from 'tinacms/dist/react'

export type SectionedListProps = {
  tinaQuery: TinaResponse
  alternateBackgrounds?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function SectionedList({
  tinaQuery,
  alternateBackgrounds,

  className,
  ...rest
}: SectionedListProps) {
  const { data } = useTina({
    query: tinaQuery.query,
    variables: tinaQuery.variables,
    data: tinaQuery.data,
  })

  const sections: Section[] = data?.menu?.sections || data?.promos?.sections || []

  return (
    <div className={clsx(className, "flex flex-col w-full h-full font-title")} {...rest}>
      {sections.map((section, i) => {
        return (
          <div
            key={section.title}
            className={clsx("py-16 flex flex-col gap-6 p-6 lg:px-[5%] xl:px-[15%] 2xl:px-[20%]",
              (alternateBackgrounds && i % 2 === 0) ? "bg-gray-light" : "bg-black"
            )}
          >
            <div className="flex flex-col">
              {Boolean(section.raisedText) && (
                <Text
                  className="text-lg text-accent-light"
                  data-tina-field={tinaField(section, "raisedText")}>
                  {section.raisedText}
                </Text>
              )}

              <Title className="mb-4 text-4xl text-white"
                data-tina-field={tinaField(section, "title")}>
                {section.title}
              </Title>
              <Image
                src="/Embellishment.svg"
                className="mt-2 w-[156px]"
                alt=""
                width={24}
                height={24}
                loading="eager"
              />
            </div>

            <div className="flex flex-row flex-wrap gap-12">
              {section.items.map(item => (
                <Item item={item} key={item.name} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
