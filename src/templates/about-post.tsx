import React from 'react';
import { PageProps, graphql } from 'gatsby';
import Layout from '../layout/BlogLayout';
import SEO from '../components/seo';
import * as styles from './index.module.less';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Poem from '../components/Poem';
import Comment from '../components/Comment';
import Moogle from '../components/Moogle';

interface Data {
  mdx: {
    body: string;
  };
}
const AboutPostTemplate = ({ data }: PageProps<Data>) => {
  const { mdx } = data;

  return (
    <Layout>
      <SEO title="About" />
      <Poem />
      <Moogle />
      <section className={styles.container} style={{ padding: '1em' }}>
        {<MDXRenderer>{mdx.body}</MDXRenderer>}
      </section>
      <Comment />
    </Layout>
  );
};

export default AboutPostTemplate;

export const pageQuery = graphql`
  query {
    mdx(fields: { slug: { eq: "/about" } }) {
      body
    }
  }
`;
