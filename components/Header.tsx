'use client'

import { Icon } from "./icon/Icon";
import { MenuQuery } from "constants/types";
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { AuthButton } from './AuthButton'
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import clsx from "clsx";

const themeAtom = atomWithStorage('theme', "dark")

export type HeaderProps = {
  menuItems: MenuQuery
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
    <div className={clsx(className, "relative lg:container flex w-full justify-between bg-light-bg-five",
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
        <div className="flex items-center gap-3">
          <button
            id="theme-toggle"
            aria-label="Theme toggler"
            type="button"
            className="flex size-[40px] lg:size-[50px] cursor-pointer items-center justify-center rounded-full bg-opacity-100 text-opacity-100 text-black transition-all duration-300 ease-in-out hover:bg-modal-text hover:text-white bg-white dark:hover:bg-modal-text dark:bg-dark-bg-three dark:text-white"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <span id="theme-toggle-light-icon" className="pointer-events-none dark:hidden">
              <Icon name="Moon" className="text-xl" />
            </span>

            <span id="theme-toggle-dark-icon" className="hidden pointer-events-none dark:block">
              <Icon name="Sun" className="text-xl" />
            </span>
          </button>

          <AuthButton className="hidden lg:block" />

          <button
            id="menu-toggle"
            type="button"
            className="flex h-10 w-10 cursor-pointer items-center justify-center bg-[white] text-[black] hover:bg-modal-text hover:text-white hover:dark:text-white transition-all duration-300 ease-in-out rounded-full dark:text-black lg:hidden"
            onClick={mobileMenuToggle}
            aria-label="Mobile Menu Togglers"
          >
            {showMenu ? (
              <Icon name="X" className="text-xl" />
            ) : (
              <Icon name="Menu" className="text-xl" />
            )}
          </button>
        </div>
      </div>

      <nav className={clsx(!showMenu ? "hidden" : "lg:hidden")}>
        <ul className="block rounded-b-[20px] shadow-md absolute left-0 top-20 z-30 max-w-[1052px] w-full bg-white dark:bg-dark-mobile-primary">
          <li className="border-b border-gray-200 dark:border-gray-700">
            <div className="p-4">
              <AuthButton />
            </div>
          </li>

          {menuItems.filter(item => item.enabled).map((item, index) => {
            const iconMapping: Record<string, keyof typeof import("./icon/Icon.fontawesome").AppFontAwesomeIcons> = {
              'FaUser': 'User',
              'FaBriefcase': 'Building',
              'FaWrench': 'Wrench',
              'FaBlogger': 'PenToSquare',
              'FaFileAlt': 'DownloadFile',
              'FaAddressBook': 'AddressCard',
            }

            const iconName = iconMapping[item.icon] || 'Home'

            return (
              <li key={index}>
                <a
                  className={clsx("flex cursor-pointer items-center pt-[0.625rem]",
                    "pb-[0.625rem] pl-4 pr-1 xl:pl-5 xl:pr-5 font-jetbrain text-xs",
                    "font-medium text-text-primary dark:text-white hover:text-btn-primary",
                    "transition-all duration-300 ease-in-out",
                    pathname === item.link && "!text-btn-primary"
                  )}
                  href={item.link}
                >
                  <span className="mr-2 text-xl">
                    <Icon name={iconName} />
                  </span>
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
