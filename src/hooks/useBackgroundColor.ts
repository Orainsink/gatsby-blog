import { useEffect } from 'react';

/**
 * set background color to #efefef
 */
const useBackgroundColor = () => {
  useEffect(() => {
    document.body.style.background = '#efefef';
  }, []);
};
export default useBackgroundColor;
