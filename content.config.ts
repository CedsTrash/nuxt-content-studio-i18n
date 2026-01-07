import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const commonSchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  category: z.enum(['education', 'women', 'water', 'culture', 'health']),
  status: z.enum(['planned', 'active', 'completed']),
  location: z.string().default('Khamlia, Morocco'),
  goalAmount: z.number(),
  raisedAmount: z.number().default(0),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  coverImage: z.string().optional(),
  gallery: z.array(z.string()).default([]),
  date: z.string()
})

// export default defineContentConfig({
//   collections: {
//     projects_fr: defineCollection({
//       type: 'page',
//       // source: 'fr/projects/**/*.md',
//       source: {
//         include: 'fr/projects/**/*.md',
//         prefix: '/'
//       },
//       schema: commonSchema
//     }),
//     projects_es: defineCollection({
//       type: 'page',
//       source: 'es/projects/**/*.md',
//       schema: commonSchema
//     }),
//     projects_ar: defineCollection({
//       type: 'page',
//       source: 'ar/projects/**/*.md',
//       schema: commonSchema
//     }),
//     projects_it: defineCollection({
//       type: 'page',
//       source: 'it/projects/**/*.md',
//       schema: commonSchema
//     }),
//     projects_de: defineCollection({
//       type: 'page',
//       source: 'de/projects/**/*.md',
//       schema: commonSchema
//     })
//   }
// })

const projectCollectionFor = (locale: string) =>
  defineCollection({
    type: 'page',
    source: {
      // 👇 cible strictement content/{locale}/projects/**
      include: `${locale}/projects/**/*.md`,
    },
    schema: commonSchema,
  })

export default defineContentConfig({
  collections: {
    projects_fr: projectCollectionFor('fr'),
    projects_es: projectCollectionFor('es'),
    projects_ar: projectCollectionFor('ar'),
    projects_it: projectCollectionFor('it'),
    projects_de: projectCollectionFor('de'),

    // ...tes autres collections, pareil : include ciblé (ex: `${locale}/pages/**`)
  },
})
