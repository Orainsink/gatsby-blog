import React from 'react';
import styles from '../styles/Footer.module.less';
import { GithubOutlined, MailOutlined } from '@ant-design/icons';

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
          <a href="https://github.com/Orainsink/gatsby-blog">
            Git Repository: Orainsink
          </a>
        </div>
        <div>
          <MailOutlined
            className={styles.icon}
            style={{ transform: 'translateY(2px)' }}
          />
          Email: ywt1250066597@gmail.com
        </div>
      </div>
      <div>
        ©{new Date().getFullYear()}, Built with{' '}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
        {', '}
        <a href="https://ant.design">Antd</a>
        {', '}
        <a href="https://threejs.org">Three.js</a>
      </div>
    </footer>
  );
};

export default Footer;
