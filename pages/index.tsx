import Navbar from '@components/common/Navbar'
import Page from '@components/common/Page'

export default function Home() {
  return (
    <Page SEO={{
      title: "The Red Shed | Madison, Wi.",
      url: "https://redshedmadison.com",
      image: "https://redshedmadison.com/logo.png",
      desc: "The Red Shed is open every weekend until 2 pm."
    }}>
      {/* <Navbar /> */}


      <div className="flex flex-col h-full w-full justify-center items-center gap-4 p-4 font-mono overflow-hidden">
        <div className='relative flex flex-col justify-center items-center'>
          <div className="absolute top-0 -left-4 w-72 h-72 bg-red rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000" />

          <p className='md:relative md:z-10 text-3xl md:text-5xl'>
            👷Oops!⛔
          </p>
          <p className='md:relative md:z-10 text-base md:text-3xl text-center'>
            We&apos;re still building. <br /> Check back in a few weeks
          </p>
        </div>
      </div>

    </Page>
  )
}
