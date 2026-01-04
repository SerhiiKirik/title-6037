'use client';

import { type FC, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { format, setHours, setMinutes, startOfDay } from 'date-fns';
import { uk, enUS } from 'date-fns/locale';
import { DateSelector, TimeSelector } from '@/features/select-date-time';
import { Button } from '@/shared/ui';
import { useBookingStore } from '@/entities/booking/model';
import { generateDateRange, formatDatesForUI } from '@/entities/booking/lib';
import Image from 'next/image';
import styles from './booking-panel.module.scss';

export const BookingPanel: FC = () => {
  const t = useTranslations('booking');
  const locale = useLocale();
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

  // Get date-fns locale based on current locale
  const dateFnsLocale = locale === 'uk' ? uk : enUS;

  // Generate dates (memoized to avoid recalculation)
  const dateRange = useMemo(() => generateDateRange(), []);
  const formattedDates = useMemo(
    () => formatDatesForUI(dateRange, selectedDate, dateFnsLocale),
    [dateRange, selectedDate, dateFnsLocale],
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
      date: format(selectedDate, 'EEEE, d MMMM yyyy', {
        locale: dateFnsLocale,
      }),
      time: format(dateTime, 'h:mm a', { locale: enUS }),
    };
  }, [selectedDate, selectedTime, dateFnsLocale]);

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
      <div className={styles.content}>
        <div className={styles.header}>
          <Image
            src="/person_desktop_3x.webp"
            alt="Smiling woman with curly hair wearing a teal sweater and a brown coat against an orange background."
            width={120}
            height={120}
            priority
            className={styles.headerImage}
          />

          <div>
            <h1 className={styles.title}>{t('title')}</h1>
            <p className={styles.subtitle}>{t('subtitle')}</p>
          </div>
        </div>

        <DateSelector dates={formattedDates} onDateSelect={handleDateSelect} />

        <TimeSelector
          timeSlots={availableTimeSlots}
          selectedTime={selectedTime}
          onTimeSelect={handleTimeSelect}
          isDisabled={!selectedDate}
        />
      </div>

      <div className={styles.footer}>
        {formattedSelection && (
          <div className={styles.selectedSummary}>
            <p className={styles.summaryLabel}>{t('yourSelection')}</p>
            <span className={styles.summaryDate}>
              {formattedSelection.date} {t('at')} {formattedSelection.time}
            </span>
          </div>
        )}

        <Button onClick={handleConfirm} disabled={!isConfirmEnabled} fullWidth>
          {t('confirmButton')}
        </Button>
      </div>
    </div>
  );
};
