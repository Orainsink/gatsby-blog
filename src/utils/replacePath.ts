// Replacing '/' would result in empty string which is invalid
export const replacePath = (path: string) =>
  path === `/` ? path : path.replace(/\/$/, ``);
