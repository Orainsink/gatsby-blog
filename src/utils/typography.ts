import Typography from 'typography';
import { typographyThemeNoriega as noriega } from '../assets/theme/typography';
import { isDevelopment } from '../../scripts/env';

const typography = new Typography(noriega);

// Hot reload typography in development.
if (isDevelopment) {
  typography.injectStyles();
}

export default typography;
