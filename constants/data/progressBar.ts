export interface ProgressBar {
  id: string
  title: string
  percentage: number
  bgColor: string
}

export const progressBar: ProgressBar[] = [
  {
    id: "progressBar-1",
    title: "Web Design",
    percentage: 65,
    bgColor: "bg-progress-bg-one"
  },
  {
    id: "progressBar-2",
    title: "Mobile App",
    percentage: 85,
    bgColor: "bg-progress-bg-two"
  },
  {
    id: "progressBar-3",
    title: "Illustrator",
    percentage: 75,
    bgColor: "bg-progress-bg-three"
  },
  {
    id: "progressBar-4",
    title: "Photoshope",
    percentage: 90,
    bgColor: "bg-progress-bg-four"
  }
] 