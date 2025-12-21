import { Suspense } from 'react';
import { SuccessPage } from '@/pages/success';
import {
  generateMetadata as generateSeoMetadata,
  SEO_DEFAULTS,
} from '@/entities/seo';

export const metadata = generateSeoMetadata(
  {
    url: `${SEO_DEFAULTS.siteUrl}/success/`,
    title: 'Booking Confirmed - Booking Session',
    metaDescription:
      'Your booking has been successfully confirmed. Get your confirmation email by entering your email address.',
    robots: false,
  },
  SEO_DEFAULTS,
);

const SuccessPageWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SuccessPage />
  </Suspense>
);

export default SuccessPageWrapper;
