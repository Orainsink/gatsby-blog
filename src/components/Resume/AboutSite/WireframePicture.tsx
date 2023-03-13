import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { WireframeBox } from './WireframeBox';

type PictureType = 'left' | 'right' | 'tall' | 'default';

const PictureContainer = styled.div<{ $type: PictureType }>`
  position: relative;

  overflow: hidden;

  width: 100%;
  height: 80px;

  ${({ $type }) => {
    switch ($type) {
      case 'left':
        return css`
          float: left;
          width: 50%;
        `;
      case 'right':
        return css`
          float: right;
          width: 50%;
        `;
      case 'tall':
        return css`
          height: 170px;
          transition: height 0.3s ease-in-out;
          ${({ theme }) => theme.media.isMobile && `height: 100px;`}
        `;
      case 'default':
        return null;
    }
  }}
`;

export const WireframePicture = ({
  type = 'default',
  children,
}: {
  type?: PictureType;
  children?: ReactNode;
}) => (
  <PictureContainer $type={type}>
    <WireframeBox />
    {children}
  </PictureContainer>
);
