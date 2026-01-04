'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ClockIcon } from '@/shared/ui/icons/clock';
import { EllipseIcon } from '@/shared/ui/icons/ellipse';
import styles from './hero.module.scss';

export const Hero = () => {
  const t = useTranslations('hero');

  return (
    <>
      <section className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>{t('title')}</h1>

          <p className={styles.subtitle}>{t('subtitle')}</p>

          <p className={styles.timing}>
            <ClockIcon className={styles.icon} width={16} height={16} />

            <span>{t('timing')}</span>
          </p>
        </div>

        <div className={styles.imageWrapper}>
          <EllipseIcon
            width={302}
            widths={302}
            className={styles.ellipseIcon}
          />

          <Image
            src="/person_mobile_3x.webp"
            alt="Smiling woman with curly hair wearing a teal sweater and a brown coat against an orange background."
            width={202}
            height={290}
            priority
            className={styles.personImage}
          />
        </div>
      </section>

      <div className={styles.shadow} />
    </>
  );
};
