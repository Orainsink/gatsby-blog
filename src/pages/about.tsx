import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import styles from '../styles/Blog.module.less';
import Layout from '../layout/BlogLayout';
import SEO from '../components/seo';
import { useDispatch } from 'react-redux';
import Poem from '../components/Poem';

interface Props {
  data: any;
  location: any;
}
const AboutPage = ({ data, location }: Props) => {
  const post = data?.markdownRemark;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'TITLE', payload: 'About' });
    return () => {
      dispatch({ type: 'TITLE', payload: '' });
    };
  }, [dispatch]);

  return (
    <Layout location={location} title={'About me'} hasComment>
      <SEO title="About" />
      <Poem />
      <section
        dangerouslySetInnerHTML={{ __html: post.html }}
        className={styles.container}
        style={{ padding: '1em' }}
      />
    </Layout>
  );
};

export default React.memo(AboutPage);
export const pageQuery = graphql`
  query {
    markdownRemark(fields: { slug: { eq: "/关于本博客/" } }) {
      html
    }
  }
`;
