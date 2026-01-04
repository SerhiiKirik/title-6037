'use client';

import { type FC, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { format, fromUnixTime } from 'date-fns';
import { uk, enUS } from 'date-fns/locale';
import { Button } from '@/shared/ui';
import { CheckIcon } from '@/shared/ui/icons/check';
import { Link } from '@/shared/config/i18n';
import styles from './success-page.module.scss';

interface Props {}

export const SuccessPage: FC<Props> = () => {
  const t = useTranslations('success');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [bookingInfo, setBookingInfo] = useState<{
    date: string;
    time: string;
  } | null>(null);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Get date-fns locale based on current locale
  const dateFnsLocale = locale === 'uk' ? uk : enUS;

  useEffect(() => {
    if (!searchParams) return;

    const timestamp = searchParams.get('timestamp');

    if (timestamp) {
      const date = fromUnixTime(parseInt(timestamp, 10));

      setBookingInfo({
        date: format(date, 'EEEE, d MMMM yyyy', { locale: dateFnsLocale }),
        time: format(date, 'H:mm', { locale: dateFnsLocale }),
      });
    }
  }, [searchParams, dateFnsLocale]);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !bookingInfo) return;

    setIsSending(true);

    // Mock API call
    await new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });

    setEmailSent(true);
    setIsSending(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.successCard}>
        <div className={styles.iconWrapper}>
          <CheckIcon className={styles.checkIcon} />
        </div>

        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>

        {bookingInfo ? (
          <div className={styles.bookingDetails}>
            <p className={styles.detailsTitle}>{t('detailsTitle')}</p>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>{t('dateLabel')}</span>
              <span className={styles.detailValue}>{bookingInfo.date}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>{t('timeLabel')}</span>
              <span className={styles.detailValue}>{bookingInfo.time}</span>
            </div>
          </div>
        ) : (
          <div className={styles.bookingDetails}>
            <p className={styles.noDetails}>{t('loading')}</p>
          </div>
        )}

        {!emailSent ? (
          <div className={styles.emailSection}>
            <p className={styles.emailPrompt}>{t('emailPrompt')}</p>
            <form onSubmit={handleSendEmail} className={styles.emailForm}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder')}
                className={styles.emailInput}
                required
                disabled={isSending}
              />

              <Button type="submit" disabled={isSending || !email} fullWidth>
                {isSending ? t('sending') : t('sendButton')}
              </Button>
            </form>
          </div>
        ) : (
          <div className={styles.emailSuccess}>
            <p className={styles.emailSuccessText}>
              ✓ {t('emailSent')} <strong>{email}</strong>
            </p>
          </div>
        )}

        <Link href="/" className={styles.backButton}>
          {t('backButton')}
        </Link>
      </div>
    </div>
  );
};
