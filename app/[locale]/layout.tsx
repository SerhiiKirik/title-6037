import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Kaisei_Tokumin, Poppins } from 'next/font/google';
import { Header } from '@/shared/ui';
import { SEO_DEFAULTS, JsonLd, generateJsonLdData } from '@/entities/seo';
import { locales, localeMetadata } from '@/shared/config/i18n';
import '../globals.css';
import { BlurEllipse } from '@/shared/ui/icons/blur-ellipse';
import styles from './layout.module.scss';

const kaiseiTokumin = Kaisei_Tokumin({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-kaisei',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

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

  // Generate JSON-LD for the site
  const jsonLd = generateJsonLdData(
    {
      url: SEO_DEFAULTS.siteUrl,
      title: 'Booking Session - 6037 Venture Partnership',
      metaDescription:
        'Book your session with ease. Select your preferred date and time slot.',
      jsonLd: {
        enabled: true,
        organization: SEO_DEFAULTS.organization,
      },
    },
    SEO_DEFAULTS,
  );

  return (
    <html lang={localeData?.htmlLang || 'en'}>
      <body className={`${poppins.variable} ${kaiseiTokumin.variable}`}>
        <JsonLd data={jsonLd} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header title="6037 Venture Partnership" />
          <main className={styles.main}>
            <div className={styles.content}>{children}</div>

            <BlurEllipse className={styles.blurEllipse} />
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
