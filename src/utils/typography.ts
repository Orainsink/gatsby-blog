import Typography from 'typography';
import noriega from 'typography-theme-noriega';

noriega.baseFontSize = '16px';
noriega.overrideThemeStyles = () => {
  return {
    'a.gatsby-resp-image-link': {
      boxShadow: `none`,
    },
  };
};

delete noriega.googleFonts;

const typography = new Typography(noriega);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
