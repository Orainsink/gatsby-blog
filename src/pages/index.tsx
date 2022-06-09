import { memo, ReactElement } from 'react';
import { PageProps, graphql } from 'gatsby';

import Layout from '../layout/IndexLayout';
import SEO from '../components/seo';
import CateSnippet from '../components/Cards';
import Trigger from '../components/Trigger';
import Poem from '../components/Poem';
import PostList from '../components/PostList';
import HomeScene from '../components/HomeScene';
import { DeepRequiredAndNonNullable } from '../../typings/custom';
import { FileEdge, GetPageDataQuery } from '../../graphql-types';

type Data = DeepRequiredAndNonNullable<GetPageDataQuery>;
const Index = ({ data }: PageProps<Data>): ReactElement => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMdx.edges.map((edge) => ({
    node: {
      childMdx: edge.node,
    },
  })) as FileEdge[];

  return (
    <>
      <HomeScene />
      <Trigger />
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
          最近五篇文章
        </h5>
        <PostList posts={posts} />
      </Layout>
    </>
  );
};

export default memo(Index);

export const pageQuery = graphql`
  query getPageData {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 5) {
      edges {
        node {
          id
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
