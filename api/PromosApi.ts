import { Section } from "../constants/types";
import client from "../tina/__generated__/client";

export async function getPromos(): Promise<Section[]> {
  const cmsQuery = await client.queries.promos({ relativePath: "./Promos.md" })
  const menuData = cmsQuery.data

  const promos = menuData.promos.sections as Section[]

  return promos
}