import { type SchemaTypeDefinition } from 'sanity'
import { blockContent } from './blockContent'
import { category } from './category'
import { template } from './template'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, category, template],
}
