import React from "react";
import Desktopnavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export type NavLinks = typeof links
const links = [
  { name: "About Us", to: "/", id: 0 },
  { name: "Services", to: "/services", id: 1 },
  { name: "Team", to: "/team", id: 2 },
  { name: "Portfolio", to: "/portfolio", id: 3 },
  { name: "Writings", to: "/writings", id: 4 },
  { name: "Contact", to: "/contact", id: 5 },
];

export default function Navbar() {
  return (
    <header className="container mx-auto px-4 z-10">
      <nav className="my-5 lg:my-10 text-neutral-content">
        {/** DESKTOP NAVBAR */}
        <Desktopnavbar links={links} />

        {/* MOBILE NAVBAR */}
        <MobileNavbar links={links} />
      </nav>
    </header>
  );
}
