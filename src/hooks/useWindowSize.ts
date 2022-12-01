import { useEffect, useState } from 'react';
/** resize hook
 * @function useWindowSize
 * @returns {number[]} [width, height]
 */
export const useWindowSize = (): [number, number] => {
  const [size, setSize] = useState<[number, number]>([0, 0]);
  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};
