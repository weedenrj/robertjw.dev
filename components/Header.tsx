'use client'

import { useEffect, useState } from "react";
import { FaMoon, FaSun, FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import * as Icon from "react-icons/fa";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { MenuQuery } from "tina/__generated__/types";
import { TinaResponse } from "constants/types";
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const themeAtom = atomWithStorage('theme', "dark")

export type HeaderProps = {
  menuItems: TinaResponse<MenuQuery>["data"]["menu"][]
} & React.HTMLAttributes<HTMLDivElement>

export function Header({
  menuItems,

  className,
  ...rest
}: HeaderProps) {
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useAtom(themeAtom)

  const mobileMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    document.documentElement.classList.remove("dark")
    document.documentElement.classList.remove("light")
    document.documentElement.classList.add(theme)
  }, [theme]);

  return (
    <>
      <div className={clsx(className, "container flex w-full justify-between bg-light-bg-five",
        "dark:bg-black py-5 mr-auto ml-auto lg:bg-transparent lg:pl-0 lg:pr-0 lg:pt-[50px]",
        "lg:dark:bg-transparent"
      )}
        {...rest}
      >
        <div className="flex items-center justify-between w-full px-4">
          <a href="/">
            <p className="text-3xl dark:text-white font-jetbrains">
              <span className="font-bold text-codeRed">
                &lt;RJW</span>.dev/&gt;
            </p>
          </a>
          <div className="flex items-center">
            <button
              id="theme-toggle"
              aria-label="Theme toggler"
              type="button"
              className="flex h-[40px] w-[40px] lg:w-[50px] lg:h-[50px] cursor-pointer items-center justify-center rounded-full bg-opacity-100 text-opacity-100 text-black transition-all duration-300 ease-in-out hover:bg-modal-text hover:text-white bg-white dark:hover:bg-modal-text dark:bg-dark-bg-three dark:text-white"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <span id="theme-toggle-light-icon" className="pointer-events-none dark:hidden">
                <FaMoon className="text-xl" />
              </span>

              <span id="theme-toggle-dark-icon" className="hidden pointer-events-none dark:block">
                <FaSun className="text-xl" />
              </span>
            </button>

            <button
              id="menu-toggle"
              type="button"
              className="flex h-10 w-10 cursor-pointer items-center justify-center bg-[white] text-[black] hover:bg-modal-text hover:text-white hover:dark:text-white transition-all duration-300 ease-in-out ml-3 rounded-full dark:text-black lg:hidden"
              onClick={mobileMenuToggle}
              aria-label="Mobile Menu Togglers"
            >
              {showMenu ? (
                <ImCross id="menu-toggle-close-icon" className="text-xl" />
              ) : (
                <FaBars id="menu-toggle-open-icon" className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <nav id="navbar" className={clsx(showMenu && "hidden", "lg:hidden")}>
        <ul className="block rounded-b-[20px] shadow-md absolute left-0 top-20 z-[22222222222222] w-full bg-white dark:bg-dark-mobile-primary">
          {menuItems.filter(item => item.enabled).map((item, index) => {
            const ReactIcon = Icon[item.icon];
            return (
              <li key={index}>
                <a
                  className={clsx("flex cursor-pointer items-center pt-[0.625rem]",
                    "pb-[0.625rem] pl-4 pr-1 xl:pl-5 xl:pr-5 font-jetbrains font-sans text-xs",
                    "font-medium text-text-primary dark:text-white hover:text-btn-primary",
                    "transition-all duration-300 ease-in-out",
                    pathname === item.link && "!text-btn-primary"
                  )}
                  href={item.link}
                >
                  <span className="mr-2 text-xl">
                    <ReactIcon />
                  </span>
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Header;
