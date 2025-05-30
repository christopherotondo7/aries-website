import { z, defineCollection } from 'astro:content';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.string().url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const postCollection = defineCollection({
  type: 'content',
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    metadata: metadataDefinition(),
  }),
});

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    hero: z.object({
      title: z.string().optional(),
      subtitle: z.string().optional(),
      image: z.string().optional(),
    }).optional(),
    sections: z.array(z.object({
      type: z.string(),
      title: z.string().optional(),
      subtitle: z.string().optional(),
      content: z.string().optional(),
      highlight: z.string().optional(),
      image: z.object({
        src: z.string(),
        alt: z.string(),
      }).optional(),
      button: z.object({
        text: z.string(),
        href: z.string(),
        style: z.string().optional(),
      }).optional(),
      stats: z.array(z.object({
        label: z.string(),
        value: z.string(),
      })).optional(),
      items: z.array(z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
      })).optional(),
      members: z.array(z.object({
        name: z.string(),
        role: z.string(),
        description: z.string(),
      })).optional(),
    })).optional(),
    mission: z.string().optional(),
  }),
});

export const collections = {
  post: postCollection,
  pages: pagesCollection,
};
