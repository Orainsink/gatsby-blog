import * as React from 'react';
import { graphql } from 'gatsby';
import styles from '../styles/Blog.module.less';
import Layout from '../layout/BlogLayout';
import SEO from '../components/seo';

interface Props {
  data: any;
  location: any;
}
const AboutPage = ({ data, location }: Props) => {
  console.log(data);
  const post = data?.markdownRemark;

  return (
    <Layout location={location} title={'About me'}>
      <SEO title="About" />
      <section
        dangerouslySetInnerHTML={{ __html: post.html }}
        className={styles.container}
        style={{ padding: '1em' }}
      />
    </Layout>
  );
};

export default AboutPage;
export const pageQuery = graphql`
  query {
    markdownRemark(fields: { slug: { eq: "/关于本博客/" } }) {
      html
    }
  }
`;
