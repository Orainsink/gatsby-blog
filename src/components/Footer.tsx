import React from 'react';
import { GithubOutlined, MailOutlined } from '@ant-design/icons';
import styles from '../styles/Footer.module.less';

/**Footer */
const Footer: React.FC = () => {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.phrase}>
        <div>
          <GithubOutlined
            className={styles.icon}
            style={{ transform: 'translateY(-1px)' }}
          />
          <a
            href="https://github.com/Orainsink/gatsby-blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            Site Repository
          </a>
        </div>
        <div>
          <MailOutlined
            className={styles.icon}
            style={{ transform: 'translateY(1px)' }}
          />
          Email: ywt1250066597@gmail.com
        </div>
      </div>
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
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Antd
        </a>
        {', '}
        <a href="https://threejs.org" target="_blank" rel="noopener noreferrer">
          Three.js
        </a>
      </div>
    </footer>
  );
};

export default Footer;
