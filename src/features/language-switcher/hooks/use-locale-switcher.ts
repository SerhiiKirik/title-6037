'use client';

import { type ChangeEvent, useTransition } from 'react';
import { useLocale } from 'next-intl';
import {
  usePathname as useNextPathname,
  useSearchParams,
} from 'next/navigation';
import { useRouter, type Locale } from '@/shared/config/i18n';

export const useLocaleSwitcher = () => {
  const router = useRouter();
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();
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

  return {
    currentLocale,
    isPending,
    handleLocaleChange,
  };
};
