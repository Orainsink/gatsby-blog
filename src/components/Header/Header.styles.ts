import { GithubOutlined, SearchOutlined } from '@ant-design/icons';
import { Col } from 'antd';
import styled, { css, keyframes } from 'styled-components';

import { ReactComponent as ArrowSvg } from '../../assets/img/arrow.svg';

export const NavUl = styled.ul`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  color: inherit;
  font-size: var(--space-md);
  font-weight: var(--font-weight-xl);
  line-height: 1;
  text-transform: uppercase;
  margin: 0;
  padding: 0 12px;

  li {
    padding: 12px 0;
    margin: 0 10px;
    cursor: pointer;
    position: relative;
    transition: transform 0.3s ease-out;
    &::after {
      background-color: rgba(255, 255, 255, 0.7);
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 3px;
      border-radius: var(--border-radius);
      color: inherit;
      transition: all 0.3s ease-out;
    }
    &:hover::after {
      transform: translateY(-3px);
      width: 100% !important;
    }
    &:hover {
      transform: translateY(-3px);
    }
  }
  a {
    color: inherit !important;
    text-decoration: none;
    transition: none;
  }
`;

const activeStyles = css`
  background-color: var(--color-bg-container);
  color: var(--color-text);
  position: fixed;
  padding-top: 0;
  padding-bottom: 0;
  box-shadow: var(--box-shadow-secondary);
  li::after {
    background: var(--color-text);
  }
`;

const resumeStyles = css`
  color: var(--color-text);
  background: none;
  box-shadow: none;
  li::after {
    background: var(--color-text);
  }
`;

export const HeaderContainer = styled.header<{
  active: boolean;
  $isResume: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  background-color: transparent;
  box-shadow: none;
  padding: 10px var(--space-xxl);
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease-out;

  ${({ theme }) => theme.media.isMobile} {
    padding: 10px 15px;
  }

  ${({ active }) => active && activeStyles}

  ${({ active, $isResume }) => {
    if ($isResume) {
      if (!active) {
        return resumeStyles;
      } else {
        return `opacity: 0;`;
      }
    }
  }}
`;

export const Author = styled(Col)`
  text-align: center;
  span {
    color: inherit;
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-xl);
    line-height: 1;
    margin: 0;
    padding: 0 12px;
  }
`;

export const Ora = styled.span`
  cursor: pointer;
  transition: all 0.3;
  &:hover {
    transform: translateY(-3px);
  }
`;

const basedIconStyles = css`
  box-sizing: border-box;
  font-size: 30px;
  color: inherit;
  cursor: pointer;
  transition: transform 0.3s ease-out;
  &:hover {
    transform: translateY(-3px);
  }
`;

export const SearchIcon = styled(SearchOutlined)`
  ${basedIconStyles}
  margin-right: var(--space-md);
`;

export const GithubIcon = styled(GithubOutlined)`
  ${basedIconStyles}
`;

const arrowAme = keyframes`
0% {
  opacity: 1;
  transform: translateX(0);
}
5% {
  transform: translateX(-0.1rem);
}
100% {
  transform: translateX(1rem);
  opacity: 0;
}`;

const arrowFixedAme = keyframes`
5% {
  opacity: 0;
}
20% {
  opacity: 0.4;
}
100% {
  opacity: 1;
}`;

export const Arrow = styled(ArrowSvg)`
  width: 30px;
  height: 17px;
  margin-bottom: 10px;
  margin-left: var(--space-md);
  cursor: pointer;
  overflow: visible;
  transform: rotate(-90deg) scale(1.4);
  &:hover path {
    transition: all 1s cubic-bezier(0.2, 1, 0.3, 1);
  }
  &:hover path:nth-child(1) {
    animation: ${arrowAme} 1s cubic-bezier(0.2, 1, 0.3, 1) infinite running;
  }
  &:hover path:nth-child(2) {
    animation: ${arrowFixedAme} 1s cubic-bezier(0.2, 1, 0.3, 1) infinite running;
  }
`;
