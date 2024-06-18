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
          className="block autofill:bg-transparent py-2.5 px-0 w-full text-sm text-text-primary bg-transparent border-0 border-b-[2px] border-light-border appearance-none dark:text-white dark:border-dark-borde-secondary dark:focus:border-dark-focus-border focus:outline-none focus:ring-0 focus:border-dark-focus-border peer"
          required
        />
        <label
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-main-text duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-dark-focus-border peer-focus:dark:text-dark-focus-border peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
        >
          Name *
        </label>
      </div>


      <div className="relative z-0 w-full mb-8 group">
        <input
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="block autofill:text-red-900 needed py-2.5 px-0 w-full text-sm text-text-primary bg-transparent border-0 border-b-[2px] border-light-border appearance-none dark:text-white dark:border-dark-borde-secondary dark:focus:border-dark-focus-border focus:outline-none focus:ring-0 focus:border-focus-border-one peer"
          required
        />
        <label

          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-main-text duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-focus-text-one peer-focus:dark:text-dark-focus-border peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
        >
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
          className="block py-2.5 px-0 w-full text-sm text-text-primary bg-transparent border-0 border-b-[2px] border-light-border appearance-none dark:text-white dark:border-dark-borde-secondary dark:focus:border-dark-focus-border focus:outline-none focus:ring-0 focus:border-focus-border-two peer"
          required
        />
        <label
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-main-text duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-focus-border-two peer-focus:dark:text-dark-focus-border peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
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
