export interface PortfolioModal {
  title: string
  project: string
  client: string
  languages: string
  preview: string
  link: string
  description: string
  img: string
}

export interface Portfolio {
  id: string
  title: string
  category: string
  tags: string
  img: string
  link: string
  modal: PortfolioModal
}

export interface Skill {
  id: string
  skill: string
  about: string
  iconName: string
  iconColor: string
  bgColor: string
}

export interface MenuItem {
  id: string
  name: string
  link: string
  icon: string
  enabled: boolean
}

export interface PersonalInfo {
  information: {
    name: string
    profession: string
    experience: string
    email: string
    location: string
    birthday: string
    socialMedia: {
      upwork: string
      github: string
      gitlab: string
      linkedIn: string
    }
  }
  body: string
}

export interface PortfolioFilter {
  id: string
  name: string
  tag: string
}

export interface Writing {
  id: string
  title: string
  date: string
  author: string
  content: string
  note: string
}
