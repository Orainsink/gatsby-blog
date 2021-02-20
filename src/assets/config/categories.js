/**
 * 分类设置
 */
const categoryColumn = {
  tech: { path: '/archives', name: '技术' },
  leetcode: { path: '/leetcode', name: 'Leetcode', tag: '#F57109' },
  snippet: { path: '/snippet', name: 'Snippet', tag: '#2db7f5' },
  essay: { path: '/essay', name: '随笔', tag: '#87d068' },
};

const categories = Object.keys(categoryColumn);

module.exports = {
  /**分类配置数组 */
  categoryColumn,
  /**分类key数组 */
  categories,
};
