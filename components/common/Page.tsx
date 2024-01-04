import React from "react";
import Helmet, { HelmetProps } from "./Helmet";
import { Antonio, Lato } from 'next/font/google'
import clsx from "clsx";


export type PageProps = {
  SEO: HelmetProps
} & React.HTMLAttributes<HTMLDivElement>

export default function Page({
  SEO,
  className,
  children
}: PageProps) {
  return (
    <>
      <Helmet {...SEO} />
      <div className={clsx(className, "relative h-svh w-screen overflow-x-hidden bg-black")}>
        {children}
      </div>
    </>
  )
}
