import React from 'react';
import { PageProps, graphql } from 'gatsby';
import loadable from '@loadable/component';

import Layout from '../layout/BlogLayout';
import SEO from '../components/seo';
import * as styles from './index.module.less';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Comment from '../components/Comment';
import Poem from '../components/Poem';
const MoogleScene = loadable(
  () => import('../components/SideBlocks/MoogleScene')
);

interface Data {
  mdx: {
    body: string;
  };
}
const AboutPostTemplate = ({ data }: PageProps<Data>) => {
  const { mdx } = data;
  return (
    <Layout sideBlocks={<MoogleScene />}>
      <SEO title="About" />
      <Poem />
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
