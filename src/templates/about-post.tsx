import React from 'react';
import { PageProps, graphql } from 'gatsby';
import Layout from '../layout/BlogLayout';
import SEO from '../components/seo';
import styles from '../styles/Blog.module.less';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Poem from '../components/Poem';
import Comment from '../components/SideBlocks/Comment';

interface Data {
  mdx: {
    body: string;
  };
}
const AboutPostTemplate = ({ data }: PageProps<Data>) => {
  const { mdx } = data;

  return (
    <Layout sideBlocks={<Comment />}>
      <SEO title="About" />
      <Poem />
      <section className={styles.container} style={{ padding: '1em' }}>
        {<MDXRenderer>{mdx.body}</MDXRenderer>}
      </section>
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
