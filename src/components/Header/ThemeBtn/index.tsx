import { memo, useCallback, useEffect } from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';

import * as styles from './index.module.less';
import { useMedia } from '../../../hooks';
import { Theme } from '../../../assets/constants/common';

const ThemeBtn = () => {
  const dispatch = useDispatch();
  const setTheme = useCallback(
    (payload: string | null) => {
      dispatch({ type: 'THEME', payload });
    },
    [dispatch]
  );
  const isBrowserColorSchemeDark = useMedia('prefers-color-scheme: dark');

  useEffect(() => {
    const browserColorScheme = isBrowserColorSchemeDark
      ? Theme.DARK
      : Theme.LIGHT;
    setTheme(globalThis.localStorage?.getItem('theme') ?? browserColorScheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBrowserColorSchemeDark]);

  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => {
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
export default memo(ThemeBtn);
