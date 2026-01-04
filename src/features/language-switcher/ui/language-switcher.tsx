'use client';

import { type FC } from 'react';
import cn from 'clsx';
import { locales, localeMetadata } from '@/shared/config/i18n';
import { useLocaleSwitcher } from '../hooks/use-locale-switcher';
import styles from './language-switcher.module.scss';

interface Props {
  className?: string;
}

export const LanguageSwitcher: FC<Props> = ({ className }) => {
  const { currentLocale, isPending, handleLocaleChange } = useLocaleSwitcher();

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
