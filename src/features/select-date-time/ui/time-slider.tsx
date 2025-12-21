'use client';

import type { FC } from 'react';
import cn from 'clsx';
import type { TimeSlot } from '@/shared/types';
import { Slider } from '@/shared/ui';
import styles from './time-slider.module.scss';

interface Props {
  timeSlots: TimeSlot[];
  selectedTime: number | null;
  onTimeSelect: (minutes: number) => void;
}

export const TimeSlider: FC<Props> = ({
  timeSlots,
  selectedTime,
  onTimeSelect,
}) => {
  const hasAvailableSlots = timeSlots.some((slot) => !slot.disabled);

  if (timeSlots.length === 0) {
    return null;
  }

  if (!hasAvailableSlots) {
    return (
      <div className={styles.container}>
        <p className={styles.emptyMessage}>
          No available time slots for today. Please select a future date.
        </p>
      </div>
    );
  }

  return (
    <Slider scrollAmount={250}>
      {timeSlots.map((slot) => (
        <button
          key={slot.value}
          type="button"
          onClick={() => onTimeSelect(slot.value)}
          disabled={slot.disabled}
          className={cn(styles.timeSlot, {
            [styles.selected]: selectedTime === slot.value,
            [styles.disabled]: slot.disabled,
          })}
          aria-label={`Select time ${slot.label}`}
          aria-pressed={selectedTime === slot.value}
        >
          {slot.label}
        </button>
      ))}
    </Slider>
  );
};
