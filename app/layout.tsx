import type { Metadata } from 'next';
import { Header } from '@/shared/ui';
import { SEO_DEFAULTS } from '@/entities/seo';
import './globals.css';

export const metadata: Metadata = {
  title: 'Booking Session',
  description: 'Book your session with ease',
  icons: SEO_DEFAULTS.icons,
  manifest: SEO_DEFAULTS.manifest,
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <Header title="Booking Session" />
      <main>{children}</main>
    </body>
  </html>
);

export default RootLayout;
