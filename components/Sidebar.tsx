import {
  FaEnvelopeOpenText,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLinkedinIn,
  FaGithub,
  FaGitlab,
  FaStar
} from "react-icons/fa";
import { PersonalInfoQuery } from "tina/__generated__/types";
import clsx from "clsx";
import { TinaResponse } from "constants/types";
import Image from "next/image";

export type SidebarProps = {
  personalInfo: TinaResponse<PersonalInfoQuery>["data"]["personalInfo"]
} & React.HTMLAttributes<HTMLDivElement>

export function Sidebar({
  personalInfo,

  className,
  ...rest
}: SidebarProps) {
  return (
    <div className={clsx("w-full mb-6 lg:mb-0 mx-auto relative",
      "bg-white text-center dark:bg-dark-primary px-6 rounded-[20px]",
      "mt-[180px] md:mt-[220px] lg:mt-0"
    )}
      {...rest}
    >
      {/* <!-- profile image --> */}
      <Image
        src="/assets/about/portrait.webp"
        className="absolute left-[50%] transform -translate-x-[50%] drop-shadow-xl mx-auto rounded-[20px] -mt-[140px]"
        alt="about"
        width={240} 
        height={240}
      />
      <div className="pt-[100px] pb-8">
        <h2 className="mt-6 mb-1 text-[26px] font-semibold dark:text-white font-jetbrains">
          {personalInfo.information?.name}
        </h2>
        <h3 className="mb-4 text-light-text inline-block dark:bg-dark-mobile-primary px-5 py-1.5 rounded-lg dark:text-main-text">
          {personalInfo.information?.profession}
        </h3>
        <div className="flex justify-center space-x-3">

          {personalInfo.information?.socialMedia.github && (
            <a
              href={personalInfo.information?.socialMedia.github}
              aria-label="Github Profile Link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex items-center justify-center w-10 h-10 transition-all duration-300 ease-in-out rounded-lg bg-light-bg-five dark:bg-dark-border hover:bg-gradient-to-r hover:from-btn-primary hover:to-btn-secondary hover:text-white text-fb-icon">
                <FaGithub />
              </span>
            </a>
          )}

          {personalInfo.information?.socialMedia.gitlab && (
            <a
              href={personalInfo.information?.socialMedia.gitlab}
              aria-label="Gitlab Profile Link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex items-center justify-center w-10 h-10 transition-all duration-300 ease-in-out rounded-lg bg-light-bg-five dark:bg-dark-border hover:bg-gradient-to-r hover:from-btn-primary hover:to-btn-secondary hover:text-white text-fb-icon">
                <FaGitlab />
              </span>
            </a>
          )}

          {/* <!-- upwork icon and link --> */}
          {personalInfo.information?.socialMedia.upwork && (
            <a
              href={personalInfo.information?.socialMedia.upwork}
              aria-label="upwork Profile Link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex items-center justify-center w-10 h-10 font-bold transition-all duration-300 ease-in-out rounded-lg bg-light-bg-five dark:bg-dark-border hover:bg-gradient-to-r hover:from-btn-primary hover:to-btn-secondary hover:text-white text-fb-icon">
                Up
              </span>
            </a>
          )}

          {/* <!-- linkedin icon and link --> */}
          {personalInfo.information?.socialMedia.linkedIn && (
            <a
              href={personalInfo.information?.socialMedia.linkedIn}
              aria-label="LinkedIn Profile Link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex items-center justify-center w-10 h-10 transition-all duration-300 ease-in-out rounded-lg bg-light-bg-five dark:bg-dark-border hover:bg-gradient-to-r hover:from-btn-primary hover:to-btn-secondary hover:text-white text-linkedin-icon">
                <FaLinkedinIn />
              </span>
            </a>
          )}

        </div>
        {/* <!-- personal information start --> */}
        <div className="p-7 rounded-2xl mt-7 bg-light-bg-five dark:bg-dark-mobile-primary">

          <div className="flex border-b border-light-border-two dark:border-dark-border-two pb-2.5">
            <span className="flex items-center justify-center w-10 h-10 transition-all duration-300 ease-in-out bg-white rounded-lg shadow-md hover:bg-gradient-to-r hover:from-btn-primary hover:to-btn-secondary hover:text-white dark:bg-black text-icon-color-one">
              <FaStar />
            </span>
            <div className="text-left ml-2.5">
              <p className="text-xs text-text-primary dark:text-main-text">
                Experience
              </p>
              <p className="dark:text-white">
                {personalInfo.information?.experience}
              </p>
            </div>
          </div>

          <div className="flex border-b border-light-border-two dark:border-dark-border-two py-2.5">
            <span className="flex items-center justify-center w-10 h-10 transition-all duration-300 ease-in-out bg-white rounded-lg shadow-md hover:bg-gradient-to-r hover:from-btn-primary hover:to-btn-secondary hover:text-white dark:bg-black text-icon-color-two">
              <FaEnvelopeOpenText />
            </span>
            <div className="text-left ml-2.5">
              <p className="text-xs text-text-primary dark:text-main-text">
                Email
              </p>
              <p className="dark:text-white">
                {personalInfo.information?.email}
              </p>
            </div>
          </div>
          <div className="flex border-b border-light-border-two dark:border-dark-border-two py-2.5">
            <span className="flex items-center justify-center w-10 h-10 transition-all duration-300 ease-in-out bg-white rounded-lg shadow-md hover:bg-gradient-to-r hover:from-btn-primary hover:to-btn-secondary hover:text-white dark:bg-black text-icon-color-three">
              <FaMapMarkerAlt />
            </span>
            <div className="text-left ml-2.5">
              <p className="text-xs text-text-primary dark:text-main-text">
                Location
              </p>
              <p className="dark:text-white">
                {personalInfo.information?.location}
              </p>
            </div>
          </div>
          <div className="flex py-2.5">
            <span className="flex items-center justify-center w-10 h-10 transition-all duration-300 ease-in-out bg-white rounded-lg shadow-md hover:bg-gradient-to-r hover:from-btn-primary hover:to-btn-secondary hover:text-white dark:bg-black text-icon-color-four">
              <FaCalendarAlt />
            </span>
            <div className="text-left ml-2.5">
              <p className="text-xs text-text-primary dark:text-main-text">
                Birthday
              </p>
              <p className="dark:text-white">
                {personalInfo.information?.birthday}
              </p>
            </div>
          </div>
        </div>
        {/* <!-- personal infomation end--> */}
        {/* <!-- download button --> */}
        <button className="flex items-center text-lg text-white transition-all ease-in-out duration-200 mt-6 mx-auto px-8 py-3 rounded-[35px] bg-gradient-to-r from-btn-secondary to-btn-primary hover:bg-gradient-to-r hover:from-btn-primary hover:to-btn-secondary">
          <img className="mr-3" src="/assets/icons/dowanload.png" alt="icon" />
          <a href="/Robert Weeden Resume July 2024.pdf" download aria-label="Download resume">
            {" "}
            Download Resume
          </a>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
