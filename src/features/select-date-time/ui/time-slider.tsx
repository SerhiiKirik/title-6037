'use client';

import React from 'react';
import type { TimeSlot } from '@/shared/types';
import { useSlider } from '@/shared/lib/hooks';
import { ArrowIcon } from '@/shared/ui/icons/arrow';
import styles from './time-slider.module.css';

interface Props {
  timeSlots: TimeSlot[];
  selectedTime: number | null;
  onTimeSelect: (minutes: number) => void;
}

export const TimeSlider: React.FC<Props> = ({
  timeSlots,
  selectedTime,
  onTimeSelect,
}) => {
  const {
    containerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
  } = useSlider(250);

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
    <div className={styles.sliderWrapper}>
      <button
        type="button"
        onClick={scrollLeft}
        className={styles.navButton}
        aria-label="Scroll left"
        disabled={!canScrollLeft}
      >
        <ArrowIcon className={styles.leftArrow} />
      </button>

      <div ref={containerRef} className={styles.sliderContainer}>
        {timeSlots.map((slot) => (
          <button
            key={slot.value}
            type="button"
            onClick={() => onTimeSelect(slot.value)}
            disabled={slot.disabled}
            className={`${styles.timeSlot} ${
              selectedTime === slot.value ? styles.selected : ''
            } ${slot.disabled ? styles.disabled : ''}`}
            aria-label={`Select time ${slot.label}`}
            aria-pressed={selectedTime === slot.value}
          >
            {slot.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={scrollRight}
        className={styles.navButton}
        aria-label="Scroll right"
        disabled={!canScrollRight}
      >
        <ArrowIcon className={styles.rightArrow} />
      </button>
    </div>
  );
};
