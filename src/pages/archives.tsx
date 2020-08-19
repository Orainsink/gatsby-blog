import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import { Divider } from 'antd';
import Layout from '../layout/BlogLayout';
import SEO from '../components/seo';
import { useSelector, useDispatch } from 'react-redux';
import loadable from '@loadable/component';
import ComponentLoading from '../components/ComponentLoading';
const WordCloud = loadable(() => import('../components/WordCloud'), {
  fallback: <ComponentLoading />,
});
const PostList = loadable(() => import('../components/PostList'), {
  fallback: <ComponentLoading />,
});

interface Props {
  data: Data;
  location: any;
}
interface Data {
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
}

const ArchivesPage = ({ data, location }: Props) => {
  const { curTag } = useSelector((state) => state);
  const dispatch = useDispatch();
  const posts = data.allMarkdownRemark.edges.filter((edge) => {
    return edge.node.frontmatter.title;
  });

  useEffect(() => {
    return () => {
      dispatch({
        type: 'CUR_TAG',
        payload: '',
      });
    };
  }, [dispatch]);

  return (
    <Layout location={location}>
      <SEO title="Archives" />
      <WordCloud />
      <Divider
        orientation="center"
        style={{ fontSize: '24px', fontWeight: 'bold', color: '#2b2b2b' }}
      >
        {curTag ? '#' + curTag : 'ARCHIVES'}
      </Divider>
      <PostList posts={posts} />
    </Layout>
  );
};

export default React.memo(ArchivesPage);

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: {} } }
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
