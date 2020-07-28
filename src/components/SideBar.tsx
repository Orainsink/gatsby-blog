import React, { useMemo } from 'react';
import styles from '../styles/SideBar.module.less';
import { Col, Row, Tooltip } from 'antd';
import WordCloud from './WordCloud';
import classnames from 'classnames';

interface ISideBar {}

const SideBar: React.FC<ISideBar> = (props) => {
  return (
    <Col flex="1 1 300px">
      <Row align="top" justify="center">
        {/* wordCloud */}
        <Col
          flex="1 1 300px"
          className={classnames(styles.wordCloudWrap, styles.col)}
        >
          <div className={styles.title}>TAGS</div>
          <WordCloud />
        </Col>
      </Row>
    </Col>
  );
};
export default React.memo(SideBar);
