import {getCollection, getEntry} from 'astro:content'
import type {CollectionEntry} from 'astro:content'
import type {
  Portfolio,
  Skill,
  MenuItem,
  PersonalInfo,
  PortfolioFilter,
  Writing,
} from './content-types'

export async function getPortfolio(): Promise<Portfolio[]> {
  const portfolioEntries = await getCollection('portfolio')
  return portfolioEntries.map((entry: CollectionEntry<'portfolio'>) => entry.data) satisfies Portfolio[]
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

export async function getClients(): Promise<string[]> {
  const clientsEntry = await getEntry('clients', 'index')
  if (!clientsEntry) {
    throw new Error('Clients not found')
  }
  return clientsEntry.data.clientImg
}

export async function getPortfolioFilters(): Promise<PortfolioFilter[]> {
  const filterEntries = await getCollection('portfolioFilters')
  return filterEntries.map((entry: CollectionEntry<'portfolioFilters'>) => entry.data) satisfies PortfolioFilter[]
}

export async function getWritings(): Promise<Writing[]> {
  const writingsEntries = await getCollection('writings')
  return writingsEntries.map((entry: CollectionEntry<'writings'>) => ({
    id: entry.slug,
    title: entry.data.title,
    date: entry.data.date,
    author: entry.data.author,
    content: entry.body,
    note: entry.data.note,
  })) satisfies Writing[]
}
