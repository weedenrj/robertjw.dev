export type Specialty = {
  id: string,
  title: string,
  text: string,
  smallImg: string,
  bigImg: string,
}

export type Review = {
  name: string,
  text: string,
  profilePic: string,
}

export type Item = {
  imgSrc?: string
  name: string
  description: string
  emphasized?: boolean
}

export type Section = {
  title: string
  raisedText?: string
  items: Item[]
}