import React from "react";
import clsx from "clsx";

export type SnapBoxProps = {
} & React.HTMLAttributes<HTMLDivElement>

function SnapBox({
  children,
  className,
  ...rest
}: SnapBoxProps) {
  return (
    <div className={clsx(className, "flex flex-col h-full w-full",
      "snap-y snap-mandatory scrollbar-hide overflow-y-scroll overflow-x-hidden"
    )}
      {...rest}
    >
      <div className="fixed -top-6 w-full h-32 z-ui-frame bg-gradient-fade-black rotate-180 pointer-events-none" />
      {children}
      <div className="fixed -bottom-6 w-full h-32 z-ui-frame bg-gradient-fade-black pointer-events-none" />
    </div>
  )
}

export default SnapBox;
