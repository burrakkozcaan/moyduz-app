import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // In development, bypass CDN to see fresh Studio writes immediately.
  useCdn: process.env.NODE_ENV === 'production',
})
