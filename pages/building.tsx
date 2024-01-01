import Navbar from '@components/common/Navbar'
import Page from '@components/common/Page'
import Title from '@components/common/Title'
import Text from '@components/common/Text'
import clsx from 'clsx'
import Image from 'next/image'
import Button from '@components/common/Button'
import React from 'react'
import Hero from '@components/sections/Hero'

export default function Building() {
  return (
    <Page SEO={{
      title: "The Red Shed | Madison, Wi.",
      url: "https://redshedmadison.com",
      image: "https://redshedmadison.com/Logo.webp",
      desc: "The Red Shed is currently undergoing renovations for our new location at 508 State St, Madison. " +
        "Check back in a few weeks to see if we're open yet. Thank you for your continuing patience and faithful service. We're excited to serve you again!"
    }}>
      
      <Navbar />
      <Hero />

    </Page>
  )
}
