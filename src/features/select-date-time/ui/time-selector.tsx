'use client';

import React from 'react';
import type { TimeSlot } from '@/shared/types';
import { TimeSlider } from './time-slider';
import styles from './time-selector.module.css';

interface Props {
  timeSlots: TimeSlot[];
  selectedTime: number | null;
  onTimeSelect: (minutes: number) => void;
}

export const TimeSelector: React.FC<Props> = ({
  timeSlots,
  selectedTime,
  onTimeSelect,
}) => (
  <div className={styles.container}>
    <h2 className={styles.title}>Select Time</h2>
    <TimeSlider
      timeSlots={timeSlots}
      selectedTime={selectedTime}
      onTimeSelect={onTimeSelect}
    />
  </div>
);
