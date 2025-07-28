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