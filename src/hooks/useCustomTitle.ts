import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useCustomTitle = (title: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'TITLE', payload: title });
    return () => {
      dispatch({ type: 'TITLE', payload: '' });
    };
  }, [dispatch]);
};
export default useCustomTitle;
