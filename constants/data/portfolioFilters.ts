export interface PortfolioFilter {
  id: string
  name: string
  tag: string
}

export const portfolioFilters: PortfolioFilter[] = [
  {
    id: "filter-1",
    name: "All",
    tag: "*"
  },
  {
    id: "filter-3",
    name: "Business Websites",
    tag: "website"
  },
  {
    id: "filter-4",
    name: "Advanced Projects",
    tag: "advanced"
  },
  {
    id: "filter-5",
    name: "Game Design",
    tag: "game"
  }
] 