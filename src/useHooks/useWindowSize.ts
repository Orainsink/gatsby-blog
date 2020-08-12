import { useLayoutEffect, useState } from 'react';
/** resize hook
 * @returns {number[]} [width, height]
 */
const useWindowSize = (): [number, number] => {
  const [size, setSize] = useState<[number, number]>([0, 0]);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};
export default useWindowSize;
