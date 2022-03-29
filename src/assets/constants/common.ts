export enum Theme {
    DARK= 'dark',
    LIGHT= 'light'
}

export enum BreakPoint {
    desktop = 1024,
    pad = 768,
    mobile = 320
}

export const MediaQueryMap = {
  isDesktop: `(min-width: ${BreakPoint.desktop + 1}px)`,
  isPad: `(min-width: ${BreakPoint.pad}px) and (max-width: ${BreakPoint.desktop}px)`,
  isMobile: `(max-width: ${BreakPoint.pad}px)`
}