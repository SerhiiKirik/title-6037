'use client';

import React from 'react';
import type { DateInfo } from '@/shared/types';
import styles from './date-selector.module.css';

interface Props {
  dates: DateInfo[];
  onDateSelect: (date: Date) => void;
}

export const DateSelector: React.FC<Props> = ({ dates, onDateSelect }) => {
  const handleDateClick = (date: Date) => {
    onDateSelect(date);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Select Date</h2>
      <div className={styles.dateGrid}>
        {dates.map((dateInfo) => {
          const key = dateInfo.date.toISOString();
          const classNames = [
            styles.dateCard,
            dateInfo.isSelected ? styles.selected : '',
            dateInfo.isToday ? styles.today : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={key}
              type="button"
              className={classNames}
              onClick={() => handleDateClick(dateInfo.date)}
              aria-label={`Select ${dateInfo.dayOfWeek}, ${dateInfo.month} ${dateInfo.dayOfMonth}`}
              aria-pressed={dateInfo.isSelected}
            >
              <span className={styles.dayOfWeek}>{dateInfo.dayOfWeek}</span>
              <span className={styles.dayOfMonth}>{dateInfo.dayOfMonth}</span>
              <span className={styles.month}>{dateInfo.month}</span>
              {dateInfo.isToday && (
                <span className={styles.todayBadge}>Today</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
