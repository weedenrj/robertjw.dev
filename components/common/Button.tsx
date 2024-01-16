import React from "react"
import clsx from "clsx"

type btnColors =
  | "accent-light"
  | "accent"
  | "accent-dark"
  | "accent-darker"
  | "black"

export type ButtonProps = {
  size?: "sm" | "lg"
  color?: btnColors
} & React.HTMLAttributes<HTMLButtonElement>

export default function Button({
  size = "sm",
  color = "accent-dark",

  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        className,
        "inline-flex items-center justify-center",
        "h-12 shrink-0 gap-2 px-10 py-2 xs:px-12",
        "font-Lato rounded border-2 text-base font-bold xs:text-lg",
        "transition active:animate-pop",

        size === "sm" && "min-w-38",
        size === "lg" && "min-w-46",
        color !== "black" && "hover:bg-accent-light hover:border-accent-light",
        color === "black" && "border-opacity-50 hover:border-opacity-100 border-white",

          `border-${color}`,
        `bg-${color}`,
      )}
      type="button"
      {...rest}
    >
      {children}
    </button>
  )
}
