import client from "tina/__generated__/client";

export async function getProgressBars() {
  const progressBarConnection = await client.queries.progressBarConnection();
  const progressBars = progressBarConnection.data.progressBarConnection.edges
    ?.map(progress => progress.node).filter(Boolean) || []

  return progressBars
}

export async function getKnowledges() {
  const knowledgesConnection = await client.queries.knowledgesConnection();
  const knowledges = knowledgesConnection.data.knowledgesConnection.edges
    ?.map(know => know.node).filter(Boolean) || []

  return knowledges
}

export async function getExperiences() {
  const experienceConnection = await client.queries.experienceConnection();
  const knowledges = experienceConnection.data.experienceConnection.edges
    ?.map(experience => experience.node).filter(Boolean) || []

  return knowledges
}

export async function getEducations() {
  const educationConnection = await client.queries.educationConnection();
  const knowledges = educationConnection.data.educationConnection.edges
    ?.map(education => education.node).filter(Boolean) || []

  return knowledges
}

export async function getMenu() {
  const menuConnection = await client.queries.menuConnection();
  const menu = menuConnection.data.menuConnection.edges
    ?.map(menu => menu.node).filter(Boolean) || []

  return menu
}

export async function getPersonalInfo() {
  const personalInfoQuery = await client.queries.personalInfo({ relativePath: "/info.md" });
  const personalInfo = personalInfoQuery.data.personalInfo

  return personalInfo
}

export async function getClients() {
  const clientsConnection = await client.queries.clients({ relativePath: "index.md" });
  const clients = clientsConnection.data.clients

  return clients
}

export async function getSkills() {
  const skillsConnection = await client.queries.skillsConnection();
  const skills = skillsConnection.data.skillsConnection.edges
    ?.map(skill => skill.node).filter(Boolean) || []

  return skills
}

export async function getWorks() {
  const worksConnection = await client.queries.worksConnection();
  const works = worksConnection.data.worksConnection.edges
    ?.map(work => work.node).filter(Boolean) || []

  return works
}

export async function getPortfolioFilters() {
  const portfolioFiltersConnection = await client.queries.portfolioFiltersConnection();
  const filters = portfolioFiltersConnection.data.portfolioFiltersConnection.edges
    ?.map(filter => filter.node).filter(Boolean) || []

  return filters
}

export async function getBlogs() {
  const blogsConnection = await client.queries.blogsConnection();
  const blogs = blogsConnection.data.blogsConnection.edges
    ?.map(blog => blog.node).filter(Boolean) || []

  return blogs
}
