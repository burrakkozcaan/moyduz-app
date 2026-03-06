import { defineType, defineField } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
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
      name: 'group',
      title: 'Category Group',
      type: 'string',
      description: 'Group categories (Business / Community / Creative / Style)',
      options: {
        list: [
          { title: '— None —', value: '' },
          { title: 'Business Templates', value: 'business' },
          { title: 'Community Templates', value: 'community' },
          { title: 'Creative Templates', value: 'creative' },
          { title: 'Style Templates', value: 'style' },
        ],
      },
    }),
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Leave empty for main categories',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'thumbnails',
      title: 'Category Thumbnails',
      type: 'array',
      of: [{ type: 'image' }],
      validation: (rule) => rule.max(3),
      description: '1–3 images for marketplace category cards. Edit from Content → Category (not from within a Template).',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order (lower = first)',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', group: 'group', media: 'thumbnails.0' },
    prepare({ title, group, media }) {
      const subtitle = group ? group.charAt(0).toUpperCase() + group.slice(1) : 'Category'
      return { title, subtitle, media }
    },
  },
})
