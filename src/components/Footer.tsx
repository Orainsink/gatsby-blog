import React from 'react';
import { GithubOutlined, MailOutlined } from '@ant-design/icons';
import styles from '../styles/Footer.module.less';
import classnames from 'classnames';

/**Footer */
const Footer = () => (
  <footer className={styles.wrap}>
    <div className={styles.valley}></div>
    <div className={styles.main}>
      <div className={styles.phrase}>
        <div>
          <GithubOutlined className={classnames(styles.icon, styles.git)} />
          <a
            href="https://github.com/Orainsink/gatsby-blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            Site Repository
          </a>
        </div>
        <div>
          <MailOutlined className={styles.icon} />
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
    </div>
  </footer>
);

export default React.memo(Footer);
