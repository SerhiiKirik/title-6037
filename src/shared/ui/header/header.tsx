import type { FC } from 'react';
import { LanguageSwitcher } from '@/features/language-switcher';
import styles from './header.module.scss';

interface Props {
  logo?: string;
  title?: string;
}

export const Header: FC<Props> = ({ logo, title = 'Booking App' }) => (
  <header className={styles.header}>
    <div className={styles.container}>
      <div className={styles.brand}>
        {logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={title} className={styles.logo} />
        )}
        <h1 className={styles.title}>{title}</h1>
      </div>
      <LanguageSwitcher />
    </div>
  </header>
);
