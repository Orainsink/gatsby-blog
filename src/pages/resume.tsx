import { ReactElement, useEffect } from 'react';
import styled from 'styled-components';

import { Seo } from '../components/Seo';
import {
  SkillsSection,
  AboutSection,
  useElementTween,
} from '../components/Resume';
import { hasArrowAtom } from '../store/atom';
import { useSetRecoilState } from 'recoil';

const ResumeContainer = styled.div`
  background: var(--color-bg-layout);
`;

const ResumePage = (): ReactElement => {
  const setHasArrow = useSetRecoilState(hasArrowAtom);
  useEffect(() => {
    setHasArrow(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
