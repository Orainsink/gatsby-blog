import { hashString } from './hashString';
/**
 * 生成categories + hashId的路径
 * @param categories
 * @param id
 */
export const generatePath = (categories: string, id: string): string => {
  return `/${categories}/${hashString(id)}`;
};
