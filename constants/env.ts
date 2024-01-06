declare global {
  type AppEnv = typeof ENV
  interface window {
    env: AppEnv
  }
}

const isProcessDev =
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "test"

const ENV = {
  showUnderConstruction: !isProcessDev,
  isBeta: isProcessDev,

  links: {
    // Socials
    discord: "https://discord.gg/eternityrpg",
    medium: "https://medium.com/@playeternity",
    youtube: "https://www.youtube.com/@EternityRPG",
    twitterX: "https://twitter.com/eternityrpg/",
  },

  siteMetadata: {
    title: "The Red Shed | Madison, Wi.",
    url: "https://redshedmadison.com",
    iconSrc: "https://redshedmadison.com/RedShed_Stamp_Classic.png",
    description:
      "The Red Shed is currently undergoing renovations for our new location at 508 State St, Madison. " +
      "Check back in a few weeks to see if we're open yet. Thank you for your continuing patience and faithful service. We're excited to serve you again!",
  },
}

export default ENV
