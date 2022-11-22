const indexName = `Pages`;
const pageQuery = `
query getAlgoliaData {
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
}: Pick<Queries.MdxEdge, 'node'>) => {
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
          edges: Queries.MdxEdge[];
        };
      };
    }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
];

export default queries;
