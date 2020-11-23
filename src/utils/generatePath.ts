import hashString from './hashString';
/**
 * 生成categories + hashId的路径
 * @param categories
 * @param id
 */
const generatePath = (categories: string, id: string) => {
  return `/${categories}/${hashString(id)}`;
};
export default generatePath;
