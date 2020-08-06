import React, { useRef, useCallback, useEffect } from 'react';
import { graphql } from 'gatsby';
import { Input } from 'antd';
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

const { Search } = Input;

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
  const { search } = useSelector((state) => state);
  const dispatch = useDispatch();
  const posts = data.allMarkdownRemark.edges.filter((edge) => {
    return edge.node.frontmatter.title;
  });

  const searchRef = useRef(null);

  useEffect(() => {
    return () => {
      dispatch({
        type: 'SEARCH',
        payload: '',
      });
    };
  }, [dispatch]);

  const _handleChange = useCallback(
    (e) => {
      e.persist();
      let value = e.target.value || '';

      dispatch({
        type: 'SEARCH',
        payload: value,
      });
    },
    [dispatch]
  );

  return (
    <Layout location={location} title={'目录'}>
      <SEO title="Archives" />
      <WordCloud />
      <Search
        size="large"
        placeholder={'Preceding "#" to match tags'}
        value={search}
        onSearch={(value) => {
          dispatch({ type: 'SEARCH', payload: value });
        }}
        onChange={_handleChange}
        ref={searchRef}
        allowClear
      />
      <PostList posts={posts} />
    </Layout>
  );
};

export default React.memo(ArchivesPage);

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
