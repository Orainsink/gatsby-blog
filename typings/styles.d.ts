import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    media: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      isNotDesktop: string;
      isNotMobile: string;
      isDesktop: string;
      isPad: string;
      isMobile: string;
    };
  }
}
