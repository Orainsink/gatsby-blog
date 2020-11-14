import { useEffect } from 'react';
const useBackgroundColor = () => {
  useEffect(() => {
    document.body.style.background = '#efefef';
  }, []);
};
export default useBackgroundColor;
