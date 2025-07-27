export interface PortfolioModal {
  title: string
  project: string
  client: string
  languages: string
  preview: string
  link: string
  description: string
  img: string
}

export interface Portfolio {
  id: string
  title: string
  category: string
  tags: string
  img: string
  link: string
  modal: PortfolioModal
}

export const portfolio: Portfolio[] = [
  {
    id: "portfolio-1",
    title: "Eternity RPG",
    category: "Game Development",
    tags: "advanced, game",
    img: "/assets/work-images/gamerPack.webp",
    link: "#portfolioOne",
    modal: {
      title: "Eternity RPG",
      project: "Web based video game",
      client: "Eternity DAO",
      languages: "React, Vite, Redux, TailwindCSS, Phaser 3",
      preview: "https://playeternity.io/",
      link: "https://playeternity.io/",
      description: "Eternity is a browser based video game that I helped build with a small team. The game is fully functional and still active today. Eternity is built entirely with the same technologies used to power the apps you know and love today. This project took a tremendous amount of problem solving and outside-the-box thinking and proved to be the most educational and advanced app I've built yet.",
      img: "/assets/work-images/victory.webp"
    }
  },
  {
    id: "portfolio-2",
    title: "Vally Pro",
    category: "Payments and Scheduling",
    tags: "advanced, portal, saas",
    img: "/assets/work-images/scottStripedBass.png",
    link: "#portfolioTwo",
    modal: {
      title: "Vally Pro",
      project: "Payments and Scheduling Saas Product",
      client: "Vally Pro",
      languages: "Next.js, TailwindCSS, REST API, Stripe API, Email System",
      preview: "vallypro.com",
      link: "https://vallypro.com/",
      description: "Vally Pro is an up-and-coming B2B application in the fishing industry. The application is used by business owners and their customers to schedule, book, and pay for fishing excursions and boat trips. This app has lots of complex logic going on behind the scenes and has been a blast to create.",
      img: "/assets/work-images/Screenshot 2024-06-04 at 4.05.24 PM.png"
    }
  },
  {
    id: "portfolio-3",
    title: "The Red Shed",
    category: "Small business",
    tags: "ui/ux, website, content management, small business",
    img: "/assets/work-images/longIsland.webp",
    link: "#portfolioFive",
    modal: {
      title: "The Red Shed",
      project: "Website with content management system",
      client: "Red Shed LLC.",
      languages: "Next.js, Content Management, TailwindCSS",
      preview: "redshedmadison.com",
      link: "https://www.redshedmadison.com/building",
      description: "The Red Shed is a historic small business in Madison WI. They recently had a website built to welcome the business into the digital age. I had the honor or creating this site with help from a wonderful designer. This project includes a content management system so that the owners can update their hours, menu, promos, and much more without the need for an engineer to step in.",
      img: "/assets/work-images/Screenshot 2024-06-04 at 4.03.07 PM.png"
    }
  },
  {
    id: "portfolio-5",
    title: "Brodhead Aviation",
    category: "Small business",
    tags: "ui/ux, website",
    img: "/assets/work-images/piet.jpeg",
    link: "#portfolioFive",
    modal: {
      title: "Brodhead aviation",
      project: "Small business website",
      client: "Brodhead Aviation LLC.",
      languages: "Astro.js, TailwindCSS",
      preview: "brodheadaviation.com/",
      link: "https://www.brodheadaviation.com/",
      description: "Antique aircraft restoration done right. Brodhead aviation specializes in restoring antique and experimental airplanes, fabric covering and painting, common inspections and maintenance.",
      img: "/assets/work-images/brodheadAviation.png"
    }
  }
] 