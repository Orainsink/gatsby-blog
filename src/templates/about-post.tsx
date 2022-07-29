import { PageProps, graphql } from 'gatsby';
import { lazy, Suspense, ReactElement } from 'react';

import { Layout } from '../layout/BlogLayout';
import { SeoHelmet } from '../components/SeoHelmet';
import * as styles from './index.module.less';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Comment } from '../components/Comment';
import { Poem } from '../components/Poem';
import { GetAboutPageDataQuery } from '../../graphql-types';
import { DeepRequiredAndNonNullable } from '../../typings/custom';
const MoogleScene = lazy(
  () =>
    import(/* webpackPreload: true */ '../components/SideBlocks/MoogleScene')
);

type Data = DeepRequiredAndNonNullable<GetAboutPageDataQuery>;

const AboutPostTemplate = ({ data }: PageProps<Data>): ReactElement => {
  const { mdx } = data;
  return (
    <Layout
      sideBlocks={
        <Suspense fallback={null}>
          <MoogleScene />
        </Suspense>
      }
    >
      <SeoHelmet title="About" />
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
  query getAboutPageData {
    mdx(fields: { slug: { eq: "/about" } }) {
      body
    }
  }
`;
