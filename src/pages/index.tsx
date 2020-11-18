import React from 'react';
import loadable from '@loadable/component';
import { PageProps, graphql } from 'gatsby';
import Layout from '../layout/IndexLayout';
import SEO from '../components/seo';
import { useSelector } from 'react-redux';
import CateSnippet from '../components/Cards';
import Trigger from '../components/Trigger';
import Poem from '../components/Poem';
import PostList from '../components/PostList';
import useBackgroundColor from '../hooks/useBackgroundColor';
import useHasMounted from '../hooks/useHasMounted';
const Dynamic = loadable(() => import('../components/Dynamic/Dynamic'), {
  fallback: null,
});

interface Data {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  allMdx: {
    edges: {
      node: MdxItem;
    }[];
  };
}

const Index = ({ data }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMdx.edges.map((edge) => ({
    node: {
      childMdx: edge.node,
    },
  }));
  const { skip, scene } = useSelector((state: any) => state);

  useBackgroundColor();
  const hasMounted = useHasMounted();

  return (
    <>
      {hasMounted && <Dynamic />}
      {hasMounted && !skip && scene && <Trigger />}
      <Layout>
        <SEO title={siteTitle} />
        <Poem />
        <CateSnippet />
        <h5
          style={{
            textAlign: 'center',
            padding: '2em 0',
            margin: 0,
          }}
        >
          最近五篇文章：
        </h5>
        <PostList posts={posts} />
      </Layout>
    </>
  );
};

export default React.memo(Index);

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 5) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          frontmatter {
            date(formatString: "YYYY/MM/DD")
            description
            tags
            title
            categories
          }
        }
      }
    }
  }
`;
