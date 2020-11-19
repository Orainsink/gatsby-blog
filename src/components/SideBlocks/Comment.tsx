import React from 'react';
import classnames from 'classnames';
import { Col } from 'antd';
import styles from '../../styles/SideBar.module.less';
import MyGitalk from '../MyGitalk';
import useColFlex from './useColFlex';

const Comment = () => {
  const colFlex = useColFlex();

  return (
    <Col flex={colFlex} className={classnames(styles.col, styles.commentWrap)}>
      <MyGitalk title="首页评论" />
    </Col>
  );
};
export default React.memo(Comment);
