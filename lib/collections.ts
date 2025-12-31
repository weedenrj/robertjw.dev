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

export function getProgressBars() {
  return progressBar
}

export function getKnowledges() {
  return [knowledges]
}

export function getExperiences() {
  return experience
}

export function getEducations() {
  return education
}

export function getMenu() {
  return menuItems
}

export function getPersonalInfo() {
  return personalInfo
}

export function getClients() {
  return clients
}

export function getSkills() {
  return skills
}

export function getPortfolio() {
  return portfolio
}

export function getPortfolioFilters() {
  return portfolioFilters
}

export function getBlogs() {
  return blogs
}
