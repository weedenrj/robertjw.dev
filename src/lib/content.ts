/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call */
import {getCollection, getEntry} from 'astro:content'
import type {CollectionEntry} from 'astro:content'
import type {
  Blog,
  Portfolio,
  Experience,
  Skill,
  MenuItem,
  PersonalInfo,
  Clients,
  Education,
  PortfolioFilter,
  Knowledges,
  ProgressBar,
  Writing,
} from './content-types'

export async function getBlogs(): Promise<Blog[]> {
  const blogEntries = await getCollection('blog')
  return blogEntries.map((entry: CollectionEntry<'blog'>) => ({
    id: entry.id,
    title: entry.data.title,
    date: entry.data.date,
    category: entry.data.category,
    img: entry.data.img,
    link: entry.data.link ?? '',
    modal: entry.data.modal,
    content: entry.body,
  })) satisfies Blog[]
}

export async function getPortfolio(): Promise<Portfolio[]> {
  const portfolioEntries = await getCollection('portfolio')
  return portfolioEntries.map((entry: CollectionEntry<'portfolio'>) => entry.data) satisfies Portfolio[]
}

export async function getExperience(): Promise<Experience[]> {
  const experienceEntries = await getCollection('experience')
  return experienceEntries.map((entry: CollectionEntry<'experience'>) => entry.data) satisfies Experience[]
}

export async function getSkills(): Promise<Skill[]> {
  const skillsEntries = await getCollection('skills')
  return skillsEntries.map((entry: CollectionEntry<'skills'>) => entry.data) satisfies Skill[]
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const menuEntries = await getCollection('menu')
  return menuEntries.map((entry: CollectionEntry<'menu'>) => entry.data) satisfies MenuItem[]
}

export async function getPersonalInfo(): Promise<PersonalInfo> {
  const personalInfoEntry = await getEntry('personalInfo', 'index')
  if (!personalInfoEntry) {
    throw new Error('Personal info not found')
  }
  return personalInfoEntry.data satisfies PersonalInfo
}

export async function getClients(): Promise<Clients> {
  const clientsEntry = await getEntry('clients', 'index')
  if (!clientsEntry) {
    throw new Error('Clients not found')
  }
  return clientsEntry.data satisfies Clients
}

export async function getEducation(): Promise<Education[]> {
  const educationEntries = await getCollection('education')
  return educationEntries.map((entry: CollectionEntry<'education'>) => entry.data) satisfies Education[]
}

export async function getPortfolioFilters(): Promise<PortfolioFilter[]> {
  const filterEntries = await getCollection('portfolioFilters')
  return filterEntries.map((entry: CollectionEntry<'portfolioFilters'>) => entry.data) satisfies PortfolioFilter[]
}

export async function getKnowledges(): Promise<Knowledges> {
  const knowledgesEntry = await getEntry('knowledges', 'index')
  if (!knowledgesEntry) {
    throw new Error('Knowledges not found')
  }
  return knowledgesEntry.data satisfies Knowledges
}

export async function getProgressBar(): Promise<ProgressBar[]> {
  const progressBarEntries = await getCollection('progressBar')
  return progressBarEntries.map((entry: CollectionEntry<'progressBar'>) => entry.data) satisfies ProgressBar[]
}

export async function getWritings(): Promise<Writing[]> {
  const writingsEntries = await getCollection('writings')
  return writingsEntries.map((entry: CollectionEntry<'writings'>) => ({
    id: entry.slug,
    title: entry.data.title,
    date: entry.data.date,
    author: entry.data.author,
    content: entry.body,
  })) satisfies Writing[]
}
