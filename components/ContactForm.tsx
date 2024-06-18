'use client'

import clsx from 'clsx';
import React, { useState } from 'react'
import useDebounce from 'hooks/UseDebounce';

export type ContactFormProps = {
} & React.HTMLAttributes<HTMLDivElement>

export default function ContactForm({
  className,
  ...rest
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const debouncedEmail = useDebounce(formData.email, 500)

  const formValid = formData.name && formData.message && formData.email && formData.email.includes("@")
  const subject = `subject=Contact form submission from ${formData.name} <${formData.email}>`;
  const body = `body=${formData.message}`;
  const mailto = `mailto:robertweeden1997@gmail.com?${subject}&${body}`;

  return (
    <div className={clsx(className, "mx-4 md:mx-[60px] p-4",
      "md:p-16 dark:border-dark-border dark:border-2",
      "bg-light-bg rounded-xl dark:bg-dark-primary mb-[30px] md:mb-[60px]"
    )}
      {...rest}
    >
      <h3 className="text-[1.5625rem]">
        <span className="text-text-primary dark:text-main-text">
          I&apos;m always open to discussing
        </span>
        <br />
        <span className="font-semibold dark:text-white">
          application development and ideas.
        </span>
      </h3>

      <div
        className="returnmessage"
        data-success="Your message has been received, We will contact you soon."
      >
      </div>
      <div className="empty_notice">
        <span className="dark:text-main-text">Please Fill Required Fields</span>
      </div>


      <div className="relative z-0 w-full mt-[40px] mb-8 group">
        <input
          type="text"
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="text-input peer"
          required
        />
        <label
          className="text-input-label"
        >
          Name *
        </label>
      </div>


      <div className="relative z-0 w-full mb-8 group">
        <input
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="text-input peer"
          required
        />
        <label className="text-input-label">
          Email *
          {debouncedEmail !== "" && !debouncedEmail.includes("@") && (
            <span className='ml-2 text-red-500'>
              (Must contain @)
            </span>
          )}
        </label>
      </div>


      <div className="relative z-0 w-full mb-8 group">
        <input
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          className="text-input peer"
          required
        />
        <label
          className="text-input-label"
        >
          Message *
        </label>
      </div>

      <a href={mailto} className={clsx(!formValid && "hover:cursor-not-allowed")}>
        <button
          type='submit'
          disabled={!formValid}
          className={clsx("px-6 py-2 rounded-lg border-[2px] mt-3",
            "border-color-910 font-semibold",
            formValid ? "cursor-pointer" : "hover:cursor-not-allowed",
            "hover:bg-gradient-to-r from-btn-primary to-btn-secondary hover:text-white",
            "transition-colors duration-300 ease-in-out hover:border-transparent",
            "dark:text-white"
          )}
        >
          Send email
        </button>
      </a>
    </div>
  )
}
