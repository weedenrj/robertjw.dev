import { Section } from "../constants/types";
import client from "../tina/__generated__/client";

export async function getPromos() {
  const promoResponse = await client.queries.promos({ relativePath: "./Promos.md" })
  return promoResponse
}