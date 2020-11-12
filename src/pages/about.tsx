import React, { useEffect } from 'react';
import { PageProps, graphql } from 'gatsby';
import Layout from '../layout/BlogLayout';
import SEO from '../components/seo';
import { useDispatch } from 'react-redux';
import styles from '../styles/Blog.module.less';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Poem from '../components/Poem';
import Comment from '../components/SideBlocks/Comment';

interface Data {
  mdx: {
    body: string;
  };
}
const AboutPage = ({ data, location }: PageProps<Data>) => {
  const { mdx } = data;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'TITLE', payload: 'About' });
    return () => {
      dispatch({ type: 'TITLE', payload: '' });
    };
  }, [dispatch]);

  return (
    <Layout location={location} sideBlocks={<Comment />}>
      <SEO title="About" />
      <Poem />
      <section className={styles.container} style={{ padding: '1em' }}>
        {<MDXRenderer>{mdx.body}</MDXRenderer>}
      </section>
    </Layout>
  );
};

export default React.memo(AboutPage);
export const pageQuery = graphql`
  query {
    mdx(fields: { slug: { eq: "/about" } }) {
      body
    }
  }
`;
