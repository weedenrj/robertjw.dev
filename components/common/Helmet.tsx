import React from "react";
import Head from "next/head";


export type HelmetProps = {
  title: string
  desc: string
  url?: string
  image?: string
}

export default function Helmet({
  title,
  desc,
  url,
  image
}: HelmetProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="apple-touch-icon" sizes="180x180" href="/Logo.webp" />
      <link rel="icon" type="image/x-icon" href="/Logo.webp"/>

      <link rel="shortcut icon" type="image/png" href="/Logo.webp"></link>
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={url} />

      <meta name="twitter:card" content="summary_large_image" key="twcard" />
      <meta property="twitter:domain" content={url} key="twdomain" />
      <meta property="twitter:url" content={url} key="twurl" />
      <meta name="twitter:title" content={title} key="twtitle" />
      <meta name="twitter:description" content={desc} key="twdesc" />
      <meta name="twitter:image" content={image} key="twimage" />
    </Head>
  );
}
