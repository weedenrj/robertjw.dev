'use client'

import { usePathname } from "next/navigation"
import { Icon, IconProps } from "./icon/Icon"
import { MenuItem } from "constants/types";
import clsx from "clsx";

export type NavbarProps = {
  menuItems: MenuItem[]
} & React.HTMLAttributes<HTMLDivElement>

export function Navbar({
  menuItems,

  className,
  ...rest
}: NavbarProps) {
  const pathname = usePathname()

  return (
    <header className={clsx(className, "lg:w-fit h-[144px] hidden lg:block p-[30px]",
      "ml-auto mb-10 rounded-[16px] bg-white dark:bg-dark-primary"
    )}
      {...rest}
    >
      <nav className="hidden lg:block">
        <ul className="flex">
          {menuItems.filter(item => item.enabled).map((item) => {
            const iconMapping: Record<string, IconProps["name"]> = {
              'FaUser': 'User',
              'FaBriefcase': 'Building',
              'FaWrench': 'Wrench',
              'FaBlogger': 'PenToSquare',
              'FaFileAlt': 'DownloadFile',
              'FaAddressBook': 'AddressCard',
            }

            const iconName = iconMapping[item.icon] || 'Home'

            return (
              <li key={item.id}>
                <a
                  className={clsx("flex h-20 w-20 cursor-pointer flex-col items-center",
                    "justify-center bg-codeBlue bg-opacity-10 text-[0.8125rem] font-medium",
                    "text-text-primary dark:bg-dark-border dark:text-main-text transition-all",
                    "duration-300 ease-in-out mx-2.5 rounded-[10px]",
                    pathname === item.link
                      ? "bg-gradient-to-r from-btn-primary to-gradient-to !text-white"
                      : "hover:bg-gradient-to-r hover:from-btn-primary hover:to-gradient-to hover:text-white hover:dark:text-white"
                  )}
                  href={item.link}
                >
                  <span className="mb-1 text-xl">
                    <Icon name={iconName} />
                  </span>{" "}
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
