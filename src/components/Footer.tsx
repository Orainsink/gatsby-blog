import { ReactElement } from 'react';
import { GithubOutlined, MailOutlined } from '@ant-design/icons';
import styled, { css } from 'styled-components';

import { useIsDark } from '../hooks';
import darkValley from '../assets/img/valley-dark.svg';
import valley from '../assets/img/valley.svg';

const FooterContainer = styled.footer`
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 200px;
  background: linear-gradient(
    135deg,
    rgb(20, 22, 25),
    rgb(29, 32, 25) 70%,
    rgb(40, 44, 49) 90%
  );
  a {
    color: var(--color-link-hover);
  }
`;

const FooterMain = styled.div`
  transform: translateY(120px);
  color: #fff;
  > div {
    text-align: center;
    margin: 0;
  }
  a {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const footerIconStyles = css`
  height: 20px;
  width: 20px;
  margin: 0 4px;
  vertical-align: -2px;
`;

const StyledMailOutlined = styled(MailOutlined)`
  ${footerIconStyles}
`;

const StyledGithubOutlined = styled(GithubOutlined)`
  ${footerIconStyles}
  color: var(--color-link-hover);
`;

const FooterPhrase = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: wrap;
  color: #fff;
  > div {
    margin: 0 20px;
  }
`;

const FooterValley = styled.div<{ isDark: boolean }>`
  width: 100%;
  height: 250px;
  position: absolute;
  top: -120px;
  left: 0;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${({ isDark }) => (isDark ? darkValley : valley)});
`;

/**Footer */
export const Footer = (): ReactElement => {
  const isDark = useIsDark();

  return (
    <FooterContainer>
      <FooterValley isDark={isDark} />
      <FooterMain>
        <FooterPhrase>
          <div>
            <StyledGithubOutlined />
            <a
              href="https://github.com/Orainsink/gatsby-blog"
              target="_blank"
              rel="noopener noreferrer"
            >
              Site Repository
            </a>
          </div>
          <div>
            <StyledMailOutlined />
            Email: ywt1250066597@gmail.com
          </div>
        </FooterPhrase>
        <div>
          © Orainsink {new Date().getFullYear()}, Built with{' '}
          <a
            href="https://www.gatsbyjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gatsby
          </a>
          {', '}
          <a
            href="https://ant.design"
            target="_blank"
            rel="noopener noreferrer"
          >
            Antd
          </a>
          {', '}
          <a
            href="https://threejs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Three.js
          </a>
        </div>
      </FooterMain>
    </FooterContainer>
  );
};
