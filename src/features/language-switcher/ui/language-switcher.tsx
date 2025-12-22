'use client';

import { type FC, type ChangeEvent, useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname as useNextPathname } from 'next/navigation';
import clsx from 'clsx';
import {
  useRouter,
  locales,
  localeMetadata,
  type Locale,
} from '@/shared/config/i18n';
import styles from './language-switcher.module.scss';

interface Props {
  className?: string;
}

export const LanguageSwitcher: FC<Props> = ({ className }) => {
  const router = useRouter();
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();
  // Use Next.js pathname to get the FULL pathname with locale
  const fullPathname = useNextPathname();

  const handleLocaleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value as Locale;

    if (newLocale === currentLocale || !fullPathname) return;

    startTransition(() => {
      // Get pathname without the current locale prefix
      const pathnameWithoutLocale = fullPathname.replace(
        new RegExp(`^/${currentLocale}`),
        '',
      );

      // Navigate to the same path with new locale
      router.replace(pathnameWithoutLocale || '/', { locale: newLocale });
    });
  };

  return (
    <div className={clsx(styles.switcher, className)}>
      <select
        value={currentLocale}
        onChange={handleLocaleChange}
        disabled={isPending}
        className={clsx(styles.select, {
          [styles.pending]: isPending,
        })}
        aria-label="Select language"
      >
        {locales.map((locale) => {
          const metadata = localeMetadata[locale];
          return (
            <option key={locale} value={locale}>
              {metadata.flag} {metadata.nativeName}
            </option>
          );
        })}
      </select>
    </div>
  );
};
