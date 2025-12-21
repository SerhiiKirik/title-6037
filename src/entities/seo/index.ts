/**
 * SEO Library for Next.js
 *
 * Provides utilities for generating SEO metadata and JSON-LD structured data.
 * Organization data from SEO_DEFAULTS is automatically used for JSON-LD.
 *
 * @example
 * ```typescript
 * import { generateMetadata, SEO_DEFAULTS } from '@/shared/lib/seo';
 *
 * export const metadata = generateMetadata({
 *   url: 'https://yoursite.com/page/',
 *   title: 'Page Title',
 *   metaDescription: 'Page description',
 *   robots: true,
 * }, SEO_DEFAULTS);
 * ```
 */

// Export types
export type {
  PageSeoData,
  MetaImage,
  Breadcrumb,
  JsonLdOrganization,
  JsonLdConfig,
  SeoDefaults,
  Icons,
} from './types';

// Export configuration
export { SEO_DEFAULTS } from './config';

// Export utilities
export { generateMetadata, generateJsonLdData } from './utils';

// Export components
export { JsonLd } from './components/json-ld';
