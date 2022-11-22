import { useEffect, ReactNode, ReactElement } from 'react';
import styled from 'styled-components';

import { SideBar, Info, TagsBlock, Tools } from '../components/SideBlocks';
import { useBackgroundColor } from '../hooks';
import { Comment } from '../components/Comment';
import { Footer } from '../components/Footer';
import { Bg } from '../components/Bg';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import {
  filterAtom,
  hasArrowAtom,
  sceneAtom,
  skipAtom,
  triggerAtom,
} from '../store/atom';
import { containerStyles, Main, MainWrap, Wrapper } from './Layout.styles';

const Container = styled.div`
  ${containerStyles}
`;

const ClickTip = styled.div<{ show: boolean }>`
  color: var(--text-color);
  font-size: 18px;
  opacity: 0;
  transition: opacity 0.6s ease-in;
  position: absolute;
  top: calc(5vh - 15px);
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;

  ${({ show }) => show && `opacity: 1;`}
`;

interface Props {
  children: ReactNode;
}

/**index Layout */
export const Layout = ({ children }: Props): ReactElement => {
  const scene = useRecoilValue(sceneAtom);
  const trigger = useRecoilValue(triggerAtom);
  const skip = useRecoilValue(skipAtom);
  const setHasArrow = useSetRecoilState(hasArrowAtom);
  const resetFilter = useResetRecoilState(filterAtom);
  useBackgroundColor(skip);

  useEffect(() => {
    setHasArrow(true);
    resetFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper id="markdownBody">
      {scene && !skip && <ClickTip show={trigger}>Click to slide</ClickTip>}
      <Bg />
      <Main>
        <Container>
          <MainWrap>
            {children}
            <Comment />
          </MainWrap>
          <SideBar>
            <Info />
            <TagsBlock />
            <Tools />
          </SideBar>
        </Container>
      </Main>
      <Footer />
    </Wrapper>
  );
};
