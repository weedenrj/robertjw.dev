export interface Education {
  id: string
  year: string
  title: string
  subTitle: string
  bgColor: string
}

export const education: Education[] = [
  {
    id: "education-1",
    year: "2021-2023",
    title: "Ph.D in Horriblensess",
    subTitle: "ABC University, Los Angeles, CA",
    bgColor: "bg-edu-card-one"
  },
  {
    id: "education-2",
    year: "2019 - Present",
    title: "Sr. Software Tester",
    subTitle: "Google Inc.",
    bgColor: "bg-edu-card-two"
  },
  {
    id: "education-3",
    year: "2021",
    title: "Best Developer",
    subTitle: "University Of Melbourne, NA",
    bgColor: "bg-edu-card-one"
  }
] 