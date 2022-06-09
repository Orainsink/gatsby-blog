import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { iRootState } from '../redux/store';
import { useWindowSize } from './useWindowSize';

/**
 * Maximum height, for image position
 * @function useMaxHeight
 */
export const useMaxHeight = (): void => {
  const [, height] = useWindowSize();
  const dispatch = useDispatch();
  const maxHeight = useSelector((state: iRootState) => state.maxHeight);
  useEffect(() => {
    if (height > maxHeight) dispatch({ type: 'MAX_HEIGHT', payload: height });
  }, [height, maxHeight, dispatch]);
};
