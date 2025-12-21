/**
 * SEO Utility Functions for Next.js
 *
 * These utilities generate Next.js Metadata objects and JSON-LD structured data.
 */

import type { Metadata } from 'next';
import type { PageSeoData, JsonLdOrganization, Breadcrumb } from './types';

/**
 * Generate canonical URL from breadcrumbs
 */
function generateCanonicalUrl(
  siteUrl: string,
  url: string,
  breadcrumbs?: Breadcrumb[],
): string {
  if (!breadcrumbs || breadcrumbs.length === 0) {
    return url;
  }

  const canonicalBreadcrumbs = breadcrumbs.filter((b) => b.canonical);
  if (canonicalBreadcrumbs.length === 0) {
    return url;
  }

  const path = canonicalBreadcrumbs
    .map((b) => b.slug.replace('/', ''))
    .join('/');
  return `${siteUrl}${path}`;
}

/**
 * Generate WebSite JSON-LD schema
 */
function generateWebSiteSchema(
  siteUrl: string,
  siteName: string,
  organization?: JsonLdOrganization,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: siteUrl,
    name: siteName,
    publisher: organization
      ? {
          '@type': 'Organization',
          name: organization.name,
          logo: {
            '@type': 'ImageObject',
            url: organization.logo.url,
            width: organization.logo.width,
            height: organization.logo.height,
          },
          sameAs: organization.sameAs,
        }
      : undefined,
  };
}

/**
 * Generate WebPage JSON-LD schema
 */
function generateWebPageSchema(
  url: string,
  title: string,
  description: string,
  organization?: JsonLdOrganization,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url,
    name: title,
    description,
    publisher: organization
      ? {
          '@type': 'Organization',
          name: organization.name,
          logo: {
            '@type': 'ImageObject',
            url: organization.logo.url,
            width: organization.logo.width,
            height: organization.logo.height,
          },
          sameAs: organization.sameAs,
        }
      : undefined,
  };
}

/**
 * Generate JSON-LD script content
 */
function generateJsonLd(
  data: PageSeoData,
  siteUrl: string,
  siteName: string,
  defaultOrganization?: JsonLdOrganization,
): object | object[] | null {
  if (!data.jsonLd || data.jsonLd.enabled === false) {
    return null;
  }

  // Use organization from data.jsonLd if provided, otherwise use default
  const organization = data.jsonLd.organization || defaultOrganization;
  const schemas: object[] = [];

  // Always include WebSite schema
  schemas.push(generateWebSiteSchema(siteUrl, siteName, organization));

  // Add WebPage schema
  schemas.push(
    generateWebPageSchema(
      data.url,
      data.title,
      data.metaDescription,
      organization,
    ),
  );

  return schemas.length === 1 ? schemas[0] : schemas;
}

/**
 * Generate Next.js Metadata object from page SEO data
 *
 * Use it in page.tsx or layout.tsx to generate metadata.
 * Organization from SEO_DEFAULTS is automatically used for JSON-LD.
 *
 * @example
 * ```typescript
 * export const metadata = generateMetadata({
 *   url: 'https://yoursite.com/page/',
 *   title: 'Page Title',
 *   metaDescription: 'Page description',
 *   robots: true,
 * }, SEO_DEFAULTS);
 * ```
 */
export function generateMetadata(
  data: PageSeoData,
  defaults: {
    siteUrl: string;
    siteName: string;
    language?: string;
    icons?: {
      icon?: string;
      shortcut?: string;
      apple?: string;
    };
    manifest?: string;
  },
): Metadata {
  const canonicalUrl = generateCanonicalUrl(
    defaults.siteUrl,
    data.url,
    data.breadcrumbs,
  );

  // Use icons from data if provided, otherwise use defaults
  const icons = data.icons || defaults.icons;
  const manifest = data.manifest || defaults.manifest;

  const metadata: Metadata = {
    title: data.title,
    description: data.metaDescription,
    keywords: data.keywords,
    robots: data.robots
      ? {
          index: true,
          follow: true,
        }
      : {
          index: false,
          follow: false,
        },
    alternates: {
      canonical: canonicalUrl,
    },
    icons: icons
      ? {
          icon: icons.icon,
          shortcut: icons.shortcut,
          apple: icons.apple,
        }
      : undefined,
    manifest,
    openGraph: {
      type: 'website',
      url: data.url,
      title: data.title,
      description: data.metaDescription,
      siteName: defaults.siteName,
      locale: defaults.language || 'en',
      images: data.metaImage
        ? [
            {
              url: data.metaImage.url,
              width: data.metaImage.width,
              height: data.metaImage.height,
              alt: data.metaImage.alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.metaDescription,
      images: data.metaImage ? [data.metaImage.url] : undefined,
    },
  };

  return metadata;
}

/**
 * Generate JSON-LD structured data from page SEO data
 *
 * Use this with the JsonLd component to add structured data to your page.
 * Organization from SEO_DEFAULTS is automatically used.
 *
 * @example
 * ```typescript
 * import { JsonLd, generateJsonLdData } from '@/shared/lib/seo';
 *
 * export default function Page() {
 *   const jsonLd = generateJsonLdData({
 *     url: 'https://yoursite.com/page/',
 *     title: 'Page Title',
 *     metaDescription: 'Page description',
 *   }, SEO_DEFAULTS);
 *
 *   return (
 *     <>
 *       <JsonLd data={jsonLd} />
 *       <div>Page content...</div>
 *     </>
 *   );
 * }
 * ```
 */
export function generateJsonLdData(
  data: PageSeoData,
  defaults: {
    siteUrl: string;
    siteName: string;
    organization?: JsonLdOrganization;
  },
): object | object[] | null {
  return generateJsonLd(
    data,
    defaults.siteUrl,
    defaults.siteName,
    defaults.organization,
  );
}
