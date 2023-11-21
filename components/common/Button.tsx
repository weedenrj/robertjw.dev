import React from "react";
import clsx from "clsx";

export type ButtonProps = {
} & React.HTMLAttributes<HTMLButtonElement>

export default function Button({
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button className={clsx(className, "flex justify-center bg-themeRed hover:bg-darkRed",
      "rounded-lg border border-darkYellow hover:border-yellow",
      "font-title text-2xl text-white tracking-wider",
      "pb-2 px-3",
      "text-shadow-black-border-bottom-thin"
    )}
      {...rest}
    >
      {children}
    </button>
  )
}
