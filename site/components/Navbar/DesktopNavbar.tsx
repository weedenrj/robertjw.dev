import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { NavLinks } from "./Navbar";

export type DesktopNavbarProps = {
  links: NavLinks
}
const DesktopNavbar = ({
  links
}: DesktopNavbarProps) => {
  return (
    <div className="hidden lg:flex justify-between items-center">
      <Link href="/">
        <Image
          alt="renewal hearing Logo"
          src="/logo.png"
          className="cursor-pointer"
          width={75}
          height={75}
        />
      </Link>

      <nav className="flex items-center">
        {links.map(({ name, to, id }) => (
          <Link href={to} key={id} className="mx-4 text-md xl:text-xl transition duration-200 border-b-4 border-transparent text-white hover:text-sand">
            {name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default DesktopNavbar;
