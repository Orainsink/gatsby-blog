import { GatsbyNode } from 'gatsby';
import path from 'path';

import { replacePath } from '../src/utils/replacePath';
import { DeepRequiredAndNonNullable } from '../typings/custom';

const generatePath = (categories: string, title: string | null) => {
  const titlePath = title ? '/' + replacePath(title) : '';
  return categories + titlePath;
};

const getTemplates = () => {
  const Template = path.resolve(`src/templates/blog-post.tsx`);
  const SnippetTemplate = path.resolve(`src/templates/snippet-post.tsx`);
  const AboutTemplate = path.resolve(`src/templates/about-post.tsx`);

  /**set your Template here */
  return {
    tech: Template,
    essay: Template,
    snippet: SnippetTemplate,
    about: AboutTemplate,
  };
};

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions;

  const { data, errors } = await graphql<
    DeepRequiredAndNonNullable<Queries.Query>
  >(`
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
  `);

  if (errors) {
    return Promise.reject(errors);
  }

  const componentTemplate = getTemplates();

  const nodes = data!.allMdx.nodes;
  nodes.forEach((node) => {
    const { categories, title } = node.frontmatter;
    const postTemplate =
      componentTemplate[categories as keyof typeof componentTemplate];

    createPage({
      path: generatePath(categories, title),
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { id: node.id },
    });
  });
};
