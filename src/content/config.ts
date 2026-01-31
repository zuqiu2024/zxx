import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    published: z.coerce.date(),  // 注意：用 published 不是 pubDate
    pinned: z.boolean().optional().default(false),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    draft: z.boolean().default(false),
    image: z.string().optional(),  // 注意：用 image 不是 featuredImage
    author: z.string().optional(),
  }),
});

export const collections = { posts };