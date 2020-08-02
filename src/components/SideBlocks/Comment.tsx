import React from 'react';
import styles from '../../styles/SideBar.module.less';
import MyGitalk from '../MyGitalk';
import classnames from 'classnames';
import { Col } from 'antd';
import useWindowSize from '../../hooks/useWindowSize';

interface IComment {}
const Comment: React.FC<IComment> = (props) => {
  const [x] = useWindowSize();

  return (
    <Col
      flex={x > 1110 ? '0 0 300px' : '1 1 300px'}
      className={classnames(styles.col, styles.commentWrap)}
    >
      <MyGitalk title="首页评论" />
    </Col>
  );
};
export default React.memo(Comment);
