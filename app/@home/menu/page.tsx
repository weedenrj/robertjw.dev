import Navbar from "@components/common/Navbar"
import Page from "@components/common/Page"
import React from "react"
import Hero from "@components/sections/Hero"
import About from "@components/sections/About"
import Specialties from "@components/sections/Specialties"
import Atmosphere from "@components/sections/Atmosphere"
import Location from "@components/sections/Location"
import { type Viewport } from "next"
import Reviews from "@components/sections/Reviews"
import FollowUs from "@components/sections/FollowUs"
import Footer from "@components/sections/Footer"
import Image from "next/image"
import Title from "@components/common/Title"
import Text from "@components/common/Text"
import clsx from "clsx"
import SectionedList from "@components/common/SectionedList"
import ENV from "../../../constants/env"


export default function Menu() {
  return (
    <>
      <div
        className={clsx(
          'relative flex h-[360px] w-full flex-col justify-center',
          "overflow-x-hidden text-white",
          "gap-4 p-2 lg:px-[5%] xl:gap-6 xl:px-[15%] 2xl:px-[20%]",
          "bg-cover bg-no-repeat bg-center bg-menuHeroMobile md:bg-menuHero",
        )}
      >
        <div className="flex flex-col gap-2 xl:gap-6 xl:self-start px-6">
          <Title className={clsx('text-title font-bold text-center xs:text-left text-[56px]')} >
            Our menu
          </Title>
        </div>
      </div>

      <SectionedList sections={ENV.Menu} />


      <div className=" flex flex-col gap-24 xs:gap-40 sm:gap-[200px]">

      </div>
    </>
  )
}
