import { filterAtom } from './../store/atom';
import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';

/**
 * reset curTag and curDate when component is unmounted
 */
export const useResetKey = (): void => {
  const resetFilter = useResetRecoilState(filterAtom);

  useEffect(() => {
    resetFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
