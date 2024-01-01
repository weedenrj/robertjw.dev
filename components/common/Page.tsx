import React from "react";
import Helmet, { HelmetProps } from "./Helmet";
import { Antonio, Lato } from 'next/font/google'
import clsx from "clsx";


export type PageProps = {
  SEO: HelmetProps
} & React.HTMLAttributes<HTMLDivElement>

export default function Page({
  SEO,
  children
}: PageProps) {
  return (
    <>
      <Helmet {...SEO} />
      <div className={clsx("h-dvh w-screen overflow-hidden bg-black")}>
        {children}
      </div>
    </>
  )
}
