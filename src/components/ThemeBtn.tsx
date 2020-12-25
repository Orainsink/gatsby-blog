import React from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import { Switch } from 'antd';

const ThemeBtn = () => {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => {
        if (theme == null) {
          return null;
        }
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
