import {
  addWeeks,
  eachDayOfInterval,
  format,
  isToday as isTodayFns,
  startOfDay,
  isSameDay,
} from 'date-fns';
import type { DateInfo } from '@/shared/types';

/**
 * Generate date range from today to +6 weeks (inclusive)
 */
export const generateDateRange = (): Date[] => {
  const today = startOfDay(new Date());
  const endDate = addWeeks(today, 6);

  return eachDayOfInterval({
    start: today,
    end: endDate,
  });
};

/**
 * Convert Date array to DateInfo array with formatting
 */
export const formatDatesForUI = (
  dates: Date[],
  selectedDate: Date | null,
): DateInfo[] =>
  dates.map((date) => ({
    date,
    dayOfWeek: format(date, 'EEE'),
    dayOfMonth: date.getDate(),
    month: format(date, 'MMM'),
    isToday: isTodayFns(date),
    isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
  }));
