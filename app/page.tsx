import React from "react"
import { getClients, getPersonalInfo, getSkills } from "api/collections"
import Sidebar from "components/Sidebar"
import SkillCard from "components/SkillCard"
import { TinaMarkdown } from "tinacms/dist/rich-text";
import MainCarousel from "components/MainCarousel"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'RJW | About',
  description: `Hey there, 
  I'm a professional web developer with over 4 years of experience across many domains.
  I enjoy building big projects from small pieces and working with others to create amazing technologies.`
}

export default async function Home() {
  const personalInfo = await getPersonalInfo()
  const skills = await getSkills()
  const clients = await getClients()
  const clientImages = clients.clientImg || []

  return (
    <div className="">
      <div className="px-4 pt-12 md:py-12 sm:px-5 md:px-10 lg:px-14">
        <h2
          className="relative inline-block text-[2.5rem] dark:text-white font-bold transform after:absolute after:md:w-[12rem] after:left-[14rem] after:h-0.5 after:bg-gradient-to-r after:from-btn-secondary after:to-btn-secondary after:content-[''] after:rounded-md after:top-2/4 after:transform font-jetbrains"
        >
          About Me
        </h2>
        <div className="lg:hidden">
          <Sidebar personalInfo={personalInfo?.body.children} />
        </div>
        <div
          className="lg:grid grid-cols-12 md:gap-10 pt-4 md:pt-[30px] items-center hidden"
        >
          <div className="col-span-12 space-y-2.5">
            <div className="leading-7 lg:mr-16 text-text-primary dark:text-main-text">
              <TinaMarkdown content={personalInfo?.body} />
            </div>
            <div></div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-12 sm:px-5 md:px-10 lg:px-14">
        <h3
          className="text-[35px] dark:text-white font-bold font-robotoSlab pb-5 font-jetbrains"
        >
          What I do!
        </h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-2">
          {skills.map((item) =>
            <SkillCard key={item.id} skill={item} />
          )}
        </div>
      </div>

      <div className="">
        <div className="h-auto max-w-full rounded-xl">
          <h3 className="text-center dark:text-white text-[1.75rem] mb-3 font-semibold pt-10 px-2 sm:px-5 md:px-10 lg:px-14">
            Clients
          </h3>
          <MainCarousel clients={clientImages} className="" />
        </div>
      </div>

    </div>
  )
}
