'use client';

import React from 'react';
import { useSlider } from '@/shared/lib/hooks';
import { ArrowIcon } from '@/shared/ui/icons/arrow';
import styles from './slider.module.css';

interface Props {
  children: React.ReactNode;
  scrollAmount?: number;
}

export const Slider: React.FC<Props> = ({ children, scrollAmount = 280 }) => {
  const {
    containerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
  } = useSlider(scrollAmount);

  return (
    <div className={styles.sliderWrapper}>
      <button
        type="button"
        onClick={scrollLeft}
        className={styles.navButton}
        aria-label="Scroll left"
        disabled={!canScrollLeft}
      >
        <ArrowIcon className={styles.leftArrow} />
      </button>

      <div ref={containerRef} className={styles.sliderContainer}>
        {children}
      </div>

      <button
        type="button"
        onClick={scrollRight}
        className={styles.navButton}
        aria-label="Scroll right"
        disabled={!canScrollRight}
      >
        <ArrowIcon />
      </button>
    </div>
  );
};
