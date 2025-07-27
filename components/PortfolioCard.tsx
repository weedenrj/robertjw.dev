import { useState } from "react";
import Modal from "./Modal";
import clsx from "clsx";
import { Portfolio } from "constants/types";
import Image from "next/image";
import { Icon } from "./icon/Icon";

export type PortfolioCardProps = {
  details: Portfolio
} & React.HTMLAttributes<HTMLDivElement>

export function PortfolioCard({
  details,

  className,
  ...rest
}: PortfolioCardProps) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className={clsx(className, "rounded-lg bg-light-bg-five p-6 dark:bg-transparent dark:border-[2px] border-dark-border")} {...rest}>
        <div className="overflow-hidden rounded-lg">
          <a href={details.link}>
            <img
              className="w-full h-auto transition duration-200 ease-in-out transform rounded-lg cursor-pointer hover:scale-110"
              src={details.img}
              alt="portfolio image"
              onClick={() => setModal(true)}
            />
          </a>
        </div>
        <span className="pt-5 text-[14px] font-normal text-text-primary block dark:text-main-text">
          {details.category}
        </span>

        <h2
          className="mt-2 text-xl font-medium transition duration-300 cursor-pointer hover:text-btn-primary dark:hover:text-btn-primary dark:text-white"
          onClick={() => setModal(true)}
        >
          <a href={details.link}>{details.title}</a>
        </h2>
      </div>

      {modal && (
        <Modal closeModal={() => setModal(false)}>
          <h2 className="text-4xl font-bold text-center text-modal-text">
            {details.modal.title}
          </h2>

          <div className="grid grid-cols-1 gap-4 px-4 my-6 lg:grid-cols-2">
            <div className="space-y-2">
              <p className="dark:text-white flex text-[15px] sm:text-base">
                <i className="hidden mr-2 fa-regular fa-file-lines sm:text-base sm:block md:text-xl" />
                <span className="min-w-16 text-modal-text">Project:&nbsp;</span>
                <span className="font-medium">
                  {details.modal.project}
                </span>
              </p>
              <p className="dark:text-white flex  text-[15px] sm:text-base">
                <i className="hidden mr-2 text-lg fa-solid fa-code sm:block" />
                <span className="min-w-16 text-modal-text">Tools:&nbsp;</span>
                <span className="flex flex-wrap gap-2">
                  {details.modal.languages.split(",").map(tool => (
                    <span key={tool} className={clsx("px-1.5 py-0.5 font-medium text-sm",
                      "border rounded-full border-codeBlue")}>
                      {tool}
                    </span>
                  ))}
                </span>
              </p>
            </div>

            <div className="space-y-2">
              <p className="dark:text-white flex mt-2 lg:mt-0 text-[15px] sm:text-base">
                <i className="hidden mr-2 text-lg fa-regular fa-user sm:block" />
                <span className="min-w-16 text-modal-text">Client:&nbsp;</span>
                <span className="font-medium">{details.modal.client}</span>
              </p>
              <p className="dark:text-white flex text-[15px] sm:text-base">
                <i className="hidden mr-2 text-lg fa-solid fa-arrow-up-right-from-square sm:block" />
                <span className="min-w-16 text-modal-text">Preview:&nbsp;</span>
                <span className="font-medium transition-all duration-300 ease-in-out hover:text-modal-text">
                  <a
                    href={details.modal.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {details.modal.preview}
                  </a>
                  <Icon name="Link" size="sm" className="pl-2" />
                </span>
              </p>
            </div>
          </div>

          <p className="px-4 text-sm font-normal dark:text-white text-2line sm:text-base">
            {details.modal.description}
          </p>

          <div className="px-4">
            <Image
              className="object-cover w-auto h-auto mt-6 rounded-xl"
              src={details.modal.img}
              alt="portfolio image"
              width={768}
              height={768}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default PortfolioCard;
