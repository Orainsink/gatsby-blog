import { useState, useEffect } from 'react';

const isBrowser = typeof window !== `undefined`;

function getScrollPosition() {
  return isBrowser ? document.body.scrollTop : 0;
}

const useScrollY = () => {
  const [scrollY, setScrollY] = useState(getScrollPosition());

  useEffect(() => {
    let requestRunning: number | null = null;
    function handleScroll() {
      if (isBrowser && requestRunning === null) {
        requestRunning = window.requestAnimationFrame(() => {
          setScrollY(getScrollPosition());
          requestRunning = null;
        });
      }
    }

    if (isBrowser) {
      document.body.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return scrollY;
};

export default useScrollY;
