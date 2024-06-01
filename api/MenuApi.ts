import client from "../tina/__generated__/client";

export const getMenu = async () => {
  const menuResponse = await client.queries.menu({ relativePath: "./Menu.md" })
  return menuResponse
}