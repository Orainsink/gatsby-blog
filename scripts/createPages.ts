import { GatsbyNode } from 'gatsby';
import path from 'path';

import { replacePath } from '../src/utils/replacePath';
import { DeepRequiredAndNonNullable } from '../typings/custom';

const generatePath = (categories: string, title: string | null) => {
  const titlePath = title ? '/' + replacePath(title) : '';
  return categories + titlePath;
};

export const createPages: GatsbyNode['createPages'] = ({
  actions,
  graphql,
}) => {
  const { createPage } = actions;

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
          frontmatter {
            title
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
    nodes.forEach((node) => {
      const { categories, title } = node.frontmatter;
      const postTemplate =
        componentTemplate[categories as keyof typeof componentTemplate] ||
        Template;

      createPage({
        path: generatePath(categories, title),
        component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      });
    });
  });
};
