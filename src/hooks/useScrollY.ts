import { useState, useEffect } from 'react';

import isClient from '../utils/isClient';

function getScrollPosition() {
  return isClient ? document.body.scrollTop : 0;
}

/**
 * body scrollY hook
 * @function useScrollY
 * @returns {number} scrollY
 */
export const useScrollY = (): number => {
  const [scrollY, setScrollY] = useState(getScrollPosition());

  useEffect(() => {
    if (!isClient) return;

    let requestRunning: number | null = null;
    function handleScroll() {
      if (isClient && requestRunning === null) {
        requestRunning = window.requestAnimationFrame(() => {
          setScrollY(getScrollPosition());
          requestRunning = null;
        });
      }
    }

    document.body.addEventListener('scroll', handleScroll);
    return () => document.body.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
};
