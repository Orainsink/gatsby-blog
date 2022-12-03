import { memo, ReactElement, useCallback } from 'react';

import { useTheme } from '../../../hooks';
import { Theme } from '../../../assets/constants/common';
import {
  Btn,
  Checkbox,
  DayNightToggleContainer,
  Feature,
} from './ThemeBtn.styles';

export const ThemeBtn = memo((): ReactElement | null => {
  const [theme, toggleTheme] = useTheme();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const curTheme = e.target.checked ? Theme.LIGHT : Theme.DARK;
    toggleTheme(curTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!theme) return null;

  const isDay = theme !== Theme.DARK;

  return (
    <DayNightToggleContainer>
      <Checkbox
        type="checkbox"
        id="toggle--daynight"
        onChange={handleChange}
        checked={isDay}
      />
      <Btn htmlFor="toggle--daynight">
        <Feature isDay={isDay} />
      </Btn>
    </DayNightToggleContainer>
  );
});
