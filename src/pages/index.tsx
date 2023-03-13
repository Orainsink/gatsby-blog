import { ReactElement } from 'react';
import { PageProps, graphql } from 'gatsby';
import styled from 'styled-components';

import { Layout } from '../layout/IndexLayout';
import { Seo } from '../components/Seo';
import { CategoryComponent } from '../components/Cards/Cards';
import { Trigger } from '../components/Trigger';
import { Poem } from '../components/Poem';
import { PostList } from '../components/PostList';
import { HomeScene } from '../components/HomeScene/HomeScene';
import { DeepRequiredAndNonNullable, FileEdge } from '../../typings/custom';

const ListHeaderText = styled.h5`
  text-align: center;
  padding: 2em 0;
  margin: 0;
`;

type Data = DeepRequiredAndNonNullable<Queries.getPageDataQuery>;
const Index = ({ data }: PageProps<Data>): ReactElement => {
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
        <Poem />
        <CategoryComponent />
        {/* <ListHeaderText>最近五篇文章</ListHeaderText> */}
        <PostList posts={posts} />
      </Layout>
    </>
  );
};

export default Index;

export const Head = () => <Seo title="首页" />;

export const pageQuery = graphql`
  query getPageData {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { frontmatter: { date: DESC } }, limit: 5) {
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
