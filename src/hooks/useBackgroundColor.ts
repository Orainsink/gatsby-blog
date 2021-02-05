import { useEffect } from 'react';

/**
 * set background color to #efefef
 */
export const useBackgroundColor = (trigger: boolean = true) => {
  useEffect(() => {
    if (trigger) document.body.style.background = 'var(--body-background)';
  }, [trigger]);
};
