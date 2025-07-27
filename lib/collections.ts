import {
  progressBar,
  knowledges,
  experience,
  education,
  menuItems,
  personalInfo,
  clients,
  skills,
  portfolio,
  portfolioFilters,
  blogs
} from "constants/data"

export async function getProgressBars() {
  return progressBar
}

export async function getKnowledges() {
  return [knowledges]
}

export async function getExperiences() {
  return experience
}

export async function getEducations() {
  return education
}

export async function getMenu() {
  return menuItems
}

export async function getPersonalInfo() {
  return personalInfo
}

export async function getClients() {
  return clients
}

export async function getSkills() {
  return skills
}

export async function getPortfolio() {
  return portfolio
}

export async function getPortfolioFilters() {
  return portfolioFilters
}

export async function getBlogs() {
  return blogs
}
