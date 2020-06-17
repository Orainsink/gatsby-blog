import React, { useContext,useRef } from 'react';
import styles from '../styles/Header.module.less';
import { MainContext } from '../redux/Provider';
import classnames from 'classnames';
import { Avatar } from 'antd';
import Player from './Player'

/**Header */
const Header:React.FC = () => {

  return (
    <div className={styles.wrapper}>
      {/* <Avatar /> */}
      <Player />
    </div>
  );
};

export default Header;
