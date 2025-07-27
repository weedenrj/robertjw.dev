import React, { useState } from "react";
import Modal from "./Modal";
import type { Blog } from "constants/types";
import clsx from "clsx";

export type BlogCardProps = {
  details: Blog
} & React.HTMLAttributes<HTMLDivElement>

export function BlogCard({
  details,

  className,
  ...rest
}: BlogCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={clsx("p-5 rounded-lg mb-2 h-full bg-light-bg-secondary",
        "dark:bg-transparent dark:border-dark-border dark:border-2"
      )}
        {...rest}
      >
        <div className="overflow-hidden rounded-lg">
          <a href={details.link}>
            <img
              className="rounded-lg w-full cursor-pointer transition duration-200 ease-in-out transform hover:scale-110"
              src={details.img}
              alt="blog image"
              onClick={() => setShowModal(true)}
            />
          </a>
        </div>
        <div className="flex mt-4 text-tiny text-text-primary dark:text-main-text">
          <span>{details.date}</span>
          <span className="relative transform pl-6 after:absolute after:content-[''] after:left-2 after:top-1/2 after:h-1 after:w-1 after:traslate-y-[-50%] after:rounded-full after:bg-text-primary">
            {details.category}
          </span>
        </div>
        <h3
          className="text-lg font-medium dark:text-white duration-300 transition cursor-pointer mt-3 pr-4 hover:text-btn-primary dark:hover:text-btn-primary"
          onClick={() => setShowModal(true)}
        >
          <a href={details.link}>{details.title}</a>
        </h3>
      </div>

      {showModal && (
        <Modal closeModal={() => setShowModal(false)}>
          <div className="pr-3 pb-2">
            <img
              className="w-full md:h-[450px] object-cover rounded-xl mt-6"
              src={details.modal.blogImg}
              alt="blog image"
            />
            <div className="flex mt-4 text-tiny text-black dark:text-white">
              <span>{details.modal.date}</span>
              <span className="relative transform pl-6 after:absolute after:content-[''] after:left-2 after:top-1/2 after:h-1 after:w-1 after:traslate-y-[-50%] after:rounded-full after:bg-text-primary">
                Inspiration
              </span>
            </div>
            <h2 className="dark:text-white sm:text-3xl mt-2 font-medium">
              {details.modal.title}
            </h2>
            <p

              className="dark:text-white font-normal text-[15px] sm:text-sm my-4"
            >
              body here
            </p>
          </div>
        </Modal>
      )}
    </>
  )
}

export default BlogCard