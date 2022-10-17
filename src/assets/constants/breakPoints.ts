export enum BreakPoint {
  XL = 1280,
  LG = 1024,
  MD = 768,
  SM = 640,
}

export const MediaQueryMap = {
  sm: `@media (min-width: ${BreakPoint.SM}px)`,
  md: `@media (min-width: ${BreakPoint.MD}px)`,
  lg: `@media (min-width: ${BreakPoint.LG}px)`,
  xl: `@media (min-width: ${BreakPoint.XL}px)`,
  isNotDesktop: `@media (max-width: ${BreakPoint.LG - 1}px)`,
  isDesktop: `@media (min-width: ${BreakPoint.LG}px)`,
  isPad: `@media (min-width: ${BreakPoint.MD}px) and (max-width: ${
    BreakPoint.LG - 1
  }px)`,
  isMobile: `@media (max-width: ${BreakPoint.MD - 1}px)`,
};
