import { ReactElement } from 'react';
import styled from 'styled-components';

import mainBg from '../../content/assets/mainBg.svg';

const BG_MAX_HEIGHT = '270px';

const BgContainer = styled.div`
  pointer-events: none;
  left: 0;
  width: 100%;
  height: ${BG_MAX_HEIGHT};
  transition: top 0.3s ease-out;
  z-index: 0;
  position: absolute;
  background: #141619;
  top: 0;
`;

const BgSvg = styled.img`
  width: 100%;
  height: 450px;

  ${({ theme }) => theme.media.isNotDesktop} {
    height: ${BG_MAX_HEIGHT};
  }
`;

export const Bg = (): ReactElement => {
  return (
    <BgContainer>
      <BgSvg src={mainBg} alt="" />
    </BgContainer>
  );
};
