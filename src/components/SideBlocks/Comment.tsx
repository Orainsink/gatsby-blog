import React, { useMemo } from 'react';
import classnames from 'classnames';
import { Col } from 'antd';
import useWindowSize from '../../hooks/useWindowSize';
import styles from '../../styles/SideBar.module.less';
import MyGitalk from '../MyGitalk';

const Comment: React.FC = () => {
  const [width] = useWindowSize();

  const secondFlex = useMemo(() => {
    if (width > 1110) return '0 0 300px';
    if (width <= 1110 && width > 600) return '1 1 800px';
    return '1 1 300px';
  }, [width]);

  return (
    <Col
      flex={secondFlex}
      className={classnames(styles.col, styles.commentWrap)}
    >
      <MyGitalk title="首页评论" />
    </Col>
  );
};
export default React.memo(Comment);
