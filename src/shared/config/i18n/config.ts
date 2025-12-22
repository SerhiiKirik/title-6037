/**
 * i18n Configuration
 *
 * Centralized configuration for internationalization using next-intl.
 */

export const locales = ['en', 'uk'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/**
 * Locale metadata for language display and SEO
 */
export const localeMetadata = {
  en: {
    name: 'English',
    nativeName: 'English',
    flag: '<ì<ç',
    htmlLang: 'en',
    ogLocale: 'en_US',
  },
  uk: {
    name: 'Ukrainian',
    nativeName: '#:@0W=AL:0',
    flag: '<ú<æ',
    htmlLang: 'uk',
    ogLocale: 'uk_UA',
  },
} as const;
