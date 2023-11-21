import React from "react";
import clsx from "clsx";

export type GalleryProps = {
} & React.HTMLAttributes<HTMLDivElement>

export default function Gallery({

  className,
  ...rest
}: GalleryProps) {
  return (
    <div className={clsx(className, "shrink-0 snap-center snap-always",
      "flex flex-col items-center lg:justify-center w-full h-full lg:max-h-[65%]",
      "gap-12 pt-[33%] lg:pt-0 px-8",
    )}
      {...rest}
    >
      Gallery
    </div>
  )
}