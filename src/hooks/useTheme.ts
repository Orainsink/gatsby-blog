import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { themeAtom } from '../store/atom';

declare global {
  interface Window {
    __theme: string;
    __onThemeChange: () => void;
    __setPreferredTheme: (theme: string) => void;
  }
}

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useRecoilState(themeAtom);

  useEffect(() => {
    window.__onThemeChange = () => {
      setCurrentTheme(window.__theme);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTheme = useCallback((theme: string) => {
    window.__setPreferredTheme(theme);
  }, []);

  return [currentTheme, toggleTheme] as [
    typeof currentTheme,
    typeof toggleTheme
  ];
};
