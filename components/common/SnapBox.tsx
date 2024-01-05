import React from "react"
import clsx from "clsx"

export type SnapBoxProps = {} & React.HTMLAttributes<HTMLDivElement>

function SnapBox({ children, className, ...rest }: SnapBoxProps) {
  return (
    <div
      className={clsx(
        className,
        "flex h-full w-full flex-col",
        `scrollbar-hide snap-y snap-mandatory overflow-x-hidden
          overflow-y-scroll`,
      )}
      {...rest}
    >
      <div
        className="z-ui-frame bg-gradient-fade-black pointer-events-none fixed -top-6
          h-32 w-full rotate-180"
      />
      {children}
      <div
        className="z-ui-frame bg-gradient-fade-black pointer-events-none fixed -bottom-6
          h-32 w-full"
      />
    </div>
  )
}

export default SnapBox
