import { ReactElement } from 'react';
import styled from 'styled-components';

import { Section } from './Resume.styles';
import { AboutSite } from './AboutSite';
import { useMedia } from '../../hooks';

const AboutSectionContainer = styled(Section)`
  ${({ theme }) => theme.media.isNotMobile} {
    * {
      text-align: center;
    }
  }
`;

const ContactMe = styled.a`
  position: relative;
  margin: 40px 0;
  color: var(--text-color) !important;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--color-text);
    transition: width 0.3s ease-out;
  }
  &:hover::after {
    width: 100%;
  }
`;

export const AboutSection = (): ReactElement => {
  const isNotMobile = useMedia('isNotMobile');
  return (
    <AboutSectionContainer id="resume-about">
      <AboutSite />
      <h1 data-el>HELLO</h1>
      <h2 data-el>我是 莫沉 一个前端程序员</h2>
      <div>
        <p data-el>
          工作5年，有小程序，数据可视化，大型SaaS系统
          {isNotMobile ? <br /> : '，'}
          node 全栈和 offshore 项目经验
        </p>
        <p data-el>
          熟悉前端技术架构，性能优化及前端安全
          {isNotMobile ? <br /> : '，'}
          熟悉常用的设计模式，算法，敏捷方法论
        </p>
        <div data-el>
          <ContactMe href="mailto:ywt1250066597@gmail.com">
            Contact me
          </ContactMe>
        </div>
      </div>
    </AboutSectionContainer>
  );
};
