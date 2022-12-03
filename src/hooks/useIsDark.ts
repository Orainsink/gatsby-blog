import { selector, useRecoilValue } from 'recoil';

import { themeAtom } from './../store/atom';
import { Theme } from '../assets/constants/common';

const isDarkSelector = selector({
  key: 'isDark',
  get: ({ get }) => {
    const theme = get(themeAtom);
    return theme === Theme.DARK;
  },
});

/**
 * return if the theme is dark
 * @function useIsDark
 * @param {Boolean} isDark
 **/
export const useIsDark = (): boolean => {
  const isDark = useRecoilValue(isDarkSelector);

  return isDark;
};
