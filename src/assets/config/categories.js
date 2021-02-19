/**
 * 分类设置
 */
const categoryColumn = [
  { key: 'tech', path: '/archives', name: '技术' },
  { key: 'leetcode', path: '/leetcode', name: 'Leetcode', tag: '#F57109' },
  { key: 'snippet', path: '/snippet', name: 'Snippet', tag: '#2db7f5' },
  { key: 'essay', path: '/essay', name: '随笔', tag: '#87d068' },
];

const categories = categoryColumn.map((item) => item.key);

module.exports = {
  /**分类配置数组 */
  categoryColumn,
  /**分类key数组 */
  categories,
};
