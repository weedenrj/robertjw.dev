import { getMenu } from "api"
import clsx from "clsx"
import SectionedList from "components/common/SectionedList"
import Title from "components/common/Title"

export default async function Menu() {
  const menu = await getMenu()

  return (
    <>
      <div
        className={clsx(
          'relative flex h-[360px] w-full flex-col justify-center',
          "overflow-x-hidden text-white",
          "gap-4 xl:gap-6 p-2 lg:px-[5%] xl:px-[15%] 2xl:px-[20%]",
          "bg-cover bg-no-repeat bg-center bg-menuHeroMobile md:bg-menuHero",
        )}
      >
        <div className="flex flex-col gap-2 xl:gap-6 xl:self-start px-6 lg:px-0">
          <Title className={clsx('text-title font-bold text-center xs:text-left text-[56px]')} >
            Our menu
          </Title>
        </div>
      </div>

      <SectionedList sections={menu} alternateBackgrounds className="pb-20" />
    </>
  )
}
