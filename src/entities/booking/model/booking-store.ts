import { create } from 'zustand';
import type { TimeSlot } from '@/shared/types';
import {
  generateTimeSlotsForDate,
  isTimeSlotValid,
  dateTimeToTimestamp,
} from '../lib';

interface BookingState {
  selectedDate: Date | null;
  selectedTime: number | null; // minutes from midnight
  availableTimeSlots: TimeSlot[];
  isConfirmEnabled: boolean;

  // Actions
  selectDate: (date: Date) => void;
  selectTime: (minutes: number) => void;
  confirmBooking: () => number | null;
  resetSelection: () => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  selectedDate: null,
  selectedTime: null,
  availableTimeSlots: [],
  isConfirmEnabled: false,

  selectDate: (date: Date) => {
    const currentState = get();
    const newTimeSlots = generateTimeSlotsForDate(date);

    // Check if previously selected time is still valid for the new date
    let newSelectedTime = currentState.selectedTime;
    if (newSelectedTime !== null && !isTimeSlotValid(date, newSelectedTime)) {
      newSelectedTime = null;
    }

    set({
      selectedDate: date,
      selectedTime: newSelectedTime,
      availableTimeSlots: newTimeSlots,
      isConfirmEnabled: newSelectedTime !== null,
    });
  },

  selectTime: (minutes: number) => {
    const { selectedDate } = get();

    set({
      selectedTime: minutes,
      isConfirmEnabled: selectedDate !== null,
    });
  },

  confirmBooking: () => {
    const { selectedDate, selectedTime } = get();

    if (selectedDate && selectedTime !== null) {
      const timestamp = dateTimeToTimestamp(selectedDate, selectedTime);
      // eslint-disable-next-line no-console
      console.log({ timestamp });

      set({
        selectedDate: null,
        selectedTime: null,
        availableTimeSlots: [],
      });

      return timestamp;
    }

    return null;
  },

  resetSelection: () => {
    set({
      selectedDate: null,
      selectedTime: null,
      availableTimeSlots: [],
      isConfirmEnabled: false,
    });
  },
}));
