/**
 * CDN path helper. Use a base URL in production if you serve assets from R2/CDN.
 */
const CDN_BASE = process.env.NEXT_PUBLIC_CDN_BASE ?? '';

export function r2cdn(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return CDN_BASE ? `${CDN_BASE.replace(/\/$/, '')}${normalized}` : normalized;
}
