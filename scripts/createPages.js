const replacePath = require('./utils');
const path = require('path');
const hashString = require('../src/utils/hashString');

module.exports = exports.createPages = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions;

  createRedirect({
    fromPath: '/tech/',
    redirectInBrowser: true,
    toPath: '/archives',
  });
  createRedirect({
    fromPath: '/tech',
    redirectInBrowser: true,
    toPath: '/archives',
  });
  createRedirect({
    fromPath: '/about',
    redirectInBrowser: true,
    toPath: '/about/-2056610857',
  });

  const Template = path.resolve(`src/templates/blog-post.tsx`);
  const SnippetTemplate = path.resolve(`src/templates/snippet-post.tsx`);
  const AboutTemplate = path.resolve(`src/templates/about-post.tsx`);
  const componentTemplate = {
    tech: Template,
    leetcode: Template,
    essay: Template,
    snippet: SnippetTemplate,
    about: AboutTemplate,
  };

  return graphql(`
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
    const posts = result.data.allMdx.edges;
    posts.forEach(({ node }, index) => {
      const previous =
        index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;

      createPage({
        path:
          node.frontmatter.categories + '/' + replacePath(hashString(node.id)),
        component: componentTemplate[node.frontmatter.categories] || Template,
        context: { id: node.id, previous, next },
      });
    });
  });
};
