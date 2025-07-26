import React from "react"
import clsx from "clsx"
import type { Metadata } from "next"
import { getPortfolio, getPortfolioFilters } from "lib/collections"
import PortfolioContent from "components/Portfolio"

export const metadata: Metadata = {
  title: 'RJW | Portfolio',
  description: `Check out the various projects I've has been a part of over my career.`,
}

export default async function Portfolio() {
  const portfolio = await getPortfolio();
  const filters = await getPortfolioFilters();

  return (
    <div className={clsx("")}>
      <PortfolioContent portfolio={portfolio} filters={filters} />
    </div>
  )
}
