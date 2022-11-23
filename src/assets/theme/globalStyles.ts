import { createGlobalStyle } from 'styled-components';
import { theme } from 'antd';

const { darkAlgorithm, defaultAlgorithm, defaultSeed } = theme;

const defaultMapToken = defaultAlgorithm(defaultSeed);
const darkMapToken = darkAlgorithm(defaultSeed);

export const GlobalStyles = createGlobalStyle`
  :root body{
    /* -------- Common Variables ---------- */
    --border-radius: ${defaultSeed.borderRadius}px;
    --space-xxs: 4px;
    --space-xs: 8px;
    --space-sm: 12px;
    --space-md: 16px;
    --space-lg: 24px;
    --space-xl: 32px;
    --space-xxl: 48px;

    --box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
    --box-shadow-secondary: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);

    --color-primary: ${defaultMapToken.colorPrimary};
    --color-primary-hover: ${defaultMapToken.colorPrimaryBorderHover};
    
    /* -------- Text ---------- */
    --color-text: ${defaultMapToken.colorText};
    --color-text-secondary: ${defaultMapToken.colorTextSecondary};
    --color-text-third: rgba(0,0,0,0.3);
    --color-text-fourth: rgba(0,0,0,0.1);
    /* -------- Bg ---------- */
    --color-bg-layout: #efefef;
    --color-bg-elevated: ${defaultMapToken.colorBgElevated};
    --color-bg-container: #fff;
    /* -------- Fill ---------- */
    --color-fill: ${defaultMapToken.colorFill};
    --color-fill-secondary: ${defaultMapToken.colorFillSecondary};
    --color-fill-third: ${defaultMapToken.colorFillTertiary};
    --color-fill-fourth: ${defaultMapToken.colorFillQuaternary};
    /* -------- Border ---------- */
    --color-border: ${defaultMapToken.colorBorder};
    --color-border-secondary: ${defaultMapToken.colorBorderSecondary};
    /* -------- Code ---------- */
    --color-code-bg: #f6f6f6;
    --color-code: #db4c69;
    /* -------- Link ---------- */
    --color-link: var(--color-primary);
    --color-link-hover: var(--color-primary-hover);

    /* -------- Temp variables ---------- */
    --component-hover: #f5f5f5;
  }

  :root body.dark {
    /* -------- Dark Variables ---------- */
    --color-text: ${darkMapToken.colorText};
    --color-text-secondary: ${darkMapToken.colorTextSecondary};
    --color-text-third: rgba(255,255,255,0.3);
    --color-text-fourth: rgba(255,255,255,0.1);
    /* -------- Bg ---------- */
    --color-bg-layout: #141619;
    --color-bg-elevated: ${darkMapToken.colorBgElevated};
    --color-bg-container: #2b2b2e;
    /* -------- Fill ---------- */
    --color-fill: ${darkMapToken.colorFill};
    --color-fill-secondary: ${darkMapToken.colorFillSecondary};
    --color-fill-third: ${darkMapToken.colorFillTertiary};
    --color-fill-fourth: ${darkMapToken.colorFillQuaternary};
    /* -------- Border ---------- */
    --color-border: ${darkMapToken.colorBorder};
    --color-border-secondary: ${darkMapToken.colorBorderSecondary};
    /* -------- Code ---------- */
    --color-code-bg: #1e1e1e;
    --color-code: #9cdcfe;

    /* -------- Temp variables ---------- */
    --component-hover: #47474b;
  }
`;
