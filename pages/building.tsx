import Navbar from '@components/common/Navbar'
import Page from '@components/common/Page'
import Title from '@components/common/Title'
import Text from '@components/common/Text'
import clsx from 'clsx'
import Image from 'next/image'
import Button from '@components/common/Button'
import React from 'react'

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


      <div className={clsx("flex flex-col h-full w-full justify-center items-center text-white",
        "gap-4 p-2 md:px-12",
        "bg-hero bg-center bg-cover"
      )}>

        <div className='flex flex-col gap-2'>
          <Title className='text-title text-4xl text-center font-bold leading-snug'>&quot;A must stop<br /> when in Madison&quot;!</Title>
          <div className='flex justify-center items-center gap-4'>
            <Image
              alt="The Red Shed Logo"
              src="/pngs/profile-pic-1.png"
              className="cursor-pointer "
              width={40}
              height={40}
            />
            <Text className='text-lg font-medium'>David Haldane</Text>
          </div>
        </div>

        <Button size='lg' color='accent-light'>
          Get directions
        </Button>
      </div>
    </Page>
  )
}
