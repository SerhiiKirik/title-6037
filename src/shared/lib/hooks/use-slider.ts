import { useRef, useState, useEffect, useCallback } from 'react';

interface UseSliderReturn {
  containerRef: React.RefObject<HTMLDivElement>;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  scrollLeft: () => void;
  scrollRight: () => void;
}

export const useSlider = (scrollAmount = 300): UseSliderReturn => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  const scrollLeft = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  }, [scrollAmount]);

  const scrollRight = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  }, [scrollAmount]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    // Initial check
    updateScrollButtons();

    // Listen to scroll events
    container.addEventListener('scroll', updateScrollButtons);

    // Listen to resize events
    const resizeObserver = new ResizeObserver(updateScrollButtons);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', updateScrollButtons);
      resizeObserver.disconnect();
    };
  }, [updateScrollButtons]);

  return {
    containerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
  };
};
