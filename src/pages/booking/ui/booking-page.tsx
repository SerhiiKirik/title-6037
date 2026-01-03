'use client';

import type { FC } from 'react';
import { BookingPanel } from '@/widgets/booking-panel';
import { Hero } from '@/widgets/hero';

export const BookingPage: FC = () => {
  return (
    <>
      <Hero />

      <BookingPanel />
    </>
  );
};
