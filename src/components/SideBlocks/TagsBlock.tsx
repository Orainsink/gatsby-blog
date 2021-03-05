import React from 'react';
import { Col } from 'antd';
import classnames from 'classnames';
import { useMedia } from '../../hooks';
import * as styles from './index.module.less';
import WordCloud from '../WordCloud';

/* wordCloud */
const TagsBlock = () => {
  const is1110 = useMedia('(max-width: 1110px)');

  return (
    <Col
      flex={is1110 ? '1 1 300px' : '0 0 300px'}
      className={classnames(styles.wordCloudWrap, styles.col)}
    >
      <div className={styles.title}>TAGS</div>
      <WordCloud jump height={200} />
    </Col>
  );
};
export default React.memo(TagsBlock);
