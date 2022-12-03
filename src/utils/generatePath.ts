import { replacePath } from './replacePath';
/**
 * 生成categories + title的路径
 * @param categories
 * @param title
 */
export const generatePath = (categories: string, title: string): string => {
  return `/${categories}/${replacePath(title)}`;
};
