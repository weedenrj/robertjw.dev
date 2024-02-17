import type { Section } from "./types";

export const Menu: Section[] = [
  {
    title: "Specialties",
    raisedText: "Our classics",
    items: [{
      name: "Long Island Iced Tea",
      description: "Our famouse drink",
      imgSrc: "/two-lits.png",
      emphasized: true
    },
    {
      name: "White Willy",
      description: "Our famouse shot",
      imgSrc: "/beer-mug.png",
      emphasized: false
    },
    {
      name: "Nerds Shot",
      description: "Our famouse shot",
      imgSrc: "/beer-mug.png",
      emphasized: false
    }]
  },
  {
    title: "Drinks",
    raisedText: "Our classics",
    items: [{
      name: "Long Island Iced Tea",
      description: "Our famouse drink",
      imgSrc: "",
      emphasized: true
    },
    {
      name: "White Willy",
      description: "Our famouse shot",
      imgSrc: "",
      emphasized: false
    },
    {
      name: "Nerds Shot",
      description: "Our famouse shot",
      imgSrc: "",
      emphasized: false
    }]
  }
]