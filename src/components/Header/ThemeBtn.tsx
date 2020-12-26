import React, { useCallback } from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import { Switch } from 'antd';
import { useDispatch } from 'react-redux';

const ThemeBtn = () => {
  const dispatch = useDispatch();
  const setTheme = useCallback(
    (payload: boolean | null) => {
      dispatch({ type: 'THEME', payload });
    },
    [dispatch]
  );

  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => {
        if (theme == null) {
          return null;
        }
        setTheme(theme);
        return (
          <Switch
            defaultChecked
            onChange={(checked: boolean) =>
              toggleTheme(checked ? 'dark' : 'light')
            }
            checked={theme === 'dark'}
          />
        );
      }}
    </ThemeToggler>
  );
};
export default React.memo(ThemeBtn);
