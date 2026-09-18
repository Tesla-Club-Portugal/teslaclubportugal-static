import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    eyebrow: z.string().optional(),
    headline: z.string().optional(),
    intro: z.string().optional(),
    image: z.string().optional(),
    lang: z.enum(['pt-PT', 'en-GB']).default('pt-PT'),
  }),
});

export const collections = { posts, pages };
