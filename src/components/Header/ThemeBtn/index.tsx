import { ReactElement, useEffect } from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import classnames from 'classnames';

import * as styles from './index.module.less';
import { useMedia } from '../../../hooks';
import { Theme } from '../../../assets/constants/common';
import { useSetRecoilState } from 'recoil';
import { themeAtom } from '../../../store/atom';
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

        return (
          <div className={classnames(styles.toggle, styles.daynight)}>
            <input
              type="checkbox"
              id="toggle--daynight"
              className={styles.checkbox}
              onChange={(e) => {
                const curTheme = e.target.checked ? Theme.LIGHT : Theme.DARK;
                toggleTheme(curTheme);
                setTheme(curTheme);
              }}
              checked={theme !== Theme.DARK}
            />
            <label className={styles.btn} htmlFor="toggle--daynight">
              <span className={styles.feature}></span>
            </label>
          </div>
        );
      }}
    </ThemeToggler>
  );
};
