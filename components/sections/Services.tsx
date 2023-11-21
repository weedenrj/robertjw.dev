import React from "react";
import clsx from "clsx";
import Title from "../common/Title";
import Button from "../common/Button";
import Link from "next/link";
import Image from "next/image";

export type ServicesOffered = typeof servicesOffered
const servicesOffered = [
  {
    title: "Aircraft Restoration",
    img: "/champ.webp",
    desc: "Full projects from start to finish, and everything in between. Priced on a case-by-case basis.",
    buttonTxt: "Ballpark my project",
  },
  {
    title: "Fabric Covering and Painting",
    img: "/covering.webp",
    desc: "Specializing in PolyTone and Randolph, we are outfitted with paint facilities to cover from start to finish",
    buttonTxt: "Get an estimate",
  },
  {
    title: "Inspections and Annuals",
    img: "/inspection.webp",
    desc: "Brodhead Aviation also does routine maintenance, annuals, and air worthiness inspections." +
      " Travel expenses apply to all off-site work.",
    buttonTxt: "Schedule maintenance",
  }
]

export type ServicesProps = {
} & React.HTMLAttributes<HTMLDivElement>

export default function Services({

  className,
  ...rest
}: ServicesProps) {
  return (
    <div className={clsx(className,
      "flex flex-col items-center justify-start w-full ",
      "gap-4 py-20 lg:py-24 pb-8 px-8",
      "bg-white border-y-2 border-yellow border-opacity-20"
    )}
      {...rest}
    >
      <Title className="text-6xl lg:text-7xl">
        Our Services
      </Title>
      <h2 className="text-center font-lato text-base lg:text-lg md:max-w-[500px]">
        With nearly 30 years of maintenance experience and a lifetime in aviation,
        you can rest easy knowing your project is in capable hands.
      </h2>


      <div className="flex-1 grid grid-cols-1 xl:grid-cols-3 place-items-center w-full gap-8">
        {servicesOffered.map((service, i) => (
          <div key={i} className={clsx("flex flex-col items-center  gap-2 p-2",
            "h-full max-w-[700px]",
            "border-2 ring-2 ring-themeRed border-yellow rounded-xl bg-brown bg-opacity-50"
          )}>
            <Title className="text-3xl text-center underline">
              {service.title}
            </Title>
            <h2 className="text-center font-lato text-base lg:text-lg ">
              {service.desc}
            </h2>

            <Image src={service.img} alt="service" className="rounded-xl" width={1199} height={674} />
            <Link href="#contact">
              <Button>
                {service.buttonTxt}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}