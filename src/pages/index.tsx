import { ReactElement } from 'react';
import { PageProps, graphql } from 'gatsby';
import styled, { css } from 'styled-components';

import { Layout } from '../layout/IndexLayout';
import { Seo } from '../components/Seo';
import { CategoryComponent } from '../components/Cards/Cards';
import { Trigger } from '../components/Trigger';
import { Poem } from '../components/Poem';
import { PostList } from '../components/PostList';
import { HomeScene } from '../components/HomeScene/HomeScene';
import { DeepRequiredAndNonNullable, FileEdge } from '../../typings/custom';
import { selector, useRecoilValue } from 'recoil';
import { sceneAtom, triggerAtom } from '../store/atom';

const activeStyles = css`
  transform: translateY(0);
`;

const disActiveStyles = css`
  transform: translateY(-100vh);
`;

const triggerStyles = css`
  transform: translateY(-10vh);
`;

const dynamicSceneStyleSelector = selector({
  key: 'dynamicSceneStyle',
  get: ({ get }) => {
    const scene = get(sceneAtom);
    const trigger = get(triggerAtom);

    return !scene ? 'disActive' : trigger ? 'trigger' : 'active';
  },
});

const ListHeaderText = styled.h5`
  text-align: center;
  padding: 2em 0;
  margin: 0;
`;

const IndexScrollController = styled.div<{
  status: 'disActive' | 'trigger' | 'active';
}>`
  transition: all 0.5s ease-out;
  ${({ status }) => {
    switch (status) {
      case 'disActive':
        return disActiveStyles;
      case 'active':
        return activeStyles;
      case 'trigger':
        return triggerStyles;
      default:
        return;
    }
  }}
`;

type Data = DeepRequiredAndNonNullable<Queries.getPageDataQuery>;
const Index = ({ data }: PageProps<Data>): ReactElement => {
  const posts = data.allMdx.edges.map((edge) => ({
    node: {
      childMdx: edge.node,
    },
  })) as FileEdge[];
  const dynamicSceneStyle = useRecoilValue(dynamicSceneStyleSelector);

  return (
    <>
      <Trigger />
      <IndexScrollController status={dynamicSceneStyle}>
        <HomeScene />
        <Layout>
          <Poem />
          <CategoryComponent />
          <ListHeaderText>最近五篇文章</ListHeaderText>
          <PostList posts={posts} />
        </Layout>
      </IndexScrollController>
    </>
  );
};

export default Index;

export const Head = ({ data }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title;
  return <Seo title={siteTitle} />;
};

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
