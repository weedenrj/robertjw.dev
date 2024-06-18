import { useState } from "react";
import Modal from "./Modal";
import { Works } from "tina/__generated__/types";
import clsx from "clsx";

export type PortfolioCardProps = {
  details: Works
} & React.HTMLAttributes<HTMLDivElement>

export function PortfolioCard({
  details,

  className,
  ...rest
}: PortfolioCardProps) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className={clsx(className, "rounded-lg bg-light-bg-three p-6 dark:bg-transparent dark:border-[2px] border-dark-border")} {...rest}>
        <div className="overflow-hidden rounded-lg">
          <a href={details.link}>
            <img
              className="w-full cursor-pointer transition duration-200 ease-in-out transform hover:scale-110 rounded-lg h-auto"
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
          className="font-medium cursor-pointer text-xl duration-300 transition hover:text-btn-primary dark:hover:text-btn-primary dark:text-white mt-2"
          onClick={() => setModal(true)}
        >
          <a href={details.link}>{details.title}</a>
        </h2>
      </div>

      {modal && (
        <Modal closeModal={() => setModal(false)}>
          <h2 className="text-modal-text dark:hover:text-btn-primary text-4xl text-center font-bold">
            {details.modal.title}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 my-6 pr-3">
            <div className="space-y-2">
              <p className="dark:text-white flex items-center text-[15px] sm:text-lg">
                <i className="fa-regular fa-file-lines sm:text-lg hidden sm:block mr-4 md:text-xl" />
                Project :&nbsp;
                <span className="font-medium">
                  {details.modal.project}
                </span>
              </p>
              <p className="dark:text-white flex items-center text-[15px] sm:text-lg">
                <i className="fa-solid fa-code text-lg mr-2 hidden sm:block" />
                Langages :&nbsp;
                <span className="font-medium">
                  {details.modal.languages}
                </span>
              </p>
            </div>

            <div className="space-y-2">
              <p className="dark:text-white flex items-center mt-2 lg:mt-0 text-[15px] sm:text-lg">
                <i className="fa-regular fa-user text-lg mr-2 hidden sm:block" />
                Client :&nbsp;{" "}
                <span className="font-medium">{details.modal.client}</span>
              </p>
              <p className="dark:text-white flex items-center text-[15px] sm:text-lg">
                <i className="fa-solid fa-arrow-up-right-from-square text-lg mr-2 hidden sm:block" />
                Preview :&nbsp;
                <span className="font-medium transition-all duration-300 ease-in-out hover:text-modal-text">
                  <a
                    href={details.modal.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {details.modal.preview}
                  </a>
                </span>
              </p>
            </div>
          </div>

          <p className="dark:text-white text-2line font-normal text-[15px] sm:text-sm">
            {details.modal.description}
          </p>
          <div className="pr-3">
            <img
              className="w-full md:h-[450px] h-auto object-cover rounded-xl mt-6"
              src={details.modal.img}
              alt="portfolio image"
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default PortfolioCard;
