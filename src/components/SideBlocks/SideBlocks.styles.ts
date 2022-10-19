import { Col } from 'antd';
import styled from 'styled-components';

export const BaseCol = styled(Col)`
  background: var(--main-background);
  border-radius: var(--border-radius-base);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 14px;
  box-shadow: var(--box-shadow);
  height: 250px;
  position: relative;
  &::after {
    height: 20px;
    width: 20px;
    content: '';
    position: absolute;
    top: 5px;
    right: 5px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(../../assets/img/pin.svg);
  }
`;

export const Title = styled.span`
  font-size: 45px;
  position: absolute;
  text-transform: uppercase;
  bottom: 10%;
  right: 10px;
  font-weight: bold;
  color: var(--text-color-fourth);
  z-index: 0;
`;
