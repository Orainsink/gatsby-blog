import { ReactElement } from 'react';
import { PageProps } from 'gatsby';
import styled from 'styled-components';

import { Layout } from '../layout/BlogLayout';
import { Seo } from '../components/Seo';
import { Comment } from '../components/Comment';
import { Poem } from '../components/Poem';
import { Container } from './Templates.styles';
import { MdxParser } from '../containers/MDXComponents';
import { MoogleScene } from '../containers/SideBlocks/MoogleScene';

const AboutContainer = styled(Container)`
  padding: var(--space-md);
`;

const AboutPostTemplate = ({ children }: PageProps): ReactElement => (
  <Layout sideBlocks={<MoogleScene />}>
    <Poem />
    <AboutContainer>
      <MdxParser>{children}</MdxParser>
    </AboutContainer>
    <Comment />
  </Layout>
);

export default AboutPostTemplate;

export const Head = ({
  pageContext: { ogImage },
}: PageProps<{}, PageContext>) => <Seo title="About" ogImage={ogImage} />;
