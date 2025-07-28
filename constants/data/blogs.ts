export interface BlogModal {
  id?: number
  date: string
  category: string
  title: string
  blogImg: string
}

export interface Blog {
  id: string
  title: string
  date: string
  category: string
  img: string
  link: string
  modal: BlogModal
}

export const blogs: Blog[] = [
  {
    id: "blog-1",
    title: "How to Own Your Audience by Creating an Email List.",
    date: "17 April",
    category: "Inspiration",
    img: "/assets/blog-images/small/1.jpg",
    link: "#ex1",
    modal: {
      date: "10 APR",
      category: "Inspiration",
      title: "How to Own Your Audience by Creating an Email List.",
      blogImg: "/assets/blog-images/1.jpg"
    }
  }
] 