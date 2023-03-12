/**分类配置 */
export const CATEGORY_MAP = new Map([
  ['tech', { path: '/tech', name: '技术' }],
  ['essay', { path: '/essay', name: '随笔', tag: '#87d068' }],
  ['snippet', { path: '/snippet', name: '小抄', tag: '#2db7f5' }],
]);
/**分类key数组 */
export const CATEGORY_NAMES = Array.from(CATEGORY_MAP.keys());

/**archive key array */
export const MENU_NAMES = (() => {
  let columns = [];
  for (let i = 0; i < CATEGORY_NAMES.length; i += 2) {
    columns.push(CATEGORY_NAMES.slice(i, i + 2));
  }
  return columns;
})();
