import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/**/*.md',
      schema: z.object({
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
        date: z.string(),
        locale: z.enum(['fr', 'es', 'ar', 'it', 'de']).default('fr')
      })
    })
  }
})
