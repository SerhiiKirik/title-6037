/**
 * Global Type Declarations for next-intl
 *
 * This file extends next-intl types to provide autocomplete
 * and type safety for translation keys throughout the application.
 *
 * @see https://next-intl.dev/docs/workflows/typescript
 */

import { routing } from './src/shared/config/i18n/navigation';
import messages from './src/shared/config/i18n/messages/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
