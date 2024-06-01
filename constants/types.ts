import { Exact, } from "tina/__generated__/types"

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
  image?: string
  name: string
  description: string
  emphasized?: boolean
  price?: number
  originalPrice?: number
  discountPrice?: number
}

export type Section = {
  title: string
  raisedText?: string 
  items: Item[]
}

export type TinaResponse = {
  data: any;
  errors?: {
    message: string;
    locations: {
      line: number;
      column: number;
    }[];
    path: string[];
  }[] | undefined;
  variables: Exact<{
    relativePath: string;
  }>;
  query: string;
}