import { ReactElement } from 'react';
import styled from 'styled-components';

import { Seo } from '../components/Seo';
import {
  SkillsSection,
  AboutSection,
  useElementTween,
} from '../components/Resume';

const ResumeContainer = styled.div`
  background: var(--color-bg-layout);
`;

const ResumePage = (): ReactElement => {
  useElementTween();
  return (
    <ResumeContainer>
      <AboutSection />
      <SkillsSection />
    </ResumeContainer>
  );
};

export default ResumePage;

export const Head = () => <Seo title="简历" />;
