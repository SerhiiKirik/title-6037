/**
 * SEO Types for Next.js
 * Simplified for basic webpage SEO functionality
 */

/**
 * Breadcrumb for canonical URL generation
 */
export type Breadcrumb = {
  name: string;
  slug: string;
  canonical?: boolean;
};

/**
 * Meta image configuration
 */
export type MetaImage = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * Organization data for schema.org markup.
 * Used in WebSite and WebPage schemas.
 */
export type JsonLdOrganization = {
  /** Organization name */
  name: string;
  /** Organization logo */
  logo: {
    url: string;
    width: number;
    height: number;
  };
  /** Social media profiles URLs */
  sameAs: string[];
};

/**
 * Configuration for JSON-LD schema.org markup.
 */
export type JsonLdConfig = {
  /** Enable/disable JSON-LD output (default: true) */
  enabled?: boolean;
  /** Organization data (global) */
  organization?: JsonLdOrganization;
};

/**
 * Icons configuration for favicon and app icons
 */
export type Icons = {
  /** Favicon (.ico) */
  icon?: string;
  /** Shortcut icon */
  shortcut?: string;
  /** Apple touch icon */
  apple?: string;
};

/**
 * Page-specific SEO data
 */
export type PageSeoData = {
  /** Page URL (absolute) */
  url: string;
  /** Page title */
  title: string;
  /** Meta description */
  metaDescription: string;
  /** Meta image for social sharing */
  metaImage?: MetaImage;
  /** Keywords (comma-separated) */
  keywords?: string;
  /** Robots meta tag (true = index, false = noindex) */
  robots?: boolean;
  /** Breadcrumbs for canonical URL */
  breadcrumbs?: Breadcrumb[];
  /** JSON-LD structured data */
  jsonLd?: JsonLdConfig;
  /** Favicon and app icons */
  icons?: Icons;
  /** Web app manifest path */
  manifest?: string;
};

/**
 * SEO configuration defaults
 */
export type SeoDefaults = {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultMetaDescription: string;
  language: string;
  organization?: JsonLdOrganization;
  icons?: Icons;
  manifest?: string;
};
