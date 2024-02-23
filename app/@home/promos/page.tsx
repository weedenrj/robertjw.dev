import Title from "@components/common/Title"
import clsx from "clsx"
import SectionedList from "@components/common/SectionedList"
import { getPromos } from "../../../api/PromosApi"

export default async function Promos() {
  const promos = await getPromos()

  return (
    <>
      <div
        className={clsx(
          'relative flex h-[360px] w-full flex-col justify-center',
          "overflow-x-hidden text-white",
          "gap-4 p-2 lg:px-[5%] xl:gap-6 xl:px-[15%] 2xl:px-[20%]",
          "bg-cover bg-no-repeat bg-center bg-promoHeroMobile md:bg-promoHero",
        )}
      >
        <div className="flex flex-col gap-2 xl:gap-6 xl:self-start px-6 lg:px-0">
          <Title className={clsx('text-title font-bold text-center xs:text-left text-[56px]')} >
            Promos
          </Title>
        </div>
      </div>

      <SectionedList sections={promos} className="pb-20" />
    </>
  )
}
