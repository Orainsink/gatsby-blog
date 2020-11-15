import { useState, useEffect } from 'react';
const isBrowser = typeof window !== `undefined`;

function getScrollPosition() {
  return isBrowser ? document.body.scrollTop : 0;
}

/**
 * body scrollY hook
 * @function useScrollY
 * @returns {number} scrollY
 */
const useScrollY = (): number => {
  const [scrollY, setScrollY] = useState(getScrollPosition());

  useEffect(() => {
    if (!isBrowser) return;

    let requestRunning: number | null = null;
    function handleScroll() {
      if (isBrowser && requestRunning === null) {
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

export default useScrollY;
