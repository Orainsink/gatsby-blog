import { ReactElement, useEffect } from 'react';
import styled from 'styled-components';

import { Seo } from '../components/Seo';
import {
  SkillsSection,
  AboutSection,
  SkyBackground,
  useElementTween,
} from '../components/Resume';
import { hasArrowAtom } from '../store/atom';
import { useSetRecoilState } from 'recoil';
import { useIsDark } from '../hooks';

const ResumeContainer = styled.div`
  position: relative;
  background: var(--color-bg-layout);
`;

const ResumePage = (): ReactElement => {
  const setHasArrow = useSetRecoilState(hasArrowAtom);
  const isDark = useIsDark();

  useEffect(() => {
    setHasArrow(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useElementTween();

  return (
    <ResumeContainer>
      {isDark && <SkyBackground />}
      <AboutSection />
      <SkillsSection />
    </ResumeContainer>
  );
};

export default ResumePage;

export const Head = () => <Seo title="简历" />;
