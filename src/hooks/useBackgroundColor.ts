import { useEffect } from 'react';

/**
 * set background color to #efefef
 */
const useBackgroundColor = (trigger: boolean = true) => {
  useEffect(() => {
    if (trigger) document.body.style.background = 'var(--body-background)';
  }, [trigger]);
};
export default useBackgroundColor;
