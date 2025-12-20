'use client';

import React from 'react';
import type { TimeSlot } from '@/shared/types';
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
}) => {
  const handleTimeClick = (minutes: number, disabled: boolean) => {
    if (!disabled) {
      onTimeSelect(minutes);
    }
  };

  if (timeSlots.length === 0) {
    return null;
  }

  const hasAvailableSlots = timeSlots.some((slot) => !slot.disabled);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Select Time</h2>
      {!hasAvailableSlots && (
        <p className={styles.emptyMessage}>
          No available time slots for today. Please select a future date.
        </p>
      )}
      {hasAvailableSlots && (
        <div className={styles.timeGrid}>
          {timeSlots.map((slot) => {
            const classNames = [
              styles.timeSlot,
              slot.disabled ? styles.disabled : '',
              selectedTime === slot.value ? styles.selected : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <button
                key={slot.value}
                type="button"
                className={classNames}
                onClick={() => handleTimeClick(slot.value, slot.disabled)}
                disabled={slot.disabled}
                aria-label={`Select time ${slot.label}`}
                aria-pressed={selectedTime === slot.value}
              >
                {slot.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
