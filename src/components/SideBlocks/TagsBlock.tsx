import React from 'react';
import { Col } from 'antd';
import classnames from 'classnames';
import useWindowSize from '../../hooks/useWindowSize';
import styles from '../../styles/SideBar.module.less';
import WordCloud from '../WordCloud';

/* wordCloud */
const TagsBlock = () => {
  const [width] = useWindowSize();

  return (
    <Col
      flex={width > 1110 ? '0 0 300px' : '1 1 300px'}
      className={classnames(styles.wordCloudWrap, styles.col)}
    >
      <div className={styles.title}>TAGS</div>
      <WordCloud jump height={200} />
    </Col>
  );
};
export default React.memo(TagsBlock);
