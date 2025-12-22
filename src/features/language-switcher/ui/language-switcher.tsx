'use client';

import { type FC, useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { locales, localeMetadata } from '@/shared/config/i18n';
import type { Locale } from '@/shared/config/i18n';
import styles from './language-switcher.module.scss';

interface Props {
  className?: string;
}

export const LanguageSwitcher: FC<Props> = ({ className }) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale || !pathname) return;

    startTransition(() => {
      // Replace the locale in the pathname
      // pathname from next/navigation already includes the locale
      const segments = pathname.split('/');
      segments[1] = newLocale; // Replace locale segment
      const newPath = segments.join('/');

      router.push(newPath);
    });
  };

  return (
    <div
      className={clsx(styles.switcher, className, {
        [styles.pending]: isPending,
      })}
    >
      {locales.map((locale) => {
        const metadata = localeMetadata[locale];
        const isActive = locale === currentLocale;

        return (
          <button
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            className={clsx(styles.button, {
              [styles.active]: isActive,
            })}
            disabled={isActive || isPending}
            aria-label={`Switch to ${metadata.name}`}
            type="button"
          >
            <span className={styles.flag}>{metadata.flag}</span>
            <span className={styles.name}>{metadata.nativeName}</span>
          </button>
        );
      })}
    </div>
  );
};
