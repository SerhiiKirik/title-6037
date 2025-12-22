import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header } from '@/shared/ui';
import { SEO_DEFAULTS } from '@/entities/seo';
import { locales, localeMetadata } from '@/shared/config/i18n';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Booking Session',
  description: 'Book your session with ease',
  icons: SEO_DEFAULTS.icons,
  manifest: SEO_DEFAULTS.manifest,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

const LocaleLayout = async ({ children, params }: Props) => {
  const { locale } = params;
  const messages = await getMessages({ locale });
  const localeData = localeMetadata[locale as keyof typeof localeMetadata];

  return (
    <html lang={localeData?.htmlLang || 'en'}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header title="Booking Session" />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
