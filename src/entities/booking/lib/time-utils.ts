import {
  format,
  setHours,
  setMinutes,
  isSameDay,
  addMinutes,
  startOfDay,
} from 'date-fns';
import type { TimeSlot } from '@/shared/types';

/**
 * Generate all 15-minute time slots for a day (00:00 - 23:45)
 */
const generateAllTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const baseDate = new Date(2000, 0, 1); // arbitrary date for time formatting

  for (let minutes = 0; minutes < 24 * 60; minutes += 15) {
    const slotDate = addMinutes(baseDate, minutes);
    slots.push({
      label: format(slotDate, 'h:mm a'),
      value: minutes,
      disabled: false,
    });
  }

  return slots;
};

/**
 * Get current time rounded up to next 15-minute interval
 */
const getCurrentTimeRoundedUp = (): number => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const roundedMinutes = Math.ceil(currentMinutes / 15) * 15;
  return roundedMinutes;
};

/**
 * Generate time slots for a specific date
 * If date is today, disable past times
 */
export const generateTimeSlotsForDate = (selectedDate: Date): TimeSlot[] => {
  const allSlots = generateAllTimeSlots();
  const isSelectedDateToday = isSameDay(selectedDate, new Date());

  if (!isSelectedDateToday) {
    return allSlots;
  }

  // For today, disable slots that are in the past
  const currentMinutes = getCurrentTimeRoundedUp();

  return allSlots.map((slot) => ({
    ...slot,
    disabled: slot.value < currentMinutes,
  }));
};

/**
 * Convert date + time (minutes from midnight) to Unix timestamp (seconds)
 */
export const dateTimeToTimestamp = (date: Date, minutes: number): number => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const dateTime = setMinutes(setHours(startOfDay(date), hours), mins);
  return Math.floor(dateTime.getTime() / 1000);
};

/**
 * Check if a time slot is still valid for the selected date
 * (used when date changes to validate previously selected time)
 */
export const isTimeSlotValid = (
  selectedDate: Date,
  timeMinutes: number,
): boolean => {
  const isSelectedDateToday = isSameDay(selectedDate, new Date());

  if (!isSelectedDateToday) {
    return true;
  }

  const currentMinutes = getCurrentTimeRoundedUp();
  return timeMinutes >= currentMinutes;
};
