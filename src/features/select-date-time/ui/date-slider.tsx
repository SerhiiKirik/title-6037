'use client';

import type { FC } from 'react';
import cn from 'clsx';
import type { DateInfo } from '@/shared/types';
import { Slider } from '@/shared/ui';
import styles from './date-slider.module.scss';

interface Props {
  dates: DateInfo[];
  onDateSelect: (date: Date) => void;
}

export const DateSlider: FC<Props> = ({ dates, onDateSelect }) => {
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
    <Slider scrollAmount={280}>
      {Object.entries(datesByMonth).map(([month, monthDates]) => (
        <div key={month} className={styles.monthGroup}>
          <div className={styles.monthLabel}>{month}</div>
          <div className={styles.datesRow}>
            {monthDates.map((dateInfo) => (
              <button
                key={dateInfo.date.toISOString()}
                type="button"
                onClick={() => onDateSelect(dateInfo.date)}
                className={cn(styles.dateCard, {
                  [styles.selected]: dateInfo.isSelected,
                  [styles.today]: dateInfo.isToday,
                })}
                aria-label={`Select ${dateInfo.dayOfWeek}, ${dateInfo.month} ${dateInfo.dayOfMonth}`}
                aria-pressed={dateInfo.isSelected}
              >
                <span className={styles.dayName}>{dateInfo.dayOfWeek}</span>
                <span className={styles.dayNumber}>{dateInfo.dayOfMonth}</span>
                {dateInfo.isToday && (
                  <span className={styles.todayBadge}>Today</span>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </Slider>
  );
};
