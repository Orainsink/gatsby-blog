import escapeStringRegexp from 'escape-string-regexp';

const pagePath = `content`;
const indexName = `Pages`;
const pageQuery = `{
  pages: allMdx(
    filter: {
      fileAbsolutePath: { regex: "/${escapeStringRegexp(pagePath)}/" },
    }
  ) {
    edges {
      node {
        id
        frontmatter {
          title
          categories
        }
        fields {
          slug
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`;

const pageToAlgoliaRecord = ({
  node: { id, frontmatter, fields, ...rest },
}) => {
  return {
    objectID: id,
    ...frontmatter,
    ...fields,
    ...rest,
  };
};

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
];

export default queries;
