import { useEffect, useState } from 'react';
import useWindowSize from './useWindowSize';

const useMaxHeight = (): number => {
  const [, height] = useWindowSize();
  const [maxHeight, setMaxHeight] = useState(0);
  useEffect(() => {
    if (height > maxHeight) setMaxHeight(height);
  }, [height]);
  return maxHeight;
};
export default useMaxHeight;
