import { useEffect } from 'react';

/**
 * set background color to #efefef
 */
export const useBackgroundColor = (trigger: boolean = true): void => {
  useEffect(() => {
    if (trigger) document.body.style.background = 'var(--color-bg-layout)';
  }, [trigger]);
};
