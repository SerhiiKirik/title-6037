import React from 'react';
import styles from './header.module.css';

interface Props {
  logo?: string;
  title?: string;
}

export const Header: React.FC<Props> = ({ logo, title = 'Booking App' }) => (
  <header className={styles.header}>
    <div className={styles.container}>
      <div className={styles.brand}>
        {logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={title} className={styles.logo} />
        )}
        <h1 className={styles.title}>{title}</h1>
      </div>
    </div>
  </header>
);
