export interface Skill {
  id: string
  skill: string
  about: string
  img: string
  bgColor: string
}

export const skills: Skill[] = [
  {
    id: "skill-1",
    skill: "Web Development",
    about: "Big or small, web projects are my bread and butter. Small Business sites, advanced interfaces, APIs, emails....you want it, I've got you covered.",
    img: "/assets/icons/icon5.svg",
    bgColor: "bg-codeBlue"
  },
  {
    id: "skill-2",
    skill: "App Development",
    about: "I enjoy leveraging the amazing power of the modern browser to make highly performant, cross-platform applications.",
    img: "/assets/icons/icon1.svg",
    bgColor: "bg-[#F3B929]"
  },
  {
    id: "skill-3",
    skill: "Problem Solving",
    about: "Years of professional experience and a lifetime of tinkering in the garage helps me look at problems from different perspectives.",
    img: "/assets/icons/Gear.svg",
    bgColor: "bg-codePurple"
  },
  {
    id: "skill-4",
    skill: "Team Leadership",
    about: "From guiding squadrons of airmen to supporting and managing groups of engineers, I've always been a natural leader and thrive when working in teams.",
    img: "/assets/icons/Team.svg",
    bgColor: "bg-[#82AB82]"
  }
] 