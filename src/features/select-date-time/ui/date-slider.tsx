'use client';

import React from 'react';
import type { DateInfo } from '@/shared/types';
import { useSlider } from '@/shared/lib/hooks';
import styles from './date-slider.module.css';

interface Props {
  dates: DateInfo[];
  onDateSelect: (date: Date) => void;
}

export const DateSlider: React.FC<Props> = ({ dates, onDateSelect }) => {
  const {
    containerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
  } = useSlider(280);

  // Group dates by month
  const datesByMonth = dates.reduce(
    (acc, dateInfo) => {
      const { month } = dateInfo;
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(dateInfo);
      return acc;
    },
    {} as Record<string, DateInfo[]>,
  );

  return (
    <div className={styles.sliderWrapper}>
      <button
        type="button"
        onClick={scrollLeft}
        className={styles.navButton}
        aria-label="Scroll left"
        disabled={!canScrollLeft}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div ref={containerRef} className={styles.sliderContainer}>
        {Object.entries(datesByMonth).map(([month, monthDates]) => (
          <div key={month} className={styles.monthGroup}>
            <div className={styles.monthLabel}>{month}</div>
            <div className={styles.datesRow}>
              {monthDates.map((dateInfo) => (
                <button
                  key={dateInfo.date.toISOString()}
                  type="button"
                  onClick={() => onDateSelect(dateInfo.date)}
                  className={`${styles.dateCard} ${
                    dateInfo.isSelected ? styles.selected : ''
                  } ${dateInfo.isToday ? styles.today : ''}`}
                  aria-label={`Select ${dateInfo.dayOfWeek}, ${dateInfo.month} ${dateInfo.dayOfMonth}`}
                  aria-pressed={dateInfo.isSelected}
                >
                  <span className={styles.dayName}>{dateInfo.dayOfWeek}</span>
                  <span className={styles.dayNumber}>
                    {dateInfo.dayOfMonth}
                  </span>
                  {dateInfo.isToday && (
                    <span className={styles.todayBadge}>Today</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={scrollRight}
        className={styles.navButton}
        aria-label="Scroll right"
        disabled={!canScrollRight}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
};
