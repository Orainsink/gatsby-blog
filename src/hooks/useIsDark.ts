import { Theme } from '../assets/constants/common';
import { useTheme } from './useTheme';
import { useEffect, useState } from 'react';

export const useIsDark = () => {
  const [theme] = useTheme();
  const [isDark, setIsDark] = useState<boolean>(theme === Theme.DARK);

  useEffect(() => {
    setIsDark(theme === Theme.DARK);
  }, [theme]);

  return isDark;
};
