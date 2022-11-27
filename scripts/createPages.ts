import { GatsbyNode } from 'gatsby';
import path from 'path';

import { replacePath } from '../src/utils/replacePath';
import { hashString } from '../src/utils/hashString';
import { DeepRequiredAndNonNullable } from '../typings/custom';

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

  return graphql<DeepRequiredAndNonNullable<Queries.Query>>(`
    query getPagesData {
      allMdx {
        nodes {
          id
          internal {
            contentFilePath
          }
          fields {
            slug
          }
          frontmatter {
            categories
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    const nodes = result.data!.allMdx.nodes;
    nodes.forEach((node, index) => {
      const previous = index === nodes.length - 1 ? null : nodes[index + 1];
      const next = index === 0 ? null : nodes[index - 1];
      const postTemplate =
        componentTemplate[
          node.frontmatter.categories as keyof typeof componentTemplate
        ] || Template;

      createPage({
        path:
          node.frontmatter.categories +
          '/' +
          replacePath(hashString(node.fields.slug)),
        component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
        context: { id: node.id, previous, next },
      });
    });
  });
};
