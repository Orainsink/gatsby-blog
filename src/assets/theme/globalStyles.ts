import { createGlobalStyle } from 'styled-components';
import { theme } from 'antd';

import darkValley from '../img/valley-dark.svg';
import valley from '../img/valley.svg';
import { lightPrismVariables, darkPrismVariables } from './prismVariables';

const { darkAlgorithm, defaultAlgorithm, defaultSeed } = theme;

export const defaultMapToken = defaultAlgorithm(defaultSeed);
const darkMapToken = darkAlgorithm(defaultSeed);

export const GlobalStyles = createGlobalStyle`
  :root body{
    /* -------- Common Variables ---------- */
    --border-radius: ${defaultSeed.borderRadius}px;
    --border-radius-sm: 4px;

    --space-xxs: 0.25rem;
    --space-xs: 0.5rem;
    --space-sm: 0.75rem;
    --space-md: 1rem;
    --space-lg: 1.5rem;
    --space-xl: 2rem;
    --space-xxl: 3rem;

    --font-family-code: ${defaultSeed.fontFamilyCode};

    --font-size-sm: 14px;
    --font-size-md: 16px;
    --font-size-lg: 18px;
    --font-size-xl: 20px;
    --font-size-xxl: 24px;
    --font-weight-lg: 500;
    --font-weight-xl: 700;

    --box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
    --box-shadow-secondary: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);

    --color-primary: ${defaultMapToken.colorPrimary};
    --color-primary-hover: ${defaultMapToken.colorPrimaryBorderHover};
    --color-primary-active: ${defaultMapToken.colorPrimaryHover};

    --color-error: ${defaultMapToken.colorError};
    
    /* -------- Text ---------- */
    --color-text: ${defaultMapToken.colorText};
    --color-text-secondary: ${defaultMapToken.colorTextSecondary};
    --color-text-third: rgba(0,0,0,0.3);
    --color-text-fourth: rgba(0,0,0,0.1);
    --color-text-disabled: rgba(0,0,0,0.25);
    /* -------- Bg ---------- */
    --color-bg-layout: #efefef;
    --color-bg-elevated: ${defaultMapToken.colorBgElevated};
    --color-bg-container: #fff;
    --color-bg-container-disabled: rgba(0, 0, 0, 0.04);
    --color-bg-component: #fff;
    --color-component-hover: rgba(0,0,0,0.1);
    /* -------- Fill ---------- */
    --color-fill: ${defaultMapToken.colorFill};
    --color-fill-secondary: ${defaultMapToken.colorFillSecondary};
    --color-fill-third: ${defaultMapToken.colorFillTertiary};
    --color-fill-fourth: ${defaultMapToken.colorFillQuaternary};
    /* -------- Border ---------- */
    --color-border: ${defaultMapToken.colorBorder};
    --color-border-secondary: ${defaultMapToken.colorBorderSecondary};
    /* -------- Link ---------- */
    --color-link: var(--color-primary);
    --color-link-hover: var(--color-primary-hover);
    --color-link-active: var(--color-primary-active);
    /* -------- Post ---------- */
    --color-mdx-header: var(--color-text);
    --color-mdx-header-hover: var(--color-text-secondary);

    --image-footer: url(${valley});

    ${lightPrismVariables}
  }

  :root[data-theme='dark'] body {
    --color-primary: ${defaultMapToken.colorWarningText};
    --color-primary-hover: ${defaultMapToken.colorWarningTextHover};
    --color-primary-active: ${defaultMapToken.colorWarningTextActive};

    --color-error: ${darkMapToken.colorError};

    /* -------- Dark Variables ---------- */
    --color-text: ${darkMapToken.colorText};
    --color-text-secondary: ${darkMapToken.colorTextSecondary};
    --color-text-third: rgba(255,255,255,0.3);
    --color-text-fourth: rgba(255,255,255,0.1);
    --color-text-disabled: rgba(255,255,255,0.25);
    /* -------- Bg ---------- */
    --color-bg-layout: #141619;
    --color-bg-elevated: ${darkMapToken.colorBgElevated};
    --color-bg-container: #2b2b2e;
    --color-bg-container-disabled: rgba(255, 255, 255, 0.04);
    --color-bg-component: #3a3a3e;
    --color-component-hover: rgba(255,255,255,0.1);
    /* -------- Fill ---------- */
    --color-fill: ${darkMapToken.colorFill};
    --color-fill-secondary: ${darkMapToken.colorFillSecondary};
    --color-fill-third: ${darkMapToken.colorFillTertiary};
    --color-fill-fourth: ${darkMapToken.colorFillQuaternary};
    /* -------- Border ---------- */
    --color-border: ${darkMapToken.colorBorder};
    --color-border-secondary: ${darkMapToken.colorBorderSecondary};
    /* -------- Post ---------- */
    --color-mdx-header: ${darkMapToken.colorWarning};
    --color-mdx-header-hover: ${darkMapToken.colorWarningHover};

    --image-footer: url(${darkValley});

    ${darkPrismVariables}
  }
`;
