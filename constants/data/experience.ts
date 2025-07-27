export interface Experience {
  id: string
  year: string
  title: string
  subTitle: string
  bgColor: string
}

export const experience: Experience[] = [
  {
    id: "experience-1",
    year: "2017-2021",
    title: "Web Developer",
    subTitle: "Imperialize Technical Institute",
    bgColor: "bg-exp-card-one"
  },
  {
    id: "experience-2",
    year: "2015-2017",
    title: "Sr. Web Developer",
    subTitle: "ib-themes ltd.",
    bgColor: "bg-exp-card-two"
  },
  {
    id: "experience-3",
    year: "2008",
    title: "Writer",
    subTitle: "Online Typodev Solution Ltd.",
    bgColor: "bg-exp-card-one"
  }
] 