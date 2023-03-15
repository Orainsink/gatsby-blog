/**分类配置 */
export const FILE_SYSTEM_CATEGORY_MAP = {
  snippet: { path: '/snippet', name: '小抄', tag: '#2db7f5' },
  essay: { path: '/essay', name: '随笔', tag: '#87d068' },
  tech: { path: '/tech', name: '技术', tag: '' },
};

export const fileSystemCategories = {
  resume: { path: '/resume', name: '简历' },
  ...FILE_SYSTEM_CATEGORY_MAP,
};

/**分类key数组 */
export const fileSystemNames = Object.keys(FILE_SYSTEM_CATEGORY_MAP);

/**archive key array */
export const menuNames = (() => {
  const menus = Object.keys(fileSystemCategories);
  let columns = [];
  for (let i = 0; i < menus.length; i += 2) {
    columns.push(menus.slice(i, i + 2));
  }
  return columns;
})();
