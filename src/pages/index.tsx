import React, { useEffect } from 'react';
import loadable from '@loadable/component';
import { PageProps, Link, graphql } from 'gatsby';
import Layout from '../layout/IndexLayout';
import SEO from '../components/seo';
import { useSelector } from 'react-redux';
import TagsSnippet from '../components/Cards';
import Trigger from '../components/Trigger';
import Poem from '../components/Poem';
import PostList from '../components/PostList';
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
    edges: PostItem[];
  };
}

const Index = ({ data }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMdx.edges.filter((edge) => {
    return edge.node.frontmatter.title;
  });
  const { skip, scene } = useSelector((state) => state);
  useEffect(() => {
    if (skip && !scene) {
      document.body.style.background = '#efefef';
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Dynamic />
      {!skip && scene && <Trigger />}
      <Layout>
        <SEO title={siteTitle} />
        <Poem />
        <TagsSnippet />

        <h5
          style={{
            textAlign: 'center',
            padding: '2em 0',
            margin: 0,
          }}
        >
          最近文章：
        </h5>
        <PostList posts={posts} />
        <h5
          style={{
            textAlign: 'center',
            padding: '1em 0',
            margin: 0,
          }}
        >
          <Link to={'/archives'}>查看全部</Link>
        </h5>
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
          }
        }
      }
    }
  }
`;
