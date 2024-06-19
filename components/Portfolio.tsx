'use client'

import PortfolioCard from "./PortfolioCard";
import { useEffect, useRef, useState } from "react";
import { PortfolioFiltersQuery, PortfolioQuery } from "tina/__generated__/types";
import clsx from "clsx";
import { TinaResponse } from "constants/types";
import autoAnimate from "@formkit/auto-animate";

export type PortfolioContentProps = {
  portfolio: TinaResponse<PortfolioQuery>["data"]["portfolio"][]
  filters: TinaResponse<PortfolioFiltersQuery>["data"]["portfolioFilters"][]
} & React.HTMLAttributes<HTMLDivElement>

export function PortfolioContent({
  portfolio,
  filters,

  className,
  ...rest
}: PortfolioContentProps) {
  const parent = useRef(null)
  const [activeFilter, setActiveFilter] = useState("*");

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  return (
    <div className={clsx(className, "container mr-auto ml-auto mb-8",
      "px-4 sm:px-5 md:px-10 lg:px-[60px]"
    )}
      {...rest}
    >
      <div className="py-12">
        <h2 className="relative inline-block text-[2.5rem] dark:text-white font-bold transform after:absolute after:md:w-[12rem] after:left-[14rem] after:h-0.5 after:bg-gradient-to-r after:from-btn-secondary after:to-btn-secondary after:content-[''] after:rounded-md after:top-2/4 after:transform">
          Portfolio
        </h2>
        <ul className="button-group isotop-menu-wrapper mt-[30px] flex w-full justify-start md:justify-end flex-wrap font-medium">
          {filters.map((filter, index) => (
            <li
              key={index}
              className={clsx("cursor-pointer text-text-primary transition-all",
                "duration-300 ease-in-out hover:text-btn-primary dark:text-main-text",
                "fillter-btn mr-4 md:mx-4",
                filter.tag === activeFilter && "!text-btn-primary"
              )}
              onClick={() => {
                setActiveFilter(filter.tag);
              }}
            >
              {filter.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2" ref={parent}>
        {portfolio.filter(item => activeFilter === "*" || item.tags?.includes(activeFilter))
          .map(item => (
            <div key={item.id} className={``} >
              <PortfolioCard details={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PortfolioContent;
