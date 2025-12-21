'use client';

import { type FC, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { format, fromUnixTime } from 'date-fns';
import { Button } from '@/shared/ui';
import styles from './success-page.module.scss';

interface Props {}

export const SuccessPage: FC<Props> = () => {
  const searchParams = useSearchParams();
  const [bookingInfo, setBookingInfo] = useState<{
    date: string;
    time: string;
  } | null>(null);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!searchParams) return;

    const timestamp = searchParams.get('timestamp');

    if (timestamp) {
      const date = fromUnixTime(parseInt(timestamp, 10));

      setBookingInfo({
        date: format(date, 'EEEE, MMMM d, yyyy'),
        time: format(date, 'h:mm a'),
      });
    }
  }, [searchParams]);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !bookingInfo) return;

    setIsSending(true);

    // Mock API call
    await new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });

    // eslint-disable-next-line no-console
    console.log('Sending confirmation email to:', email);
    // eslint-disable-next-line no-console
    console.log('Booking details:', bookingInfo);

    setEmailSent(true);
    setIsSending(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.successCard}>
        <div className={styles.iconWrapper}>
          <svg
            className={styles.checkIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className={styles.title}>Booking Confirmed!</h1>
        <p className={styles.subtitle}>
          Your session has been successfully booked
        </p>

        {bookingInfo ? (
          <div className={styles.bookingDetails}>
            <p className={styles.detailsTitle}>Your Booking Details:</p>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Date:</span>
              <span className={styles.detailValue}>{bookingInfo.date}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Time:</span>
              <span className={styles.detailValue}>{bookingInfo.time}</span>
            </div>
          </div>
        ) : (
          <div className={styles.bookingDetails}>
            <p className={styles.noDetails}>Loading booking details...</p>
          </div>
        )}

        {!emailSent ? (
          <div className={styles.emailSection}>
            <p className={styles.emailPrompt}>
              Enter your email to receive a confirmation
            </p>
            <form onSubmit={handleSendEmail} className={styles.emailForm}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className={styles.emailInput}
                required
                disabled={isSending}
              />
              <Button type="submit" disabled={isSending || !email} fullWidth>
                {isSending ? 'Sending...' : 'Send Confirmation'}
              </Button>
            </form>
          </div>
        ) : (
          <div className={styles.emailSuccess}>
            <p className={styles.emailSuccessText}>
              ✓ Confirmation email sent to <strong>{email}</strong>
            </p>
          </div>
        )}

        <a href="/" className={styles.backButton}>
          Back to Home
        </a>
      </div>
    </div>
  );
};
