'use client';

import type { FC } from 'react';
import type { TimeSlot } from '@/shared/types';
import { TimeSlider } from './time-slider';
import styles from './time-selector.module.scss';

interface Props {
  timeSlots: TimeSlot[];
  selectedTime: number | null;
  isDisabled?: boolean;
  onTimeSelect: (minutes: number) => void;
}

export const TimeSelector: FC<Props> = ({
  timeSlots,
  selectedTime,
  isDisabled,
  onTimeSelect,
}) => (
  <div className={styles.container}>
    <TimeSlider
      timeSlots={timeSlots}
      selectedTime={selectedTime}
      onTimeSelect={onTimeSelect}
      isDisabled={isDisabled}
    />
  </div>
);
