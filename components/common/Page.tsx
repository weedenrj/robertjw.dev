import React from "react"
import clsx from "clsx"

export type PageProps = {} & React.HTMLAttributes<HTMLDivElement>

export default function Page({ className, children }: PageProps) {
  return (
    <div
      className={clsx(
        className,
        "relative h-svh w-screen overflow-x-hidden bg-black",
      )}
    >
      {children}
    </div>
  )
}
