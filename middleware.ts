/**
 * Next.js Middleware for Internationalization
 *
 * This middleware handles locale routing using next-intl.
 * It automatically redirects users to the appropriate locale-prefixed route.
 */

import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/shared/config/i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Always use locale prefix in the URL (even for default locale)
  localePrefix: 'always',
});

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /favicon.ico, /sitemap.xml, /robots.txt (static files)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
