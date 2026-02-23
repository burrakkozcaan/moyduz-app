import { defineType, defineField } from 'sanity'

export const template = defineType({
  name: 'template',
  title: 'Template',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Template Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'designer',
      title: 'Creator',
      type: 'string',
    }),
    defineField({
      name: 'primaryCategory',
      title: 'Primary Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Subcategories / Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'about',
      title: 'About this Template',
      type: 'blockContent',
    }),
    defineField({
      name: 'perfectFor',
      title: 'Perfect For',
      type: 'blockContent',
    }),
    defineField({
      name: 'features',
      title: 'Template Features',
      type: 'blockContent',
    }),
    defineField({
      name: 'thumbnails',
      title: 'Screenshots',
      type: 'array',
      of: [{ type: 'image' }],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'demoUrl',
      title: 'Live Demo URL',
      type: 'url',
    }),
    defineField({
      name: 'purchaseUrl',
      title: 'Purchase URL',
      type: 'url',
      description: 'Lemon squeezy or checkout link',
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'string',
      description: 'e.g. "149" or "Free"',
    }),
    defineField({
      name: 'pages',
      title: 'Number of Pages',
      type: 'number',
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', type: 'string', title: 'Name (e.g. React)' }),
            defineField({ name: 'version', type: 'string', title: 'Version (e.g. v19.1)' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'views',
      title: 'Views',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', type: 'string', title: 'Meta Title' }),
        defineField({ name: 'metaDescription', type: 'text', title: 'Meta Description' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'thumbnails.0' },
    prepare({ title, media }) {
      return { title, media }
    },
  },
})
