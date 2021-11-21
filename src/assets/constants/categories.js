/**
 * 分类设置
 */
const CATEGORY_MAP = new Map([
  ['tech', { path: '/archives', name: '技术' }],
  ['leetcode', { path: '/leetcode', name: 'Leetcode', tag: '#F57109' }],
  ['snippet', { path: '/snippet', name: 'Snippet', tag: '#2db7f5' }],
  ['essay', { path: '/essay', name: '随笔', tag: '#87d068' }],
]);

const CATEGORY_NAMES = Array.from(CATEGORY_MAP.keys());

module.exports = {
  /**分类配置 */
  CATEGORY_MAP,
  /**分类key数组 */
  CATEGORY_NAMES,
};
