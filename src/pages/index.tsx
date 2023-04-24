import { ReactElement } from 'react';
import { PageProps, graphql } from 'gatsby';

import { Layout } from '../layout/IndexLayout';
import { Seo } from '../components/Seo';
import { CategoryComponent } from '../components/Cards/Cards';
import { Trigger } from '../components/Trigger';
import { Poem } from '../components/Poem';
import { PostList } from '../components/PostList';
import { HomeScene } from '../containers/HomeScene/HomeScene';
import { DeepRequiredAndNonNullable, FileEdge } from '../../typings/custom';
import { useHasMounted } from '../hooks';

type Data = DeepRequiredAndNonNullable<Queries.getPageDataQuery>;
const Index = ({
  data,
  pageContext,
}: PageProps<Data, PageContext>): ReactElement => {
  const hasMounted = useHasMounted();
  const posts = data.allMdx.edges.map((edge) => ({
    node: {
      childMdx: edge.node,
    },
  })) as FileEdge[];
  return (
    <>
      {hasMounted && <HomeScene />}
      <Trigger />
      <Layout>
        <Poem />
        <CategoryComponent />
        {/* Styled component here breaks the hydrate, and I don't know why */}
        <h5
          style={{
            textAlign: 'center',
            padding: '1rem 0',
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

export default Index;

export const Head = ({
  pageContext: { ogImage },
}: PageProps<{}, PageContext>) => <Seo title="首页" ogImage={ogImage} />;

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
