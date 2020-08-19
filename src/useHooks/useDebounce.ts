import { useEffect } from 'react';
/**
 * https://github.com/zenghongtu/react-use-chinese/blob/master/src/useDebounce.ts
 * @function useDebounce
 * @param {Function} fn callback function
 * @param {Number} ms time
 * @param {Array} args useEffect arguments
 */
const useDebounce = (fn: () => any, ms: number = 0, args: any[] = []) => {
  useEffect(() => {
    const handle = setTimeout(fn.bind(null, args), ms);

    return () => {
      // if args change then clear timeout
      clearTimeout(handle);
    };
    // eslint-disable-next-line
  }, args);
};

export default useDebounce;
