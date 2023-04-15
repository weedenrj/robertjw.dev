import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m, useCycle } from "framer-motion";
import type { NavLinks } from "./Navbar";

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
};

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

export type MobileNavbarProps = {
  links: NavLinks
}

const MobileNavbar = ({
  links
}: MobileNavbarProps) => {
  const [open, cycleOpen] = useCycle(false, true);

  return (
    <div className="flex items-center justify-between text-white">
      <div className="lg:hidden">
        <Link href="/" >
          <Image
            alt="Sage Labs Logo"
            src="/Sage.webp"
            className="cursor-pointer"
            width={75}
            height={75}
          />
        </Link>
      </div>

      <m.div
        className="lg:hidden"
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: "easeIn", delay: 0.5 }}
      >
        {!open && (
          <m.button
            className="text-white"
            aria-label="navbar hamburger menu"
            onClick={() => cycleOpen()}
            variants={variants}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={{ type: "easeIn", delay: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-10 h-10 sm:w-12 sm:h-12 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </m.button>
        )}
        <AnimatePresence>
          {open && (
            <m.aside className="absolute top-0 right-0 w-full min-h-screen bg-[#0E0E0E] text-white">
              <m.nav
                className="flex flex-col justify-center items-center"
                initial="closed"
                animate="open"
                exit="closed"
                variants={sideVariants}
              >
                <div className="place-self-end">
                  <button
                    className="btn btn-ghost"
                    onClick={() => cycleOpen()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-10 h-10 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
                <m.a
                  href="/"
                  whileHover={{ scale: 1.1 }}
                  variants={itemVariants}
                  className="text-2xl md:text-4xl my-2 "
                >
                  Home
                </m.a>
                {links.map(({ name, to, id }) => (
                  <m.a
                    key={id}
                    href={to}
                    whileHover={{ scale: 1.1 }}
                    variants={itemVariants}
                    className="text-2xl md:text-4xl my-2 "
                  >
                    {name}
                  </m.a>
                ))}
                <m.div
                  className="flex justify-center items-center my-3"
                  whileHover={{ scale: 1.1 }}
                  variants={itemVariants}
                >
                  <a
                    href="https://www.twitter.com/sagelabs_"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="rounded-full mx-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        viewBox="0 0 24 24"
                        className="fill-current"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                      </svg>
                    </div>
                  </a>
                  <a
                    href="https://discord.gg/VfvjqCfBk3"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="rounded-full mx-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        width="2em"
                        height="2em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </a>
                </m.div>
              </m.nav>
            </m.aside>
          )}
        </AnimatePresence>
      </m.div>
    </div>
  );
};

export default MobileNavbar;
