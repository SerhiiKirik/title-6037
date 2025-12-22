'use client';

import { type FC, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { format, setHours, setMinutes, startOfDay } from 'date-fns';
import { DateSelector, TimeSelector } from '@/features/select-date-time';
import { Button } from '@/shared/ui';
import { useBookingStore } from '@/entities/booking/model';
import { generateDateRange, formatDatesForUI } from '@/entities/booking/lib';
import styles from './booking-panel.module.scss';

interface Props {}

export const BookingPanel: FC<Props> = () => {
  const t = useTranslations('booking');
  const router = useRouter();

  // Zustand store
  const selectedDate = useBookingStore((state) => state.selectedDate);
  const selectedTime = useBookingStore((state) => state.selectedTime);
  const availableTimeSlots = useBookingStore(
    (state) => state.availableTimeSlots,
  );
  const isConfirmEnabled = useBookingStore((state) => state.isConfirmEnabled);
  const selectDate = useBookingStore((state) => state.selectDate);
  const selectTime = useBookingStore((state) => state.selectTime);
  const confirmBooking = useBookingStore((state) => state.confirmBooking);

  // Generate dates (memoized to avoid recalculation)
  const dateRange = useMemo(() => generateDateRange(), []);
  const formattedDates = useMemo(
    () => formatDatesForUI(dateRange, selectedDate),
    [dateRange, selectedDate],
  );

  // Format selected date and time
  const formattedSelection = useMemo(() => {
    if (!selectedDate || selectedTime === null) {
      return null;
    }

    const hours = Math.floor(selectedTime / 60);
    const mins = selectedTime % 60;
    const dateTime = setMinutes(
      setHours(startOfDay(selectedDate), hours),
      mins,
    );

    return {
      date: format(selectedDate, 'EEEE, MMMM d, yyyy'),
      time: format(dateTime, 'h:mm a'),
    };
  }, [selectedDate, selectedTime]);

  // Handlers
  const handleDateSelect = (date: Date) => {
    selectDate(date);
  };

  const handleTimeSelect = (minutes: number) => {
    selectTime(minutes);
  };

  const handleConfirm = () => {
    const timestamp = confirmBooking();

    if (timestamp) {
      // Get current locale from pathname
      const currentLocale = window.location.pathname.split('/')[1];
      router.push(`/${currentLocale}/success?timestamp=${timestamp}`);
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
      </div>

      <div className={styles.content}>
        <DateSelector dates={formattedDates} onDateSelect={handleDateSelect} />

        {selectedDate && (
          <TimeSelector
            timeSlots={availableTimeSlots}
            selectedTime={selectedTime}
            onTimeSelect={handleTimeSelect}
          />
        )}

        <div className={styles.footer}>
          {formattedSelection && (
            <div className={styles.selectedSummary}>
              <p className={styles.summaryLabel}>{t('yourSelection')}</p>
              <p className={styles.summaryDate}>{formattedSelection.date}</p>
              <p className={styles.summaryTime}>
                {t('at')} {formattedSelection.time}
              </p>
            </div>
          )}
          <Button
            onClick={handleConfirm}
            disabled={!isConfirmEnabled}
            fullWidth
          >
            {t('confirmButton')}
          </Button>
        </div>
      </div>
    </div>
  );
};
