import React from "react"
import ContactForm from "components/ContactForm"
import clsx from "clsx"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'RJW | Contact',
  description: 'Feel free to reach out with any questions, big or small. Quicker responses available if you want to talk code.',
}

export default async function Contact() {
  return (
    <div className="">
      <h2 className={clsx("relative inline-block text-[2.5rem]",
        "dark:text-white font-bold transform after:absolute after:md:w-[12rem]",
        "after:left-[16rem] after:h-0.5 after:bg-gradient-to-r after:from-btn-secondary",
        "after:to-btn-secondary after:content-[''] after:rounded-md after:transform",
        "after:top-[76px] mb-12 md:mb-[30px] pl-4 md:pl-[60px] pt-12"
      )} >
        Contact
      </h2>

      <ContactForm />
    </div>
  )
}
