import { defaultMapToken } from './globalStyles';

const fontArray = defaultMapToken.fontFamilyCode
  .replaceAll("'", '')
  .split(',')
  .map((fontString) => fontString.trim());

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
    code: {
      fontFamily: 'var(--font-family-code)',
      whiteSpace: 'pre-wrap',
    },
    pre: {
      fontFamily: 'var(--font-family-code)',
    },
  }),
};
