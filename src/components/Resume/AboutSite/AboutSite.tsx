import styled, { css } from 'styled-components';

import { WireframePicture } from './WireframePicture';
import { WireframeBox } from './WireframeBox';
import { WireframeText } from './WireframeText';
import { WireframeControls } from './WireframeControls';
import { useAnimation } from './useAnimation';

const Container = styled.div`
  position: relative;
`;

const Wireframe = styled.div`
  position: relative;

  overflow: hidden;

  max-width: 800px;
  height: 350px;
  margin: 80px auto;
`;

const Break = styled.div`
  width: 100%;
  height: 20px;
  transition: height 0.3s ease-in-out;

  ${({ theme }) => theme.media.isMobile && `height: 40px;`}
`;

const Page = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;
`;

const Column = styled.div<{ $type: 'left' | 'right' }>`
  position: absolute;
  top: 40px;
  bottom: 0;

  ${({ $type }) => {
    switch ($type) {
      case 'left':
        return css`
          right: 35%;
          left: 40px;
          transition: right 0.3s ease-in-out, top 0.3s ease-in-out;
          ${({ theme }) => theme.media.isMobile && `right: 40px;`}
        `;
      case 'right':
        return css`
          right: 40px;
          left: 70%;
          transition: left 0.3s ease-in-out, right 0.3s ease-in-out;
          ${({ theme }) =>
            theme.media.isMobile &&
            css`
              right: -40px;
              left: 100%;
            `}
        `;
    }
  }}
`;

export const AboutSite = () => {
  useAnimation();

  return (
    <Container>
      <Wireframe>
        <Page>
          <WireframeBox />
          <Column $type="left" data-column>
            <WireframePicture type="tall">
              <WireframeControls />
            </WireframePicture>
            <Break />
            <WireframePicture type="left" />
            <WireframeText type="right" />
            <Break />
            <WireframeText />
            <Break />
            <WireframePicture type="right" />
            <WireframeText type="left" />
          </Column>
          <Column $type="right">
            <WireframePicture />
            <Break />
            <WireframeText />
            <Break />
            <WireframePicture type="tall" />
          </Column>
        </Page>
      </Wireframe>
    </Container>
  );
};
