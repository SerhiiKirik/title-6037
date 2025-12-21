'use client';

import type { FC } from 'react';
import { BookingPanel } from '@/widgets/booking-panel';
import styles from './booking-page.module.scss';

export const BookingPage: FC = () => (
  <main className={styles.main}>
    <BookingPanel />
  </main>
);
