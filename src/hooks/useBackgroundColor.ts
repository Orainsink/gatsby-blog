import { useLayoutEffect } from 'react';

/**
 * set background color to #efefef
 */
export const useBackgroundColor = (trigger: boolean = true): void => {
  useLayoutEffect(() => {
    if (trigger) document.body.style.background = 'var(--color-bg-layout)';
  }, [trigger]);
};
