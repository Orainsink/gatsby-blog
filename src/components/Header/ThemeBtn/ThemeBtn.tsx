import { ReactElement, useEffect } from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';

import { useMedia } from '../../../hooks';
import { Theme } from '../../../assets/constants/common';
import { useSetRecoilState } from 'recoil';
import { themeAtom } from '../../../store/atom';
import {
  Btn,
  Checkbox,
  DayNightToggleContainer,
  Feature,
} from './ThemeBtn.styles';

interface ThemeTogglerHelper {
  theme: string;
  toggleTheme: (theme: string) => void;
}
export const ThemeBtn = (): ReactElement => {
  const setTheme = useSetRecoilState(themeAtom);

  const isBrowserColorSchemeDark = useMedia('prefers-color-scheme: dark');

  useEffect(() => {
    const browserColorScheme = isBrowserColorSchemeDark
      ? Theme.DARK
      : Theme.LIGHT;
    setTheme(localStorage.getItem('theme') ?? browserColorScheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBrowserColorSchemeDark]);

  return (
    <ThemeToggler>
      {({ theme, toggleTheme }: ThemeTogglerHelper) => {
        if (!theme) return;

        const isDay = theme !== Theme.DARK;

        return (
          <DayNightToggleContainer>
            <Checkbox
              type="checkbox"
              id="toggle--daynight"
              onChange={(e) => {
                const curTheme = e.target.checked ? Theme.LIGHT : Theme.DARK;
                toggleTheme(curTheme);
                setTheme(curTheme);
              }}
              checked={isDay}
            />
            <Btn htmlFor="toggle--daynight">
              <Feature isDay={isDay} />
            </Btn>
          </DayNightToggleContainer>
        );
      }}
    </ThemeToggler>
  );
};
