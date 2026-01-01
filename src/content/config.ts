import {defineCollection, z} from 'astro:content'

const portfolio = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    category: z.string(),
    tags: z.string(),
    img: z.string(),
    link: z.string(),
    modal: z.object({
      title: z.string(),
      project: z.string(),
      client: z.string(),
      languages: z.string(),
      preview: z.string(),
      link: z.string(),
      description: z.string(),
      img: z.string(),
    }),
  }),
})

const skills = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    skill: z.string(),
    about: z.string(),
    iconName: z.string(),
    iconColor: z.string(),
    bgColor: z.string(),
  }),
})

const menu = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    name: z.string(),
    link: z.string(),
    icon: z.string(),
    enabled: z.boolean(),
  }),
})

const personalInfo = defineCollection({
  type: 'data',
  schema: z.object({
    information: z.object({
      name: z.string(),
      profession: z.string(),
      experience: z.string(),
      email: z.string(),
      location: z.string(),
      birthday: z.string(),
      socialMedia: z.object({
        upwork: z.string(),
        github: z.string(),
        gitlab: z.string(),
        linkedIn: z.string(),
      }),
    }),
    body: z.string(),
  }),
})

const clients = defineCollection({
  type: 'data',
  schema: z.object({
    clientImg: z.array(z.string()),
  }),
})

const portfolioFilters = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    name: z.string(),
    tag: z.string(),
  }),
})

const writings = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    author: z.string(),
    note: z.string().default(''),
  }),
})

export const collections = {
  portfolio,
  skills,
  menu,
  personalInfo,
  clients,
  portfolioFilters,
  writings,
}
