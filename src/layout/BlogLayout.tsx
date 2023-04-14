import { useEffect, ReactNode, ReactElement } from 'react';
import styled from 'styled-components';

import { hasArrowAtom, sceneAtom, skipAtom } from '../store/atom';
import { Info, SideBar } from '../components/SideBlocks';
import { useSetRecoilState } from 'recoil';
import { Footer } from '../components/Footer';
import { Bg } from '../components/Bg';
import { containerStyles, Main, Wrapper, MainWrap } from './Layout.styles';

const BlogMain = styled(Main)`
  ${containerStyles}
`;

interface Props {
  content?: ReactNode;
  sideBlocks?: ReactNode;
  children?: ReactNode;
}

/** blog posts Layout */
export const Layout = (props: Props): ReactElement => {
  const { sideBlocks, children } = props;
  const setSkip = useSetRecoilState(skipAtom);
  const setHasArrow = useSetRecoilState(hasArrowAtom);
  const setScene = useSetRecoilState(sceneAtom);

  useEffect(() => {
    setSkip(true);
    setHasArrow(false);
    setScene(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <Bg />
      <BlogMain id="main">
        <MainWrap>{children}</MainWrap>
        <SideBar>
          <Info />
          {sideBlocks}
        </SideBar>
      </BlogMain>
      <Footer />
    </Wrapper>
  );
};
