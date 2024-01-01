import React from "react";
import clsx from "clsx";

type btnColors = 'accent-light' | 'accent' | 'accent-dark' | 'accent-darker'

export type ButtonProps = {
  size?: 'sm' | 'lg'
  color?: btnColors
} & React.HTMLAttributes<HTMLButtonElement>

export default function Button({
  size = 'sm',
  color = 'accent-dark',

  children,
  className, 
  ...rest
}: ButtonProps) {
  return (
    <button className={clsx(className, "inline-flex justify-center items-center",
      "h-12 px-10 xs:px-12 py-2 gap-2 shrink-0",
      "rounded border-2 font-Lato text-base xs:text-lg font-bold",

      size === 'sm' && 'min-w-38',
      size === 'lg' && 'min-w-46',

      `border-${color}`, `bg-${color}`

    )}
      {...rest}
    >
      {children}
    </button>
  )
}
