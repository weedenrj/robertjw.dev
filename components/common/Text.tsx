import clsx from "clsx"
import React from "react"

export type TextProps = {
  as?: "span" | "p" | "div"
  selectable?: boolean
} & React.HTMLAttributes<HTMLParagraphElement> //TODO: HTML Span infer?

/**
 * Figma defaults (defaults to `className="text-lg font-text"`):
 * - CSS class `text-lg` => (18px) Body text regular (18pt)
 * - CSS class `text-base` => (16px) _Not in Figma_
 * - CSS class `text-sm` => (14px) Body text tiny (14pt)
 * - CSS class `text-xs` => (12px) _Not in Figma_
 *
 * Usage:
 * ```tsx
 * <Text className="text-sm">...</Text>
 * ```
 *
 * @link https://www.figma.com/file/90yJgaRuWbIDYh7QrSE3IY/Eternity-UI?node-id=319%3A3089
 */
function Text({
  as = "p",
  selectable = false,
  className,
  children,
  ...rest
}: TextProps) {
  switch (as) {
    case "span":
      return (
        <span
          className={clsx(
            className,
            "font-text",
            selectable ? "select-text" : "select-none",
          )}
          {...rest}
        >
          {children}
        </span>
      )
    default:
      return (
        <p
          className={clsx(
            className,
            "font-text",
            selectable ? "select-text" : "select-none",
          )}
          {...rest}
        >
          {children}
        </p>
      )
  }
}

export default Text
