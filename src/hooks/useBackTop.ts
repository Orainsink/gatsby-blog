import { useEffect } from 'react';
import { useLocation } from '@reach/router';

/**
 * back top when path change
 */
const useBackTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window?.scrollTo(0, 0);
    document?.body.scrollTo(0, 0);
  }, [pathname]);
};
export default useBackTop;
