const fontArray = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Helvetica Neue',
  'Arial',
  'Noto Sans',
  'sans-serif',
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
  'Noto Color Emoji',
];

export const typographyThemeNoriega = {
  title: 'Noriega',
  baseFontSize: '16px',
  baseLineHeight: 1.6,
  bodyFontFamily: fontArray,
  bodyWeight: 400,
  headerWeight: 700,
  boldWeight: 700,
  scaleRatio: 1.618,
  overrideStyles: () => ({
    html: {
      overflowY: 'hidden',
      width: '100%',
      height: '100%',
    },
    body: {
      position: 'relative',
      overflowX: 'hidden',
      color: 'var(--color-text)',
      backgroundColor: 'var(--color-bg-layout)',
      width: '100%',
      height: '100%',
    },
    code: {
      fontFamily: 'var(--font-family-code)',
      whiteSpace: 'pre-wrap',
    },
    pre: {
      fontFamily: 'var(--font-family-code)',
    },
    a: {
      textDecoration: 'none',
      color: 'var(--color-link)',
    },
    'a:hover': {
      color: 'var(--color-link-hover)',
    },
    'a:active': {
      color: 'var(--color-link-active)',
    },
    li: {
      listStyle: 'none',
    },
  }),
};
