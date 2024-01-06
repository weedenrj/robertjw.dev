declare global {
  type AppEnv = typeof ENV
  interface window {
    env: AppEnv
  }
}

const isProcessDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"

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
}

export default ENV
