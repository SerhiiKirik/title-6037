import type { FC } from 'react';
import styles from './loader.module.scss';

export const Loader: FC = () => (
  <div className={styles.container}>
    <div className={styles.spinner} />
  </div>
);
