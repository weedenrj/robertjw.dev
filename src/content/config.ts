import {defineCollection, z} from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.string(),
    img: z.string(),
    link: z.string().optional(),
    modal: z.object({
      date: z.string(),
      category: z.string(),
      title: z.string(),
      blogImg: z.string(),
    }),
  }),
})

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

const experience = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    year: z.string(),
    title: z.string(),
    subTitle: z.string(),
    bgColor: z.string(),
  }),
})

const skills = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    skill: z.string(),
    about: z.string(),
    img: z.string(),
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

const education = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    year: z.string(),
    title: z.string(),
    subTitle: z.string(),
    bgColor: z.string(),
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

const knowledges = defineCollection({
  type: 'data',
  schema: z.object({
    skill: z.array(z.string()),
  }),
})

const progressBar = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    percentage: z.number(),
    bgColor: z.string(),
  }),
})

const writings = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    author: z.string().optional(),
  }),
})

export const collections = {
  blog,
  portfolio,
  experience,
  skills,
  menu,
  personalInfo,
  clients,
  education,
  portfolioFilters,
  knowledges,
  progressBar,
  writings,
}
