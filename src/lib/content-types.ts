import type {CollectionEntry} from 'astro:content'

export type BlogEntry = CollectionEntry<'blog'>
export type PortfolioEntry = CollectionEntry<'portfolio'>
export type ExperienceEntry = CollectionEntry<'experience'>
export type SkillsEntry = CollectionEntry<'skills'>
export type MenuEntry = CollectionEntry<'menu'>
export type PersonalInfoEntry = CollectionEntry<'personalInfo'>
export type ClientsEntry = CollectionEntry<'clients'>
export type EducationEntry = CollectionEntry<'education'>
export type PortfolioFiltersEntry = CollectionEntry<'portfolioFilters'>
export type KnowledgesEntry = CollectionEntry<'knowledges'>
export type ProgressBarEntry = CollectionEntry<'progressBar'>
export type WritingsEntry = CollectionEntry<'writings'>

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
  content?: string
}

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

export interface Experience {
  id: string
  year: string
  title: string
  subTitle: string
  bgColor: string
}

export interface Skill {
  id: string
  skill: string
  about: string
  img: string
  bgColor: string
}

export interface MenuItem {
  id: string
  name: string
  link: string
  icon: string
  enabled: boolean
}

export interface SocialMedia {
  upwork: string
  github: string
  gitlab: string
  linkedIn: string
}

export interface PersonalInformation {
  name: string
  profession: string
  experience: string
  email: string
  location: string
  birthday: string
  socialMedia: SocialMedia
}

export interface PersonalInfo {
  information: PersonalInformation
  body: string
}

export interface Clients {
  clientImg: string[]
}

export interface Education {
  id: string
  year: string
  title: string
  subTitle: string
  bgColor: string
}

export interface PortfolioFilter {
  id: string
  name: string
  tag: string
}

export interface Knowledges {
  skill: string[]
}

export interface ProgressBar {
  id: string
  title: string
  percentage: number
  bgColor: string
}

export type MenuQuery = MenuItem[]
export type SkillsQuery = Skill[]
export type PersonalInfoQuery = PersonalInfo
export type ClientsQuery = Clients
export type PortfolioQuery = Portfolio[]
export type ExperienceQuery = Experience[]
export type EducationQuery = Education[]
export type ProgressBarQuery = ProgressBar[]
export type PortfolioFiltersQuery = PortfolioFilter[]
export type KnowledgesQuery = Knowledges
export type BlogsQuery = Blog[]

export interface Writing {
  id: string
  title: string
  date: string
  author?: string
  content: string
}

export type WritingsQuery = Writing[]
