import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

/**
 * set header title text
 * @param title
 */
const useCustomTitle = (title: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'TITLE', payload: title });
    return () => {
      dispatch({ type: 'TITLE', payload: '' });
    };
  }, [dispatch, title]);
};
export default useCustomTitle;
