/*
 * gatsby plugin with MDX2 does not support ESM for mdx plugins
 * this file is a copy of
 * https://www.npmjs.com/package/@lekoarts/rehype-meta-as-attributes
 * and I downgrade the version of unist-util-visit to support MDX2
 * @author https://github.com/LekoArts
 */
// eslint-disable-next-line strict
'use strict';

const visit = require('unist-util-visit');

const re = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g;

function rehypeMetaAsAttributes() {
  return transformer;
}

function transformer(tree) {
  visit(tree, 'element', (node) => {
    let match;

    if (node.tagName === 'code' && node.data && node.data.meta) {
      // Reset regex.
      re.lastIndex = 0;

      const meta = node.data.meta;
      const properties = node.properties || {};
      while ((match = re.exec(meta))) {
        properties[match[1]] = match[2] || match[3] || match[4] || '';
      }
    }
  });
}

module.exports = rehypeMetaAsAttributes;
