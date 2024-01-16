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

  socials: {
    // Socials
    Instagram: "https://www.instagram.com/redshedmadison/",
    Facebook: "https://www.facebook.com/profile.php?id=100049266175993",
    TwitterX: "https://twitter.com/TheRealRedShed",
  },

  siteMetadata: {
    title: "The Red Shed | Madison, Wi.",
    url: "https://redshedmadison.com",
    iconSrc: "https://redshedmadison.com/RedShed_Stamp_Classic.png",
    description:
      "The Red Shed is currently undergoing renovations for our new location at 508 State St, Madison. " +
      "Check back in a few weeks to see if we're open yet. Thank you for your continuing patience and faithful service. We're excited to serve you again!",
  },

  reviews: {
    DavidHaldane: {
      name: "David Haldane",
      text: "Good atmosphere and friendly, attentive bartenders.",
      profilePic: "/profile-1.webp",
    },
    DianeDunning: {
      name: "Diane Dunning",
      text: "Love this place! Entertainment kept me laughing all night!",
      profilePic: "/profile-2.png",
    },
    JeffMiller: {
      name: "Jeff Miller",
      text: "Best Long Island Ice Teas ever anywhere!",
      profilePic: "/profile-3.png",
    },
    DanHughes: {
      name: "Dan Hughes",
      text: "Great tasty Long Islands! Must stop when in Madison!",
      profilePic: "/profile-5.png",
    },
    MegT: {
      name: "MegT",
      text: "Best Bar in Madison! Drinks are cheap and good...",
      profilePic: "/profile-4.png",
    },
  },

  ourSpecialties: {
    LongIslandIcedTea: {
      id: "LongIslandIcedTea",
      title: "Long Island Iced Tea",
      text: "”The real thing”, a massive 32 oz. mix of heaven, served in the iconic Ball mason jar and topped with a lemon slice, all for the cheap price of $9.",
      smallImg: "/LIT_Stock.png",
      bigImg: "/LIT_Stock_Big.png",
    },
    // NerdsDrink: {
    //   id: "NerdsDrink",
    //   title: "Nerds Shot and Drink",
    //   text: "",
    //   smallImg: "/LIT_Stock.png",
    //   bigImg: "/LIT_Stock_Big.png",
    // },
    // WhiteWilley: {
    //   id: "WhiteWilley",
    //   title: "White Willey Shot and Drink",
    //   text: "",
    //   smallImg: "/LIT_Stock.png",
    //   bigImg: "/LIT_Stock_Big.png",
    // },
  },
}

export default ENV
