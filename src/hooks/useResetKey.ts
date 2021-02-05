import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

/**
 * reset curTag and curDate when component is unmounted
 */
export const useResetKey = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch({
        type: 'RESET_SEARCH',
      });
    };
  }, [dispatch]);
};
