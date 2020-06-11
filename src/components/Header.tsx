import React, { useContext } from 'react';
import styles from '../styles/Header.module.less';
import { MainContext } from '../context/MainContext';
import classnames from 'classnames';
import { Avatar } from 'antd';

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <Avatar />
    </div>
  );
};

export default Header;
