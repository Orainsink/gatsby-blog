const FONT_ARRAY = [
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
  headerFontFamily: FONT_ARRAY,
  bodyFontFamily: FONT_ARRAY,
  bodyWeight: 400,
  headerWeight: 700,
  boldWeight: 700,
  googleFonts: [
    {
      name: 'Lato',
      styles: ['400', '700'],
    },
  ],
  scaleRatio: 1.618,
  overrideStyles: () => ({
    code: {
      fontFamily: 'var(--font-family-code)',
      whiteSpace: 'pre-wrap',
    },
    pre: {
      fontFamily: 'var(--font-family-code)',
    },
  }),
};
