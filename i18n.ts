/**
 * next-intl Configuration
 *
 * This file configures next-intl for server and client components.
 * It loads translation messages dynamically based on the locale.
 */

import { getRequestConfig } from 'next-intl/server';
import { defaultLocale } from './src/shared/config/i18n';

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is always a valid string
  const validLocale = (locale || defaultLocale) as string;

  return {
    locale: validLocale,
    messages: (
      await import(`./src/shared/config/i18n/messages/${validLocale}.json`)
    ).default,
  };
});
