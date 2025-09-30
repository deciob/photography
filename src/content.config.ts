// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

// 2. Import loader(s)
import { glob } from "astro/loaders";

const gallery = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/gallery" }),
  schema: z.object({
    title: z.string(),
    filename: z.string(),
    alt: z.string().optional(),
  }),
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { gallery };
