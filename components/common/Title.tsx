import React from "react"
import clsx from "clsx"

export type TitleProps = {} & React.HTMLAttributes<HTMLHeadingElement>

export default function Title({
  children,
  className,
  ...rest
}: TitleProps) {
  return (
    <h1 className={clsx(className, "font-title")} {...rest}>
      {children}
    </h1>
  )
}
