import client from "tina/__generated__/client"

export async function getMenu() {
  const menuResponse = await client.queries.menu({ relativePath: "./Menu.md" })
  return menuResponse
}

export async function getPromos() {
  const promoResponse = await client.queries.promos({ relativePath: "./Promos.md" })
  return promoResponse
}

export async function getHomepageContext() {
  const promoResponse = await client.queries.home({ relativePath: "./Home.md" })
  return promoResponse
}