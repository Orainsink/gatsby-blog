import React from 'react';
import styles from '../../styles/SideBar.module.less';
import { Col } from 'antd';
import WordCloud from '../WordCloud';
import classnames from 'classnames';
import useWindowSize from '../../hooks/useWindowSize';

/* wordCloud */
const TagesBlock: React.FC = () => {
  const [x] = useWindowSize();

  return (
    <Col
      flex={x > 1110 ? '0 0 300px' : '1 1 300px'}
      className={classnames(styles.wordCloudWrap, styles.col)}
    >
      <div className={styles.title}>TAGS</div>
      <WordCloud jump height={200} />
    </Col>
  );
};
export default React.memo(TagesBlock);
