import { ReactElement } from 'react';

import { useTheme } from '../../../hooks';
import { Theme } from '../../../assets/constants/common';
import {
  Btn,
  Checkbox,
  DayNightToggleContainer,
  Feature,
} from './ThemeBtn.styles';

export const ThemeBtn = (): ReactElement | null => {
  const [theme, toggleTheme] = useTheme();
  if (!theme) return null;

  const isDay = theme !== Theme.DARK;

  return (
    <DayNightToggleContainer>
      <Checkbox
        type="checkbox"
        id="toggle--daynight"
        onChange={(e) => {
          const curTheme = e.target.checked ? Theme.LIGHT : Theme.DARK;
          toggleTheme(curTheme);
        }}
        checked={isDay}
      />
      <Btn htmlFor="toggle--daynight">
        <Feature isDay={isDay} />
      </Btn>
    </DayNightToggleContainer>
  );
};
