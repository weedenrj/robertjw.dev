import clsx from "clsx";
import React from "react";


export type InputProps = {
} & React.HTMLAttributes<HTMLInputElement>

export default function Input({

  className,
  children,
  ...rest
}: InputProps) {
  return (
    <input className={clsx(className, "appearance-none block",
      "bg-yellow bg-opacity-20 text-gray-700 border border-gray-200 ",
      "rounded-lg py-3 px-4 leading-tight focus:outline-none ",
      "focus:bg-white focus:border-gray-500",
    )}
      {...rest}
    >
      {children}
    </input>
  )
}