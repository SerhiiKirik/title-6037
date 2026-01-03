import styles from './hero.module.scss';

export const Hero = () => (
  <section className={styles.hero}>
    <div className={styles.content}>
      <h1 className={styles.title}>Cool session</h1>

      <p className={styles.subtitle}>Additional type</p>

      <p className={styles.timing}>30 min</p>
    </div>
  </section>
);
