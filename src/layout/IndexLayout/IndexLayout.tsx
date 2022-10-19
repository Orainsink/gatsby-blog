import { useEffect, ReactNode, ReactElement } from 'react';
import styled from 'styled-components';

import { SideBar, Info, TagsBlock, Tools } from '../../components/SideBlocks';
import { useBackgroundColor } from '../../hooks';
import { Comment } from '../../components/Comment';
import { Footer } from '../../components/Footer';
import { Bg } from '../../components/Bg';
import {
  selector,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {
  filterAtom,
  hasArrowAtom,
  sceneAtom,
  skipAtom,
  triggerAtom,
} from '../../store/atom';
import { containerStyles, Main, MainWrap, Wrapper } from '../Layout.styles';

const Container = styled.div`
  ${containerStyles}
`;

const IndexWrapper = styled(Wrapper)<{ wrapperClass: string }>`
  ${({ wrapperClass }) => {
    switch (wrapperClass) {
      case 'disActive':
        return `top: 0;`;
      case 'trigger':
        return `top: 90vh;`;
      case 'active':
        return `top: 100vh;`;
      default:
        return;
    }
  }}
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

const wrapperClassSelector = selector({
  key: 'wrapperClass',
  get: ({ get }) => {
    const scene = get(sceneAtom);
    const trigger = get(triggerAtom);
    const skip = get(skipAtom);

    return !scene || skip ? 'disActive' : trigger ? 'trigger' : 'active';
  },
});

/**index Layout */
export const Layout = ({ children }: Props): ReactElement => {
  const wrapperClass = useRecoilValue(wrapperClassSelector);
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
    <IndexWrapper wrapperClass={wrapperClass} id="markdownBody">
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
    </IndexWrapper>
  );
};
