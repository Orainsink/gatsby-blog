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
        internal {
          contentDigest
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`;

interface QueryVariable {
  data: {
    pages: {
      edges: Queries.MdxEdge[];
    };
  };
}

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
    transformer: ({ data }: QueryVariable) =>
      data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
];

export default queries;
