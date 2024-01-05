// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { Resend } from "resend"
import Email from "../../emails/Email"

const resend = new Resend(process.env.NEXT_PUBLIC_MAIL_KEY)

export default async function sendEmail(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { from, email, message } = JSON.parse(req.body)

  const emailRes = await resend.sendEmail({
    from: `contact@redshedmadison.com`,
    to: "info@redshedmadison.com",
    subject: `${from} contact form submission`,
    react: <Email {...JSON.parse(req.body)} />,
  })

  res.status(200).json(emailRes)
}
