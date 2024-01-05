import clsx from "clsx"
import React from "react"

export type InputProps = {} & React.HTMLAttributes<HTMLInputElement>

export default function Input({
  className,
  children,
  ...rest
}: InputProps) {
  return (
    <input
      className={clsx(
        className,
        "block appearance-none",
        `bg-yellow border border-gray-200 bg-opacity-20 text-gray-700`,
        `rounded-lg px-4 py-3 leading-tight focus:outline-none`,
        "focus:border-gray-500 focus:bg-white",
      )}
      {...rest}
    >
      {children}
    </input>
  )
}
