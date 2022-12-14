// Replacing '/' would result in empty string which is invalid
export const replacePath = (path: string) => {
  if (!path) return '';
  return path === `/` ? path : path.replace(/\/$/, ``);
};
