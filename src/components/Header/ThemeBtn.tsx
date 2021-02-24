import React, { useCallback } from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';
import styles from '../../styles/ThemeBtn.module.less';

const ThemeBtn = () => {
  const dispatch = useDispatch();
  const setTheme = useCallback(
    (payload: string | null) => {
      dispatch({ type: 'THEME', payload });
    },
    [dispatch]
  );

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
                const curTheme = e.target.checked ? 'light' : 'dark';
                toggleTheme(curTheme);
                setTheme(curTheme);
              }}
              checked={theme !== 'dark'}
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
export default React.memo(ThemeBtn);
