import { ReactElement } from 'react';
import { Col } from 'antd';
import classnames from 'classnames';

import { useMedia } from '../../hooks';
import * as styles from './index.module.less';
import { WordCloud } from '../WordCloud';

/* wordCloud */
export const TagsBlock = (): ReactElement => {
  const isDesktop = useMedia('isDesktop');

  return (
    <Col
      flex={isDesktop ? '0 0 300px' : '1 1 300px'}
      className={classnames(styles.wordCloudWrap, styles.col)}
    >
      <div className={styles.title}>TAGS</div>
      <WordCloud jump height={200} />
    </Col>
  );
};
