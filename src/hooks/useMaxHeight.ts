import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useWindowSize from './useWindowSize';

/**
 * Maximum height, for image position
 * @function useMaxHeight
 */
const useMaxHeight = () => {
  const [, height] = useWindowSize();
  const dispatch = useDispatch();
  const maxHeight = useSelector((state) => state.maxHeight);
  useEffect(() => {
    if (height > maxHeight) dispatch({ type: 'MAX_HEIGHT', payload: height });
  }, [height, maxHeight, dispatch]);
};
export default useMaxHeight;
