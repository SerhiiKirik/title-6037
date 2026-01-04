'use client';

import { type FC, type ChangeEvent, useTransition } from 'react';
import { useLocale } from 'next-intl';
import {
  usePathname as useNextPathname,
  useSearchParams,
} from 'next/navigation';
import cn from 'clsx';
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
  const searchParams = useSearchParams();

  const handleLocaleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value as Locale;

    if (newLocale === currentLocale || !fullPathname) return;

    startTransition(() => {
      // Get pathname without the current locale prefix
      const pathnameWithoutLocale = fullPathname.replace(
        new RegExp(`^/${currentLocale}`),
        '',
      );

      // Build URL with search params
      const search = searchParams?.toString();
      const url = `${pathnameWithoutLocale || '/'}${search ? `?${search}` : ''}`;

      // Navigate to the same path with new locale
      router.replace(url, { locale: newLocale });
    });
  };

  return (
    <div className={cn(styles.switcher, className)}>
      <select
        value={currentLocale}
        onChange={handleLocaleChange}
        disabled={isPending}
        className={cn(styles.select, {
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
