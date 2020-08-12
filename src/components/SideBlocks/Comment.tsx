import React, { useMemo } from 'react';
import styles from '../../styles/SideBar.module.less';
import classnames from 'classnames';
import { Col } from 'antd';
import useWindowSize from '../../useHooks/useWindowSize';
import loadable from '@loadable/component';
const MyGitalk = loadable(() => import('../MyGitalk'));

const Comment: React.FC = () => {
  const [x] = useWindowSize();

  const commentFlex = useMemo(() => {
    if (x > 1110) return '0 0 300px';
    if (x <= 1110 && x > 600) return '1 1 800px';
    return '1 1 300px';
  }, [x]);

  return (
    <Col
      flex={commentFlex}
      className={classnames(styles.col, styles.commentWrap)}
    >
      <MyGitalk title="首页评论" />
    </Col>
  );
};
export default React.memo(Comment);
