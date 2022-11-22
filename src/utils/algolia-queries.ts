const indexName = `Pages`;
const pageQuery = `
query algoliaData {
  pages: allMdx {
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
}: any) => {
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
    transformer: ({
      data,
    }: {
      data: {
        pages: {
          edges: any[];
        };
      };
    }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
];

export default queries;
