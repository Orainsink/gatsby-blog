import { PageProps, graphql } from 'gatsby';
import { lazy, Suspense, ReactElement } from 'react';
import styled from 'styled-components';

import { Layout } from '../layout/BlogLayout';
import { Seo } from '../components/Seo';
import { Comment } from '../components/Comment';
import { Poem } from '../components/Poem';
import { GetAboutPageDataQuery } from '../../graphql-types';
import { DeepRequiredAndNonNullable } from '../../typings/custom';
import { Container } from './Templates.styles';
const MoogleScene = lazy(
  () =>
    import(/* webpackPreload: true */ '../components/SideBlocks/MoogleScene')
);

const AboutContainer = styled(Container)`
  padding: 1em;
`;

type Data = DeepRequiredAndNonNullable<GetAboutPageDataQuery>;

const AboutPostTemplate = ({ children }: PageProps<Data>): ReactElement => {
  return (
    <Layout
      sideBlocks={
        <Suspense fallback={null}>
          <MoogleScene />
        </Suspense>
      }
    >
      <Poem />
      <AboutContainer>{children}</AboutContainer>
      <Comment />
    </Layout>
  );
};

export default AboutPostTemplate;

export const Head = () => <Seo title="About" />;

export const pageQuery = graphql`
  query getAboutPageData {
    mdx(fields: { slug: { eq: "/about" } }) {
      frontmatter {
        title
      }
    }
  }
`;
