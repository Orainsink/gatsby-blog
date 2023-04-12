import { ReactElement } from 'react';
import { GithubOutlined, MailOutlined } from '@ant-design/icons';
import styled, { css } from 'styled-components';
import { Typography } from 'antd';

const { Link } = Typography;

const FOOTER_MAX_HEIGHT = '200px';
const OFFSET = '120px';

const FooterContainer = styled.footer`
  width: 100%;
  position: absolute;
  bottom: 0;
  height: ${FOOTER_MAX_HEIGHT};
  background: linear-gradient(
    135deg,
    rgb(20, 22, 25),
    rgb(29, 32, 25) 70%,
    rgb(40, 44, 49) 90%
  );
`;

const FooterMain = styled.div`
  transform: translateY(${OFFSET});
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
  height: var(--font-size-xl);
  width: var(--font-size-xl);
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
    margin: 0 var(--space-lg);
  }
`;

const FooterValley = styled.div`
  width: 100%;
  height: 250px;
  position: absolute;
  top: -${OFFSET};
  left: 0;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: var(--image-footer);
`;

/**Footer */
export const Footer = (): ReactElement => (
  <FooterContainer>
    <FooterValley />
    <FooterMain>
      <FooterPhrase>
        <div>
          <StyledGithubOutlined />
          <Link
            href="https://github.com/Orainsink/gatsby-blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            Site Repository
          </Link>
        </div>
        <div>
          <StyledMailOutlined />
          Email: ywt1250066597@gmail.com
        </div>
      </FooterPhrase>
      <div>
        © Orainsink {new Date().getFullYear()}, Built with{' '}
        <Link
          href="https://www.gatsbyjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gatsby
        </Link>
        {', '}
        <Link
          href="https://ant.design"
          target="_blank"
          rel="noopener noreferrer"
        >
          Antd
        </Link>
        {', '}
        <Link
          href="https://threejs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Three.js
        </Link>
      </div>
    </FooterMain>
  </FooterContainer>
);
