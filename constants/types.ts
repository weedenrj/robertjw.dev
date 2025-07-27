// Import our local data types
import type {
  MenuItem,
  Skill,
  PersonalInfo,
  Clients,
  Portfolio,
  Experience,
  Education,
  ProgressBar,
  PortfolioFilter,
  Knowledges,
  Blog
} from './data'

// Re-export all types for easy importing
export type {
  MenuItem,
  Skill,
  PersonalInfo,
  Clients,
  Portfolio,
  Experience,
  Education,
  ProgressBar,
  PortfolioFilter,
  Knowledges,
  Blog
}

// Simplified query types for direct usage
export type MenuQuery = MenuItem[]
export type SkillsQuery = Skill[]
export type PersonalInfoQuery = PersonalInfo
export type ClientsQuery = Clients
export type PortfolioQuery = Portfolio[]
export type ExperienceQuery = Experience[]
export type EducationQuery = Education[]
export type ProgressBarQuery = ProgressBar[]
export type PortfolioFiltersQuery = PortfolioFilter[]
export type KnowledgesQuery = Knowledges[]
export type BlogsQuery = Blog[]