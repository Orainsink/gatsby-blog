import { useEffect } from 'react';

/**
 * set background color to #efefef
 */
const useBackgroundColor = (trigger: boolean = true) => {
  useEffect(() => {
    if (trigger) document.body.style.background = '#efefef';
  }, [trigger]);
};
export default useBackgroundColor;
