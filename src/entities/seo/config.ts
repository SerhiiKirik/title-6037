/**
 * SEO Configuration for the Application
 *
 * This file contains default SEO values used across all pages.
 * Customize with your site's data.
 *
 * Usage in page.tsx or layout.tsx:
 * ```typescript
 * import { generateMetadata, SEO_DEFAULTS } from '@/shared/lib/seo';
 *
 * export const metadata = generateMetadata({
 *   url: 'https://yoursite.com/page/',
 *   title: 'Page Title',
 *   metaDescription: 'Page description',
 *   robots: true,
 *   // icons and manifest are automatically included from SEO_DEFAULTS
 * }, SEO_DEFAULTS);
 * ```
 */

import type { SeoDefaults } from './types';

/**
 * Default SEO values used across all pages.
 * Organization data is automatically used for JSON-LD structured data.
 * Customize these values for your site.
 */
export const SEO_DEFAULTS: SeoDefaults = {
  siteName: 'Booking Session',
  siteUrl: 'http://localhost:3000',
  defaultTitle: 'Booking Session - Schedule Your Appointment',
  defaultMetaDescription:
    'Book your appointment with ease. Select your preferred date and time slot.',
  language: 'en',
  organization: {
    name: 'Booking Session',
    logo: {
      url: 'http://localhost:3000/logo.png',
      width: 250,
      height: 60,
    },
    sameAs: [
      'https://twitter.com/yourhandle',
      'https://linkedin.com/company/yourcompany',
      'https://facebook.com/yourpage',
    ],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/title-6037-og-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Booking Session',
      },
    ],
  },
};
