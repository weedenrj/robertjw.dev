import clsx from "clsx"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Antonio, Lato } from "next/font/google"

const titleFont = Antonio({
  variable: "--title-font",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
})
const bodyFont = Lato({
  variable: "--body-font",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={clsx(titleFont.variable, bodyFont.variable)}>
      <Component {...pageProps} />
    </main>
  )
}
