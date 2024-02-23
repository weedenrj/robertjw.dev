import { Section } from "../constants/types";
import client from "../tina/__generated__/client";

export const getMenu = async (): Promise<Section[]> => {
  const cmsQuery = await client.queries.menu({ relativePath: "./Menu.md" })
  const menuData = cmsQuery.data

  const menu = menuData.menu.sections as Section[]

  return menu
}