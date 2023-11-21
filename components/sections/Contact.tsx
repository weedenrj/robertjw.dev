import React from "react";
import clsx from "clsx";
import Title from "../common/Title";
import Button from "../common/Button";
import sendEmail from '../../pages/api/'
import useAsyncState from '../../hooks/UseAsyncState'

export type ContactProps = {
} & React.HTMLAttributes<HTMLDivElement>

export default function Contact({

  className,
  ...rest
}: ContactProps) {
  const { data, isLoading, setAsync } = useAsyncState()

  const submitForm = (e: any) => {
    e.preventDefault();

    setAsync(async () => {
      const formData = {
        from: `${e.target.firstName.value} ${e.target.lastName.value}`,
        email: e.target.email.value,
        phone: e.target.phone.value,
        message: e.target.message.value
      }

      const res = await fetch("/api", {
        method: "POST",
        body: JSON.stringify(formData)
      })
      return res.json()
    })
  }

  return (
    <div className={clsx(className, "flex flex-col items-center justify-start w-full",
      "gap-4 pt-16 pb-24 lg:pb-36 px-8",
      "bg-white border-y-2 border-yellow border-opacity-20"
    )}
      {...rest}
    >

      <Title className="text-6xl lg:text-7xl">
        Contact us
      </Title>
      <h2 className="text-center font-lato text-base lg:text-lg md:max-w-[500px]">
        Want us to ballpark the cost of your project, need an annual, or have some more questions?
        We&apos;d love to chat about it. Shoot us an email and we&apos;ll get back to you as quickly as possible.
      </h2>

      <form className="w-full max-w-7xl" onSubmit={submitForm}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-1/2 px-3">
            <label className="block uppercase tracking-wide  text-xs font-bold mb-2"
              htmlFor="firstName">
              First Name <span className="text-red">*</span>
            </label>
            <input className={clsx("appearance-none block w-full bg-yellow bg-opacity-30 border border-gray-400",
              "rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-opacity-50 focus:border-gray-500")}
              id="firstName" name="firstName" type="text" placeholder="John" required />
          </div>
          <div className="w-1/2 px-3">
            <label className="block uppercase tracking-wide  text-xs font-bold mb-2"
              htmlFor="lastName">
              Last Name <span className="text-red">*</span>
            </label>
            <input className={clsx("appearance-none block w-full bg-yellow bg-opacity-30  border border-gray-400",
              "rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-opacity-50 focus:border-gray-500")}
              id="lastName" name="lastName" type="text" placeholder="Doe" required />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-1/2 px-3">
            <label className="block uppercase tracking-wide  text-xs font-bold mb-2"
              htmlFor="email">
              E-mail <span className="text-red">*</span>
            </label>
            <input className={clsx("appearance-none block w-full bg-yellow bg-opacity-30  border border-gray-400",
              "rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-opacity-50 focus:border-gray-500")}
              id="email" type="email" name="email" placeholder="myplaneneedshelp@coolmail.com" required />
          </div>
          <div className="w-1/2 px-3">
            <label className="block uppercase tracking-wide  text-xs font-bold mb-2"
              htmlFor="phone">
              Phone number <span className="text-red">*</span>
            </label>
            <input className={clsx("appearance-none block w-full bg-yellow bg-opacity-30 border border-gray-400",
              "rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-opacity-50 focus:border-gray-500")}
              id="phone" type="phone" name="phone" placeholder="608-123-4567" required />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide  text-xs font-bold mb-2"
              htmlFor="message">
              Message <span className="text-red">*</span>
            </label>
            <textarea 
              className={clsx("whitespace-pre no-resize appearance-none block w-full bg-yellow bg-opacity-30 border border-gray-400",
              "rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-opacity-50 focus:border-gray-500 h-48 resize-none")}
              id="message" name="message" placeholder="Hey Brodhead Aviation! My plane needs help..." required>

            </textarea>
          </div>
        </div>
        <div className="md:flex md:items-center">
          <input type="submit" value={isLoading ? "Sending..." : data ? "Sent!" : "Send message"}
            className={clsx(className, "flex justify-center bg-red hover:bg-darkRed",
              "rounded-lg border border-darkYellow hover:border-yellow hover:cursor-pointer",
              "font-title text-2xl text-white text-center tracking-wider",
              "pb-2 px-3",
              "text-shadow-black-border-bottom-thin",
              "w-36",
              isLoading ? "hover:cursor-wait" : Boolean(data) ? "hover:cursor-not-allowed" : "hover:cursor-pointer"
            )}
            disabled={Boolean(data)}
          />
        </div>
      </form>
    </div>
  )
}
