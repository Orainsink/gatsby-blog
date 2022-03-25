import Typography from 'typography';
import {typographyThemeNoriega as noriega} from '../assets/theme/typography';

delete noriega.googleFonts;

const typography = new Typography(noriega);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
