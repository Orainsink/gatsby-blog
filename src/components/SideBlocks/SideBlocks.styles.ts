import { Col } from 'antd';
import styled from 'styled-components';

export const BaseCol = styled(Col)`
  background: var(--color-bg-container);
  border-radius: var(--border-radius);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 14px;
  box-shadow: var(--box-shadow);
  height: 250px;
  position: relative;
  &::after {
    height: var(--font-size-xl);
    width: var(--font-size-xl);
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
  font-weight: var(--font-weight-lg);
  color: var(--color-text-fourth);
`;
