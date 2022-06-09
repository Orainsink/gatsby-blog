import { GatsbyNode } from 'gatsby';

import replacePath from '../src/utils/replacePath';
import path from 'path';
import hashString from '../src/utils/hashString';
import { MdxEdge, Query } from '../graphql-types';

export const createPages: GatsbyNode['createPages'] = ({
  actions,
  graphql,
}) => {
  const { createPage, createRedirect } = actions;

  createRedirect({
    fromPath: '/tech',
    redirectInBrowser: true,
    toPath: '/archives',
  });

  createRedirect({
    fromPath: '/about',
    redirectInBrowser: true,
    toPath: '/about/1438181566',
  });

  const Template = path.resolve(`src/templates/blog-post.tsx`);
  const SnippetTemplate = path.resolve(`src/templates/snippet-post.tsx`);
  const AboutTemplate = path.resolve(`src/templates/about-post.tsx`);
  /**set your Template here */
  const componentTemplate = {
    tech: Template,
    leetcode: Template,
    essay: Template,
    snippet: SnippetTemplate,
    about: AboutTemplate,
  };

  return graphql<Query>(`
    {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              categories
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    const posts = result.data!.allMdx.edges as unknown as MdxEdge[];
    posts.forEach(({ node }, index) => {
      const previous =
        index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;

      createPage({
        path:
          node.frontmatter!.categories +
          '/' +
          replacePath(hashString(node.fields!.slug as string)),
        component:
          componentTemplate[
            node.frontmatter!.categories as keyof typeof componentTemplate
          ] || Template,
        context: { id: node.id, previous, next },
      });
    });
  });
};
