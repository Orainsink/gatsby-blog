import { lazy, Suspense, ReactElement } from 'react';
import { PageProps } from 'gatsby';
import styled from 'styled-components';

import { Layout } from '../layout/BlogLayout';
import { Seo } from '../components/Seo';
import { Comment } from '../components/Comment';
import { Poem } from '../components/Poem';
import { Container } from './Templates.styles';
import { MdxParser } from '../components/MDXComponents';

const MoogleScene = lazy(
  () =>
    import(/* webpackPreload: true */ '../components/SideBlocks/MoogleScene')
);

const AboutContainer = styled(Container)`
  padding: 1em;
`;

const AboutPostTemplate = ({ children }: PageProps<{}>): ReactElement => {
  return (
    <Layout
      sideBlocks={
        <Suspense fallback={null}>
          <MoogleScene />
        </Suspense>
      }
    >
      <Poem />
      <AboutContainer>
        <MdxParser>{children}</MdxParser>
      </AboutContainer>
      <Comment />
    </Layout>
  );
};

export default AboutPostTemplate;

export const Head = () => <Seo title="About" />;
