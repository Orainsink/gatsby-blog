import { ReactElement, useEffect } from 'react';
import styled from 'styled-components';

import { Seo } from '../components/Seo';
import {
  SkillsSection,
  AboutSection,
  NightBackground,
  DayBackground,
  useElementTween,
} from '../containers/Resume';
import { hasArrowAtom } from '../store/atom';
import { useSetRecoilState } from 'recoil';
import { useHasMounted, useIsDark } from '../hooks';

const ResumeContainer = styled.div`
  position: relative;
  background: var(--color-bg-layout);
`;

const ResumePage = (): ReactElement => {
  const setHasArrow = useSetRecoilState(hasArrowAtom);
  const isDark = useIsDark();
  const hasMounted = useHasMounted();

  useEffect(() => {
    setHasArrow(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useElementTween();

  return (
    <ResumeContainer>
      {!hasMounted ? null : isDark ? <NightBackground /> : <DayBackground />}
      <AboutSection />
      <SkillsSection />
    </ResumeContainer>
  );
};

export default ResumePage;

export const Head = () => <Seo title="简历" />;
