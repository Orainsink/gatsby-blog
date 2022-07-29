import { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';

import { replacePath } from '../src/utils/replacePath';

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  getNode,
  actions,
}) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: replacePath(slug),
    });
  } else if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      // Name of the field you are adding
      name: 'slug',
      // Individual MDX node
      node,
      // Generated value based on filepath with "blog" prefix
      // value: `/blog${value}`,
      value: replacePath(value),
    });
  }
};
