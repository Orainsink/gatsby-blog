import hashString from './hashString';
/**
 * 生成categories + hashId的路径
 * @param categories
 * @param id
 */
const generatePath = (categories: string, id: string) => {
  if (!categories || !id) return '/404';
  return `/${categories}/${hashString(id)}`;
};
export default generatePath;
