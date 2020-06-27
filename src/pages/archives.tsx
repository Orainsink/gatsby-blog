import React, { useRef, useCallback } from 'react';
import { graphql } from 'gatsby';
import { Input } from 'antd';
import Layout from '../layout/BlogLayout';
import SEO from '../components/seo';
import PostList from '../components/PostList';
import { useSelector, useDispatch } from 'react-redux';

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
  const posts = data.allMarkdownRemark.edges;
  const searchRef = useRef(null);

  // 节流有点问题, 性能影响不大的情况下, 感觉没有节流的必要.
  // const throttleDispatch = useCallback(
  //   throttle(() => {
  //     let value = searchRef?.current.input.state.value || '';
  //     console.log(value);
  //     dispatch({
  //       type: 'SEARCH',
  //       payload: value,
  //     });
  //   }, 300),
  //   [dispatch]
  // );

  const _handleChange = useCallback(
    (e) => {
      e.persist();

      let value = e.target.value || '';

      dispatch({
        type: 'SEARCH',
        payload: value,
      });
    },
    [dispatch, searchRef?.current]
  );

  return (
    <Layout location={location} title={'目录'}>
      <SEO title="Archives" />
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

export default ArchivesPage;

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
