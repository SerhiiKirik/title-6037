import type { Metadata } from 'next';
import { Header } from '@/shared/ui';
import './globals.css';

export const metadata: Metadata = {
  title: 'Booking Session',
  description: 'Book your session with ease',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <Header title="Booking Session" />
      {children}
    </body>
  </html>
);

export default RootLayout;
