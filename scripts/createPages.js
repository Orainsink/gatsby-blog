const replacePath = require('./utils');
const path = require('path');

module.exports = exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

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
        path: replacePath(node.fields.slug),
        component: componentTemplate[node.frontmatter.categories] || Template,
        context: { id: node.id, previous, next },
      });
    });
  });
};
