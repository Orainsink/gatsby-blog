/**分类配置 */
export const FILE_SYSTEM_CATEGORY_MAP = {
  tech: { path: '/tech', name: '技术', tag: '' },
  essay: { path: '/essay', name: '随笔', tag: '#87d068' },
  snippet: { path: '/snippet', name: '小抄', tag: '#2db7f5' },
};

export const fileSystemCategories = {
  ...FILE_SYSTEM_CATEGORY_MAP,
  resume: { path: '/resume', name: '简历' },
};

/**分类key数组 */
export const fileSystemNames = Object.keys(FILE_SYSTEM_CATEGORY_MAP);

/**archive key array */
export const MENU_NAMES = (() => {
  const menus = Object.keys(fileSystemCategories);
  let columns = [];
  for (let i = 0; i < menus.length; i += 2) {
    columns.push(menus.slice(i, i + 2));
  }
  return columns;
})();
