import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "menu",
        label: "Menu",
        path: "content/menu",
        fields: [
          {
            type: "object",
            name: "sections",
            label: "Sections",
            list: true,
            required: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "raisedText",
                label: "Raised Text",
              },
              {

                name: "items",
                label: "Items",
                type: "object",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Name",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    required: true,
                  },
                  {
                    name: "image",
                    label: "Image",
                    type: "image",
                    required: true,
                  },
                  {
                    type: "number",
                    name: "price",
                    label: "Price",
                  },
                  {
                    name: "emphasized",
                    label: "Emphasized",
                    type: "boolean",
                  },
                ],
              }
            ],
          },
        ],
      },
      {
        name: "promos",
        label: "Promos",
        path: "content/promos",
        fields: [
          {
            type: "object",
            name: "sections",
            label: "Sections",
            list: true,
            required: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "raisedText",
                label: "Raised Text",
              },
              {

                name: "items",
                label: "Items",
                type: "object",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Name",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    required: true,
                  },
                  {
                    type: "number",
                    name: "originalPrice",
                    label: "Original Price",
                  },
                  {
                    type: "number",
                    name: "discountPrice",
                    label: "Discount Price",
                  },
                  {
                    name: "image",
                    label: "Image",
                    type: "image",
                    required: true,
                  },
                  {
                    name: "emphasized",
                    label: "Emphasized",
                    type: "boolean",
                  },
                ],
              }
            ],
          },
        ],
      },
    ],
  },
});
