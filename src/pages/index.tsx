import React from 'react';
import Loadable from '@loadable/component';

import { PageProps, Link, graphql } from 'gatsby';
import Layout from '../layout/IndexLayout';
import SEO from '../components/seo';
import Trigger from '../components/Trigger';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import Poem from '../components/Poem';
import TagsSnippet from '../components/TagsSnippet';
import PostList from '../components/PostList';

// magic comments
// https://loadable-components.com/docs/babel-plugin/#magic-comments
const Dyn = /* #__LOADABLE__ */ () => import('../components/Dynamic');
const Dynamic = Loadable(Dyn);

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
