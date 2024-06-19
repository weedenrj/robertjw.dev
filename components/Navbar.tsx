'use client'

import clsx from "clsx";
import { usePathname } from "next/navigation";
import * as Icon from "react-icons/fa";
import { Menu } from "tina/__generated__/types";

export type NavbarProps = {
  menuItems: {
    __typename: "Menu";
    id: string;
    name: string;
    link: string;
    icon: string;
    enabled?: boolean;
    _sys: {
      __typename?: "SystemInfo";
      filename: string;
      basename: string;
      breadcrumbs: string[];
      path: string;
      relativePath: string;
      extension: string;
    };
  }[]
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
          {menuItems.filter(item => item.enabled).map((item, index) => {
            const ReactIcon = Icon[item.icon];
            return (
              <li key={index}>
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
                    <ReactIcon />
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
