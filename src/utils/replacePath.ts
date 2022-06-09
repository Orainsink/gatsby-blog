// Replacing '/' would result in empty string which is invalid
const replacePath = (path: string) =>
  path === `/` ? path : path.replace(/\/$/, ``);

export default replacePath;
