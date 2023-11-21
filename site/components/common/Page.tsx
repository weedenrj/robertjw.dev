import React from "react";
import Helmet, { HelmetProps } from "./Helmet";

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
      <main className="h-screen w-screen overflow-hidden">
        {children}
      </main>
    </>
  )
}
