import React from 'react';
import loadable from '@loadable/component';
import { PageProps, Link, graphql } from 'gatsby';
import Layout from '../layout/IndexLayout';
import SEO from '../components/seo';
import { useSelector } from 'react-redux';
import ComponentLoading from '../components/ComponentLoading';
const TagsSnippet = loadable(() => import('../components/Cards'));
const Trigger = loadable(() => import('../components/Trigger'));
const Loading = loadable(() => import('../components/Loading'));
const Poem = loadable(() => import('../components/Poem'));
const PostList = loadable(() => import('../components/PostList'), {
  fallback: <ComponentLoading />,
});
const Dynamic = loadable(() => import('../components/Dynamic/Dynamic'), {
  fallback: <Loading debounce={700} />,
});

type Data = {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  allMarkdownRemark: {
    edges: {
      node: {
        excerpt: string;
        frontmatter: {
          title: string;
          date: string;
          description: string;
          tags: string[];
        };
        fields: {
          slug: string;
        };
      };
    }[];
  };
};

const Index = ({ data, location }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges.filter((edge) => {
    return edge.node.frontmatter.title;
  });
  const { skip } = useSelector((state) => state);

  return (
    <>
      <Trigger />
      {!skip && <Dynamic fallback={<Loading debounce={500} />} />}
      <Layout location={location} title={siteTitle}>
        <SEO title="Home page" />
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY/MM/DD")
            title
            description
            tags
          }
        }
      }
    }
  }
`;
