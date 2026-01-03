'use client';

import type { FC } from 'react';
import { BookingPanel } from '@/widgets/booking-panel';
import { Hero } from '@/widgets/hero';
import styles from './booking-page.module.scss';

export const BookingPage: FC = () => {
  return (
    <>
      <div className={styles.hero}>
        <Hero />
      </div>

      <BookingPanel />
    </>
  );
};
