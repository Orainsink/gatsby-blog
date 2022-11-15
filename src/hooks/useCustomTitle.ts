import { titleAtom } from './../store/atom';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';

/**
 * set header title text
 * @param title
 */
export const useCustomTitle = (title: string): void => {
  const setTitle = useSetRecoilState(titleAtom);

  useEffect(() => {
    setTitle(title);
    return () => {
      setTitle('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);
};
