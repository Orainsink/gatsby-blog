import { ReactElement } from 'react';
import { PageProps } from 'gatsby';
import styled from 'styled-components';

import { Layout } from '../layout/BlogLayout';
import { Seo } from '../components/Seo';
import { Comment } from '../components/Comment';
import { Container } from './Templates.styles';
import { MdxParser } from '../components/MDXComponents';
import { MoogleScene } from '../components/SideBlocks/MoogleScene';
import { AboutSite } from '../components/AboutSite';

const AboutContainer = styled(Container)`
  padding: var(--space-md);
`;

const AboutPostTemplate = ({ children }: PageProps<{}>): ReactElement => (
  <Layout sideBlocks={<MoogleScene />}>
    <AboutSite />
    <AboutContainer>
      <MdxParser>{children}</MdxParser>
    </AboutContainer>
    <Comment />
  </Layout>
);

export default AboutPostTemplate;

export const Head = () => <Seo title="About" />;
