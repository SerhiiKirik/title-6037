'use client';

import React from 'react';
import type { DateInfo } from '@/shared/types';
import { DateSlider } from './date-slider';
import styles from './date-selector.module.scss';

interface Props {
  dates: DateInfo[];
  onDateSelect: (date: Date) => void;
}

export const DateSelector: React.FC<Props> = ({ dates, onDateSelect }) => (
  <div className={styles.container}>
    <h2 className={styles.title}>Select Date</h2>
    <DateSlider dates={dates} onDateSelect={onDateSelect} />
  </div>
);
