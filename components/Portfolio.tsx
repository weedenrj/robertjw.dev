import Isotope from "isotope-layout";
import imagesLoaded from "imagesloaded";
import PortfolioCard from "./PortfolioCard";
import { useEffect, useRef, useState } from "react";
import { PortfolioFilters, Works } from "tina/__generated__/types";
import clsx from "clsx";

export type PortfolioContentProps = {
  portfolio: Works[]
  filters: PortfolioFilters[]
} & React.HTMLAttributes<HTMLDivElement>

export function PortfolioContent({
  portfolio,
  filters,

  className,
  ...rest
}: PortfolioContentProps) {
  const isotopeRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("*");

  useEffect(() => {
    // Initialize Isotope after component mounts
    const grid = document.querySelector(".portfolio_list-two");

    // Initialize Isotope
    isotopeRef.current = new Isotope(grid, {
      itemSelector: ".portfolio_list-two-items",
      percentPosition: true,
      masonry: {
        columnWidth: ".grid-sizer",
      },
    });

    // Wait for images to load before initializing Isotope
    imagesLoaded(grid).on("progress", () => {
      isotopeRef.current.layout();
    });

    return () => {
      // Clean up Isotope instance when component unmounts
      isotopeRef.current.destroy();
    };
  }, []);

  const handleFilter = (filterValue) => {
    isotopeRef.current.arrange({ filter: filterValue });
    setActiveFilter(filterValue);
  };
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
              data-filter={filter.tag}
              onClick={() => handleFilter(filter.tag)}
            >
              {filter.name}
            </li>
          ))}
        </ul>
      </div>

      <div id="isotop-gallery-wrapper" className="portfolio_list-two two-col">
        <div className="grid-sizer w-[50%] px-[10px] py-[10px]"></div>
        {portfolio.map((item, index) => (
          <div
            key={index}
            className={`portfolio_list-two-items isotop-details ${item.tag} mb-5 w-full md:w-[48%]`}
          >
            <PortfolioCard details={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioContent;
