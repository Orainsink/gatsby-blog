import { useSelector } from 'react-redux';

import { Theme } from '../assets/constants/common';
import { iRootState } from '../redux/store';

/**
 * return if the theme is dark
 * @function useIsDark
 * @param {Boolean} isDark
 **/
export const useIsDark = () => {
  const isDark = useSelector((state: iRootState) => state.theme === Theme.DARK);

  return isDark
};
