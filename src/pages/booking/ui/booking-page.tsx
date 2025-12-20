'use client';

import React from 'react';
import { BookingPanel } from '@/widgets/booking-panel';
import styles from './booking-page.module.css';

export const BookingPage: React.FC = () => (
  <main className={styles.main}>
    <BookingPanel />
  </main>
);
